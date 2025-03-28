
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PetType } from '@/types/pet';
import { Cat, Dog, Bird, Rabbit, Gauge, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  type: PetType | 'all';
  size: string;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    size: 'all',
  });

  const handleTypeChange = (type: PetType | 'all') => {
    const newFilters = { ...filters, type };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSizeChange = (size: string) => {
    const newFilters = { ...filters, size };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    // Fix: Properly type the new filters object to match FilterState
    const newFilters: FilterState = { type: 'all', size: 'all' };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const isFiltersActive = filters.type !== 'all' || filters.size !== 'all';

  return (
    <div className="bg-secondary rounded-xl p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Pet Type</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                filters.type === 'all' && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={() => handleTypeChange('all')}
            >
              All Pets
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                filters.type === 'dog' && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={() => handleTypeChange('dog')}
            >
              <Dog className="mr-1 h-4 w-4" /> Indian Dogs
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                filters.type === 'cat' && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={() => handleTypeChange('cat')}
            >
              <Cat className="mr-1 h-4 w-4" /> Indian Cats
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                filters.type === 'bird' && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={() => handleTypeChange('bird')}
            >
              <Bird className="mr-1 h-4 w-4" /> Birds
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                filters.type === 'rabbit' && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={() => handleTypeChange('rabbit')}
            >
              <Rabbit className="mr-1 h-4 w-4" /> Rabbits
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                filters.type === 'other' && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={() => handleTypeChange('other')}
            >
              Other
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Size</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                filters.size === 'all' && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={() => handleSizeChange('all')}
            >
              All Sizes
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                filters.size === 'small' && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={() => handleSizeChange('small')}
            >
              <Gauge className="mr-1 h-4 w-4" /> Small
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                filters.size === 'medium' && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={() => handleSizeChange('medium')}
            >
              <Gauge className="mr-1 h-4 w-4" /> Medium
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                filters.size === 'large' && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={() => handleSizeChange('large')}
            >
              <Gauge className="mr-1 h-4 w-4" /> Large
            </Button>
          </div>
        </div>

        {isFiltersActive && (
          <Button
            variant="ghost"
            size="sm"
            className="self-start mt-6 text-muted-foreground hover:text-foreground"
            onClick={clearFilters}
          >
            <X className="h-4 w-4 mr-1" /> Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
