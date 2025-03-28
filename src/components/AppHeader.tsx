
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import { cn } from '@/lib/utils';

const AppHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Pets', path: '/pets' },
    { name: 'Favorites', path: '/favorites' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-background/90 border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-pet-purple to-pet-dark-purple bg-clip-text text-transparent">
            Adoptify
          </span>
        </Link>
        
        <nav className="hidden md:flex gap-6">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-primary",
                isActive(link.path) 
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.name}
              {link.path === '/favorites' && favorites.length > 0 && (
                <span className="absolute -top-2 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {favorites.length}
                </span>
              )}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Link to="/favorites">
            <Button variant="outline" size="icon" className="relative">
              <Heart className="h-4 w-4" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  {favorites.length}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/adopt">
            <Button>Adopt Now</Button>
          </Link>
        </div>
        
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-6 space-y-4 border-b bg-background">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "block py-2 text-sm font-medium",
                isActive(link.path) ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
              {link.path === '/favorites' && favorites.length > 0 && (
                <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {favorites.length}
                </span>
              )}
            </Link>
          ))}
          <div className="pt-4 flex gap-4 border-t">
            <Button variant="outline" size="sm" className="flex-1">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Link to="/adopt" className="flex-1">
              <Button size="sm" className="w-full">Adopt Now</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
