
import { useNavigate } from 'react-router-dom';
import { Pet } from '@/types/pet';
import { useFavorites } from '@/context/FavoritesContext';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PetCardProps {
  pet: Pet;
}

const PetCard = ({ pet }: PetCardProps) => {
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(pet.id);

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

  return (
    <div 
      className="pet-card group cursor-pointer" 
      onClick={() => navigate(`/pets/${pet.id}`)}
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="pet-card-image group-hover:scale-105 transition-transform duration-300"
        />
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart 
            size={20} 
            className={cn(
              "transition-colors", 
              favorite ? "fill-red-500 text-red-500" : "text-gray-400"
            )} 
          />
        </button>
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
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold line-clamp-1">{pet.name}</h3>
          <span className="text-sm font-medium text-pet-purple">${pet.adoptionFee}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1">{pet.breed} • {pet.location}</p>
        <p className="text-sm line-clamp-2 mt-1">{pet.description}</p>
      </div>
    </div>
  );
};

export default PetCard;
