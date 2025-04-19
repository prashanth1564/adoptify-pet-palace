
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

type FavoritesContextType = {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('petFavorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      // If there's an error parsing JSON, reset favorites
      localStorage.removeItem('petFavorites');
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('petFavorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
      toast.error('Failed to save favorites. Please try again.');
    }
  }, [favorites]);

  const addFavorite = (id: string) => {
    if (!favorites.includes(id)) {
      setFavorites(prev => [...prev, id]);
      toast.success('Added to favorites', { duration: 2000 });
    }
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(favId => favId !== id));
    toast.success('Removed from favorites', { duration: 2000 });
  };

  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
