import { useNavigate } from 'react-router-dom';
import { Pet } from '@/types/pet';
import { useFavorites } from '@/context/FavoritesContext';
import { Heart, PawPrint, Trash2, Phone, Mail, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';

interface PetCardProps {
  pet: Pet;
}

const PetCard = ({ pet }: PetCardProps) => {
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { user } = useAuth();
  const favorite = isFavorite(pet.id);
  const [ownerProfile, setOwnerProfile] = useState<any>(null);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    const fetchOwnerProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('name, contact_phone, contact_email')
        .eq('id', pet.user_id)
        .single();
      if (data) {
        setOwnerProfile(data);
      }
    };

    const checkIfApproved = async () => {
      const { data } = await supabase
        .from('adoption_requests')
        .select('status')
        .eq('pet_id', pet.id)
        .eq('status', 'approved')
        .maybeSingle();
      
      setIsApproved(!!data);
    };

    fetchOwnerProfile();
    checkIfApproved();
  }, [pet.user_id, pet.id]);

  const ageDisplay = pet.age < 12 
    ? `${pet.age} ${pet.age === 1 ? 'month' : 'months'}`
    : `${Math.floor(pet.age / 12)} ${Math.floor(pet.age / 12) === 1 ? 'year' : 'years'}`;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(pet.id);
    } else {
      addFavorite(pet.id);
    }
  };

  const handleDelete = async () => {
    try {
      toast.loading('Deleting pet listing...');
      
      const { error: requestsError } = await supabase
        .from('adoption_requests')
        .delete()
        .eq('pet_id', pet.id);

      if (requestsError) {
        console.error('Error deleting adoption requests:', requestsError);
        toast.dismiss();
        toast.error('Failed to delete related adoption requests');
        return;
      }

      const { error } = await supabase
        .from('pets')
        .delete()
        .eq('id', pet.id);

      if (error) throw error;
      
      toast.dismiss();
      toast.success('Pet deleted successfully');
      navigate('/my-pets');
    } catch (error) {
      console.error('Error deleting pet:', error);
      toast.dismiss();
      toast.error('Failed to delete pet');
    }
  };

  const handleCardClick = () => {
    navigate(`/pets/${pet.id}`);
  };

  return (
    <div 
      className="pet-card group cursor-pointer" 
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={pet.image_url}
          alt={pet.name}
          className="pet-card-image group-hover:scale-105 transition-transform duration-300"
        />
        {isApproved && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white text-xl font-bold">Already Adopted</span>
          </div>
        )}
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            size={20} 
            className={cn(
              "transition-colors", 
              favorite ? "fill-red-500 text-red-500" : "text-gray-400"
            )} 
          />
        </button>

        {pet.user_id === (user?.id || null) && (
          <Dialog>
            <DialogTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 left-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                aria-label="Delete pet"
              >
                <Trash2 size={20} className="text-red-500" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Pet Listing</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to delete this pet listing? This action cannot be undone.</p>
              <div className="flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive" onClick={handleDelete}>Delete</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="pet-tag bg-pet-light-purple text-pet-dark-purple">
            {pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}
          </span>
          <span className="pet-tag bg-pet-soft-blue text-blue-700">
            {ageDisplay}
          </span>
        </div>
      </div>
      <div className="pet-card-content">
        <div className="flex items-center gap-1 mb-1">
          <PawPrint size={16} className="text-pet-purple" />
          <h4 className="text-sm font-medium text-pet-purple">{pet.breed}</h4>
        </div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold line-clamp-1">{pet.name}</h3>
          <span className="text-sm font-medium text-pet-purple">₹{pet.adoption_fee}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1">{pet.location}</p>
        <p className="text-sm line-clamp-2 mt-1">{pet.description}</p>
        
        {ownerProfile && (
          <div className="mt-3 pt-3 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User size={14} />
              <span>{ownerProfile.name || 'Pet Owner'}</span>
            </div>
            {ownerProfile.contact_phone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Phone size={14} />
                <span>{ownerProfile.contact_phone}</span>
              </div>
            )}
            {ownerProfile.contact_email && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Mail size={14} />
                <span>{ownerProfile.contact_email}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PetCard;
