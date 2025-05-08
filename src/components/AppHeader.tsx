import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const AppHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Explicitly type the navLinks array to include the optional icon property
  type NavLink = {
    name: string;
    path: string;
    icon?: React.ComponentType<any>;
  };
  
  const navLinks: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'Pets', path: '/pets' },
    { name: 'Favorites', path: '/favorites', icon: Heart },
    { name: 'About', path: '/about' },
    { name: 'Documentation', path: '/documentation' },
  ];

  const authLinks: NavLink[] = user ? [
    { name: 'List a Pet', path: '/list-pet' },
    { name: 'My Pets', path: '/my-pets' },
  ] : [];

  const allLinks = [...navLinks, ...authLinks];

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
          {allLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
                isActive(link.path) 
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.icon && <link.icon className="h-4 w-4" />}
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Button 
              onClick={() => navigate('/profile')} 
              variant="ghost" 
              size="icon"
              className="ml-auto"
            >
              <UserRound className="h-5 w-5" />
            </Button>
          ) : (
            <Button onClick={() => navigate('/auth')}>
              Sign In
            </Button>
          )}
        </div>
        
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-6 space-y-4 border-b bg-background">
          {allLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "block py-2 text-sm font-medium flex items-center gap-2",
                isActive(link.path) ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.icon && <link.icon className="h-4 w-4" />}
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex gap-4 border-t">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => {
                    navigate('/profile');
                    setMobileMenuOpen(false);
                  }}
                >
                  <UserRound className="h-4 w-4" />
                  Profile
                </Button>
              </>
            ) : (
              <Button 
                size="sm" 
                className="w-full" 
                onClick={() => {
                  navigate('/auth');
                  setMobileMenuOpen(false);
                }}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
