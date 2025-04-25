
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import AppHeader from '@/components/AppHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Pet } from '@/types/pet';
import { AdoptionRequest } from '@/types/adoptionRequest';
import { PlusCircle } from 'lucide-react';
import PetGrid from '@/components/PetGrid';
import EmptyStateCard from '@/components/EmptyStateCard';
import AdoptionRequestsTable from '@/components/AdoptionRequestsTable';

const MyPets = () => {
  const [myPets, setMyPets] = useState<Pet[]>([]);
  const [requestsReceived, setRequestsReceived] = useState<AdoptionRequest[]>([]);
  const [requestsSent, setRequestsSent] = useState<AdoptionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch user's listed pets
        const { data: petsData, error: petsError } = await supabase
          .from('pets')
          .select('*')
          .eq('user_id', user.id);
          
        if (petsError) throw petsError;
        
        setMyPets(petsData as Pet[]);
        
        console.log("Fetching adoption requests for owner ID:", user.id);
        
        // Fetch adoption requests received (for pets the user owns) - fix the query
        const { data: receivedData, error: receivedError } = await supabase
          .from('adoption_requests')
          .select(`
            *,
            pet:pets(*)
          `)
          .eq('owner_id', user.id);
          
        if (receivedError) {
          console.error("Error fetching received requests:", receivedError);
          throw receivedError;
        }
        
        console.log("Received requests data:", receivedData);
        setRequestsReceived(receivedData as unknown as AdoptionRequest[]);
        
        // Fetch adoption requests sent by the user
        const { data: sentData, error: sentError } = await supabase
          .from('adoption_requests')
          .select(`
            *,
            pet:pets(*)
          `)
          .eq('requester_id', user.id);
          
        if (sentError) throw sentError;
        
        setRequestsSent(sentData as unknown as AdoptionRequest[]);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load your data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  const handleApproveRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('adoption_requests')
        .update({ status: 'approved' })
        .eq('id', requestId);
        
      if (error) throw error;
      
      setRequestsReceived(prev => 
        prev.map(request => 
          request.id === requestId 
            ? { ...request, status: 'approved' } 
            : request
        )
      );
      
      toast.success('Adoption request approved!');
    } catch (error) {
      console.error('Error approving request:', error);
      toast.error('Failed to approve request');
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('adoption_requests')
        .update({ status: 'rejected' })
        .eq('id', requestId);
        
      if (error) throw error;
      
      setRequestsReceived(prev => 
        prev.map(request => 
          request.id === requestId 
            ? { ...request, status: 'rejected' } 
            : request
        )
      );
      
      toast.success('Adoption request rejected');
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast.error('Failed to reject request');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Pets & Adoptions</h1>
            <Button onClick={() => navigate('/list-pet')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              List a New Pet
            </Button>
          </div>
          
          <Tabs defaultValue="my-pets" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="my-pets">My Listed Pets</TabsTrigger>
              <TabsTrigger value="requests-received">
                Requests Received
                {requestsReceived.filter(r => r.status === 'pending').length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {requestsReceived.filter(r => r.status === 'pending').length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="requests-sent">My Adoption Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-pets">
              {myPets.length === 0 ? (
                <EmptyStateCard
                  title="No Pets Listed Yet"
                  description="You haven't listed any pets for adoption yet"
                  actionLabel="List Your First Pet"
                  onAction={() => navigate('/list-pet')}
                />
              ) : (
                <PetGrid pets={myPets} />
              )}
            </TabsContent>
            
            <TabsContent value="requests-received">
              {requestsReceived.length === 0 ? (
                <EmptyStateCard
                  title="No Adoption Requests"
                  description="You haven't received any adoption requests for your pets yet"
                />
              ) : (
                <AdoptionRequestsTable
                  title="Adoption Requests for Your Pets"
                  description="Review and manage requests from people who want to adopt your pets"
                  requests={requestsReceived}
                  showRequesterInfo={true}
                  onApprove={handleApproveRequest}
                  onReject={handleRejectRequest}
                  onViewPet={(petId) => navigate(`/pets/${petId}`)}
                />
              )}
            </TabsContent>
            
            <TabsContent value="requests-sent">
              {requestsSent.length === 0 ? (
                <EmptyStateCard
                  title="No Adoption Requests"
                  description="You haven't made any adoption requests yet"
                  actionLabel="Browse Pets for Adoption"
                  onAction={() => navigate('/pets')}
                />
              ) : (
                <AdoptionRequestsTable
                  title="Your Adoption Requests"
                  description="Check the status of your requests to adopt pets"
                  requests={requestsSent}
                  onViewPet={(petId) => navigate(`/pets/${petId}`)}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default MyPets;
