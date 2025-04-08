
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import AppHeader from '@/components/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pet } from '@/types/pet';
import PetGrid from '@/components/PetGrid';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X, ExternalLink, PlusCircle } from 'lucide-react';

interface AdoptionRequest {
  id: string;
  pet_id: string;
  requester_id: string;
  owner_id: string;
  status: string;
  message: string;
  contact_email: string;
  contact_phone: string | null;
  created_at: string;
  updated_at: string;
  pet: Pet;
  requester_profile: {
    name: string;
    contact_email: string;
    location: string;
  } | null;
}

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
        // Fetch user's listed pets
        const { data: petsData, error: petsError } = await supabase
          .from('pets')
          .select('*')
          .eq('user_id', user.id);
          
        if (petsError) throw petsError;
        
        setMyPets(petsData as Pet[]);
        
        // Fetch adoption requests received (for pets the user owns)
        const { data: receivedData, error: receivedError } = await supabase
          .from('adoption_requests')
          .select(`
            *,
            pet:pet_id(*),
            requester_profile:requester_id(name, contact_email, location)
          `)
          .eq('owner_id', user.id);
          
        if (receivedError) throw receivedError;
        
        setRequestsReceived(receivedData as AdoptionRequest[]);
        
        // Fetch adoption requests sent by the user
        const { data: sentData, error: sentError } = await supabase
          .from('adoption_requests')
          .select(`
            *,
            pet:pet_id(*)
          `)
          .eq('requester_id', user.id);
          
        if (sentError) throw sentError;
        
        setRequestsSent(sentData as AdoptionRequest[]);
        
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
                Adoption Requests Received 
                {requestsReceived.filter(r => r.status === 'pending').length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {requestsReceived.filter(r => r.status === 'pending').length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="requests-sent">My Adoption Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-pets" className="space-y-6">
              {myPets.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>No Pets Listed Yet</CardTitle>
                    <CardDescription>
                      You haven't listed any pets for adoption yet
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button onClick={() => navigate('/list-pet')}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      List Your First Pet
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <PetGrid pets={myPets} />
              )}
            </TabsContent>
            
            <TabsContent value="requests-received">
              {requestsReceived.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>No Adoption Requests</CardTitle>
                    <CardDescription>
                      You haven't received any adoption requests for your pets yet
                    </CardDescription>
                  </CardHeader>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Adoption Requests for Your Pets</CardTitle>
                    <CardDescription>
                      Review and manage requests from people who want to adopt your pets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pet</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {requestsReceived.map(request => (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src={request.pet.image_url} 
                                  alt={request.pet.name}
                                  className="w-10 h-10 rounded-md object-cover"
                                />
                                <div>
                                  <div>{request.pet.name}</div>
                                  <div className="text-sm text-muted-foreground">{request.pet.breed}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div>{request.requester_profile?.name || 'Unknown User'}</div>
                                <div className="text-sm text-muted-foreground">{request.contact_email}</div>
                                {request.contact_phone && (
                                  <div className="text-sm text-muted-foreground">{request.contact_phone}</div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  request.status === 'approved' ? 'success' :
                                  request.status === 'rejected' ? 'destructive' :
                                  'default'
                                }
                              >
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(request.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => navigate(`/pets/${request.pet_id}`)}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                                
                                {request.status === 'pending' && (
                                  <>
                                    <Button
                                      variant="success"
                                      size="sm"
                                      onClick={() => handleApproveRequest(request.id)}
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => handleRejectRequest(request.id)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="requests-sent">
              {requestsSent.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>No Adoption Requests</CardTitle>
                    <CardDescription>
                      You haven't made any adoption requests yet
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button onClick={() => navigate('/pets')}>
                      Browse Pets for Adoption
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Adoption Requests</CardTitle>
                    <CardDescription>
                      Check the status of your requests to adopt pets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pet</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Submitted On</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {requestsSent.map(request => (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src={request.pet.image_url} 
                                  alt={request.pet.name}
                                  className="w-10 h-10 rounded-md object-cover"
                                />
                                <div>
                                  <div>{request.pet.name}</div>
                                  <div className="text-sm text-muted-foreground">{request.pet.breed}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  request.status === 'approved' ? 'success' :
                                  request.status === 'rejected' ? 'destructive' :
                                  'default'
                                }
                              >
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(request.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/pets/${request.pet_id}`)}
                              >
                                View Pet
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default MyPets;
