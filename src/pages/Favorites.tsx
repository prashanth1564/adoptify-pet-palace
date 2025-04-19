
import { useEffect, useState } from 'react';
import AppHeader from '@/components/AppHeader';
import { useFavorites } from '@/context/FavoritesContext';
import { Pet } from '@/types/pet';
import PetGrid from '@/components/PetGrid';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Favorites = () => {
  const { favorites } = useFavorites();
  const [favoritePets, setFavoritePets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFavoritePets = async () => {
      if (favorites.length === 0) {
        setFavoritePets([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('pets')
          .select('*')
          .in('id', favorites);
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setFavoritePets(data as Pet[]);
        }
      } catch (error) {
        console.error('Error fetching favorite pets:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFavoritePets();
  }, [favorites]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Your Favorites</h1>
            <p className="text-muted-foreground">
              Here are the pets you've saved to revisit later.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pet-purple"></div>
            </div>
          ) : favoritePets.length > 0 ? (
            <PetGrid pets={favoritePets} />
          ) : (
            <div className="text-center py-16 bg-secondary rounded-2xl">
              <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Browse our available pets and click the heart icon to add them to your favorites.
              </p>
              <Link to="/pets">
                <Button>Find Pets</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-white border-t py-8 px-4">
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

export default Favorites;
