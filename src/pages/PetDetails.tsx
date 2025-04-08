
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Pet } from '@/types/pet';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, DollarSign, Tag, Ruler, Info, PawPrint, Home, Heart, User } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import { useFavorites } from '@/context/FavoritesContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';

interface UserProfile {
  id: string;
  name: string;
  contact_email: string;
  location: string;
}

interface AdoptionRequest {
  id: string;
  status: string;
  created_at: string;
}

const PetDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [ownerProfile, setOwnerProfile] = useState<UserProfile | null>(null);
  const [adoptionRequest, setAdoptionRequest] = useState<AdoptionRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { user } = useAuth();
  
  useEffect(() => {
    if (!id) return;
    
    const fetchPetDetails = async () => {
      try {
        const { data: petData, error: petError } = await supabase
          .from('pets')
          .select('*')
          .eq('id', id)
          .single();
          
        if (petError) throw petError;
        
        if (petData) {
          setPet(petData as Pet);
          
          // Fetch the owner's profile
          if (petData.user_id) {
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', petData.user_id)
              .single();
              
            if (!profileError && profileData) {
              setOwnerProfile(profileData as UserProfile);
            }
          }
          
          // If user is logged in, check if they've already submitted an adoption request
          if (user) {
            const { data: requestData, error: requestError } = await supabase
              .from('adoption_requests')
              .select('id, status, created_at')
              .eq('pet_id', id)
              .eq('requester_id', user.id)
              .maybeSingle();
              
            if (!requestError && requestData) {
              setAdoptionRequest(requestData as AdoptionRequest);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching pet details:', error);
        toast.error('Failed to load pet details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPetDetails();
  }, [id, user]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }
  
  if (!pet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Pet Not Found</h1>
        <p className="text-muted-foreground mb-6">The pet you're looking for doesn't exist or may have been adopted.</p>
        <Button onClick={() => navigate('/pets')}>Browse Other Pets</Button>
      </div>
    );
  }
  
  const favorite = isFavorite(pet.id);
  
  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(pet.id);
      toast("Removed from favorites");
    } else {
      addFavorite(pet.id);
      toast("Added to favorites");
    }
  };
  
  const ageDisplay = pet.age < 12 
    ? `${pet.age} ${pet.age === 1 ? 'month' : 'months'}`
    : `${Math.floor(pet.age / 12)} ${Math.floor(pet.age / 12) === 1 ? 'year' : 'years'}`;
  
  const isOwner = user?.id === pet.user_id;
  
  const getAdoptionButtonState = () => {
    if (!user) return { text: "Sign in to Adopt", action: () => navigate('/auth') };
    if (isOwner) return { text: "This is your pet", action: () => navigate('/my-pets'), disabled: true };
    if (adoptionRequest) {
      if (adoptionRequest.status === 'pending') return { text: "Adoption request pending", disabled: true };
      if (adoptionRequest.status === 'approved') return { text: "Adoption approved!", disabled: true };
      if (adoptionRequest.status === 'rejected') return { text: "Adoption request rejected", disabled: true };
    }
    return { text: "Start Adoption Process", action: () => navigate(`/adopt/${pet.id}`) };
  };
  
  const adoptionButtonState = getAdoptionButtonState();
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative">
              <img 
                src={pet.image_url} 
                alt={pet.name}
                className="w-full aspect-square rounded-2xl object-cover"
              />
              <button 
                onClick={handleFavoriteClick}
                className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <Heart 
                  size={24} 
                  className={cn(
                    "transition-colors", 
                    favorite ? "fill-red-500 text-red-500" : "text-gray-400"
                  )} 
                />
              </button>
              
              {ownerProfile && (
                <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pet-light-purple rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-pet-purple" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{ownerProfile.name || 'Pet Owner'}</p>
                      <p className="text-xs text-muted-foreground">{ownerProfile.location || 'Location unknown'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-2">
                  <span className="pet-tag bg-pet-light-purple text-pet-dark-purple mr-2">
                    {pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}
                  </span>
                  <span className="pet-tag bg-pet-soft-blue text-blue-700">
                    {ageDisplay}
                  </span>
                  
                  {adoptionRequest && (
                    <Badge 
                      variant={
                        adoptionRequest.status === 'approved' ? 'success' :
                        adoptionRequest.status === 'rejected' ? 'destructive' :
                        'default'
                      }
                      className="ml-2"
                    >
                      {adoptionRequest.status.charAt(0).toUpperCase() + adoptionRequest.status.slice(1)}
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold">{pet.name}</h1>
                <div className="flex items-center mt-1">
                  <PawPrint className="h-5 w-5 text-pet-purple mr-2" />
                  <p className="text-lg font-medium text-pet-purple">{pet.breed}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-pet-purple" />
                  <span>Added {new Date(pet.date_added).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Ruler className="mr-2 h-5 w-5 text-pet-purple" />
                  <span>{pet.size.charAt(0).toUpperCase() + pet.size.slice(1)} Size</span>
                </div>
                <div className="flex items-center">
                  <Tag className="mr-2 h-5 w-5 text-pet-purple" />
                  <span>{pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-pet-purple" />
                  <span>Adoption Fee: ₹{pet.adoption_fee}</span>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">About {pet.name}</h2>
                <p className="text-muted-foreground">{pet.description}</p>
              </div>
              
              <div className="bg-pet-light-purple/20 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-3 text-pet-dark-purple">Breed Information</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium flex items-center text-pet-purple">
                      <Home className="mr-2 h-4 w-4" /> Natural Habitat
                    </h3>
                    <p className="text-sm text-muted-foreground ml-6">{pet.habitat || 'Information not available'}</p>
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center text-pet-purple">
                      <Tag className="mr-2 h-4 w-4" /> Common Habits
                    </h3>
                    <p className="text-sm text-muted-foreground ml-6">{pet.habits || 'Information not available'}</p>
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center text-pet-purple">
                      <Info className="mr-2 h-4 w-4" /> Origin
                    </h3>
                    <p className="text-sm text-muted-foreground ml-6">{pet.origin || 'Information not available'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <Tag className="mr-2 h-5 w-5 text-pet-purple mt-0.5" />
                    <div>
                      <span className="font-medium">Good with: </span>
                      <span className="text-muted-foreground">
                        {pet.good_with && pet.good_with.length > 0 
                          ? pet.good_with.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(', ')
                          : 'Information not provided'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Info className="mr-2 h-5 w-5 text-pet-purple mt-0.5" />
                    <div>
                      <span className="font-medium">Medical info: </span>
                      <span className="text-muted-foreground">{pet.medical_info || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  className="w-full"
                  onClick={adoptionButtonState.action}
                  disabled={adoptionButtonState.disabled}
                >
                  {adoptionButtonState.text}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full mt-3"
                  onClick={handleFavoriteClick}
                >
                  {favorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-8 px-4 mt-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-xl font-bold text-pet-purple">Adoptify India</div>
              <div className="text-sm text-muted-foreground">Connecting pets with loving homes across India</div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © 2023 Adoptify India. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PetDetails;
