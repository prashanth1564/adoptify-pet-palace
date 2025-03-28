
import PetCard from '@/components/PetCard';
import { Pet } from '@/types/pet';

interface PetGridProps {
  pets: Pet[];
  emptyMessage?: string;
}

const PetGrid = ({ pets, emptyMessage = "No pets found" }: PetGridProps) => {
  if (pets.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pets.map(pet => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
};

export default PetGrid;
