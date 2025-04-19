import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import AppHeader from '@/components/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { LogOut } from 'lucide-react';

interface ProfileData {
  name: string;
  contact_email: string;
  contact_phone: string;
  location: string;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    contact_email: '',
    contact_phone: '',
    location: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        if (data) {
          setProfile(data);
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        toast.error(error.message || 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', user?.id);

      if (error) throw error;
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <AppHeader />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pet-purple"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">My Profile</h1>
              {!isEditing && (
                <div className="space-x-4">
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    Edit Profile
                  </Button>
                  <Button 
                    onClick={handleSignOut} 
                    variant="destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  name="name"
                  value={profile.name || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Email</label>
                <Input
                  name="contact_email"
                  value={profile.contact_email || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Your contact email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input
                  name="contact_phone"
                  value={profile.contact_phone || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input
                  name="location"
                  value={profile.location || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Your location"
                />
              </div>
              {isEditing && (
                <div className="flex gap-4">
                  <Button type="submit">Save Changes</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
