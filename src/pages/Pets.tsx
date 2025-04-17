
import { useState, useEffect } from 'react';
import AppHeader from '@/components/AppHeader';
import FilterBar, { FilterState } from '@/components/FilterBar';
import PetGrid from '@/components/PetGrid';
import { Pet } from '@/types/pet';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Pets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('pets')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setPets(data as Pet[]);
          setFilteredPets(data as Pet[]);
        }
      } catch (error: any) {
        console.error('Error fetching pets:', error);
        toast.error(error.message || 'Failed to load pets');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPets();
  }, []);
  
  const handleFilterChange = (filters: FilterState) => {
    const filtered = pets.filter(pet => {
      // Filter by type
      if (filters.type !== 'all' && pet.type !== filters.type) {
        return false;
      }
      
      // Filter by size
      if (filters.size !== 'all' && pet.size !== filters.size) {
        return false;
      }
      
      // Apply search query if it exists
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          pet.name.toLowerCase().includes(query) ||
          pet.breed.toLowerCase().includes(query) ||
          pet.location.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
    
    setFilteredPets(filtered);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    const filtered = pets.filter(pet => {
      const matchesSearch = !query || 
        pet.name.toLowerCase().includes(query.toLowerCase()) ||
        pet.breed.toLowerCase().includes(query.toLowerCase()) ||
        pet.location.toLowerCase().includes(query.toLowerCase());
        
      return matchesSearch;
    });
    
    setFilteredPets(filtered);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Find Your Perfect Pet in India</h1>
            <p className="text-muted-foreground">
              Browse our adorable Indian pets waiting for their forever homes. Use filters to narrow your search by breed, size, or location.
            </p>
          </div>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, breed, or city in India..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <FilterBar onFilterChange={handleFilterChange} />
          
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filteredPets.length} pets across India
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pet-purple"></div>
            </div>
          ) : (
            <PetGrid 
              pets={filteredPets} 
              emptyMessage="No pets match your search. Try adjusting your filters or check back later for more Indian pets."
            />
          )}
        </div>
      </main>
      
      <footer className="bg-white border-t py-8 px-4">
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

export default Pets;
