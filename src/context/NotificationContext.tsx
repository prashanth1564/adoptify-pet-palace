import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Notification } from '@/types/notification';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearNotification: () => {},
  addNotification: () => {},
});

export const useNotifications = () => useContext(NotificationContext);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const savedNotifications = localStorage.getItem(`notifications_${user.id}`);
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user && notifications.length > 0) {
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(notifications));
    }
  }, [notifications, user]);

  useEffect(() => {
    if (!user) return;

    const adoptionStatusChannel = supabase
      .channel('adoption_status_notifications')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'adoption_requests',
          filter: `requester_id=eq.${user.id}`,
        },
        async (payload) => {
          const newStatus = payload.new.status;
          const oldStatus = payload.old.status;
          
          if (oldStatus === 'pending' && (newStatus === 'approved' || newStatus === 'rejected')) {
            const { data: petData } = await supabase
              .from('pets')
              .select(`
                name,
                user_id
              `)
              .eq('id', payload.new.pet_id)
              .single();

            if (petData) {
              const { data: ownerProfile } = await supabase
                .from('profiles')
                .select('name, contact_email, contact_phone')
                .eq('id', petData.user_id)
                .single();

              const ownerDetails = ownerProfile 
                ? `\nContact details:\nName: ${ownerProfile.name || 'Not provided'}\nEmail: ${ownerProfile.contact_email || 'Not provided'}\nPhone: ${ownerProfile.contact_phone || 'Not provided'}`
                : '';

              addNotification({
                type: newStatus === 'approved' ? 'adoption_approved' : 'adoption_rejected',
                title: newStatus === 'approved' ? 'Adoption Request Approved!' : 'Adoption Request Rejected',
                message: newStatus === 'approved' 
                  ? `Your request to adopt ${petData.name} has been approved! ${ownerDetails}` 
                  : `Your request to adopt ${petData.name} has been rejected.`,
                relatedId: payload.new.id
              });
            }
          }
        }
      )
      .subscribe();

    const newRequestsChannel = supabase
      .channel('new_adoption_requests')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'adoption_requests',
          filter: `owner_id=eq.${user.id}`,
        },
        (payload) => {
          supabase
            .from('pets')
            .select('name')
            .eq('id', payload.new.pet_id)
            .single()
            .then(({ data: pet }) => {
              if (pet) {
                addNotification({
                  type: 'adoption_request',
                  title: 'New Adoption Request!',
                  message: `Someone wants to adopt your pet ${pet.name}. Check the request in My Pets.`,
                  relatedId: payload.new.id
                });
              }
            });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(adoptionStatusChannel);
      supabase.removeChannel(newRequestsChannel);
    };
  }, [user]);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 11),
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
    addNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
