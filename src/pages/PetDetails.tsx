
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPetById } from '@/data/petData';
import { Pet } from '@/types/pet';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft, MapPin, Calendar, DollarSign, Tag, Ruler, Info } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import { useFavorites } from '@/context/FavoritesContext';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';

const PetDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  
  useEffect(() => {
    if (id) {
      const foundPet = getPetById(id);
      setPet(foundPet || null);
      setLoading(false);
    }
  }, [id]);
  
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
                src={pet.imageUrl} 
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
                </div>
                <h1 className="text-3xl font-bold">{pet.name}</h1>
                <p className="text-lg text-muted-foreground">{pet.breed}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-pet-purple" />
                  <span>{pet.location}</span>
                </div>
                <div className="flex items-center">
                  <Ruler className="mr-2 h-5 w-5 text-pet-purple" />
                  <span>{pet.size.charAt(0).toUpperCase() + pet.size.slice(1)} Size</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-pet-purple" />
                  <span>Added {new Date(pet.dateAdded).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-pet-purple" />
                  <span>Adoption Fee: ${pet.adoptionFee}</span>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">About {pet.name}</h2>
                <p className="text-muted-foreground">{pet.description}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <Tag className="mr-2 h-5 w-5 text-pet-purple mt-0.5" />
                    <div>
                      <span className="font-medium">Good with: </span>
                      <span className="text-muted-foreground">{pet.goodWith.join(', ')}</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Info className="mr-2 h-5 w-5 text-pet-purple mt-0.5" />
                    <div>
                      <span className="font-medium">Medical info: </span>
                      <span className="text-muted-foreground">{pet.medicalInfo}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Link to={`/adopt/${pet.id}`}>
                  <Button className="w-full">Start Adoption Process</Button>
                </Link>
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
              <div className="text-xl font-bold text-pet-purple">Adoptify</div>
              <div className="text-sm text-muted-foreground">Connecting pets with their forever homes</div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © 2023 Adoptify. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PetDetails;
