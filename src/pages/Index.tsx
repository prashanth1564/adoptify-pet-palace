
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Search, ArrowRight, PawPrint } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import PetGrid from '@/components/PetGrid';
import { getRecentPets } from '@/data/petData';

const Index = () => {
  const recentPets = getRecentPets(4);

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-secondary to-background">
          <div className="container max-w-5xl mx-auto text-center">
            <div className="mb-8 inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full border">
              <PawPrint size={16} className="text-pet-purple" />
              <span className="text-sm font-medium">Find your perfect companion today</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pet-purple to-pet-dark-purple bg-clip-text text-transparent">
              Adopt a Pet, <br className="md:hidden" />
              Gain a Friend
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with adorable pets across India waiting for their forever homes. 
              Browse our selection of Indian breeds and rescue animals looking for loving families.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pets">
                <Button size="lg" className="gap-2">
                  <Search size={18} />
                  Find Pets
                </Button>
              </Link>
              <Link to="/favorites">
                <Button size="lg" variant="outline" className="gap-2">
                  <Heart size={18} />
                  View Favorites
                </Button>
              </Link>
            </div>
            
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-pet-purple mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Available Pets</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-pet-purple mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Happy Adoptions</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-pet-purple mb-2">20+</div>
                <div className="text-sm text-muted-foreground">Partner Shelters</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-pet-purple mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Cities in India</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Recent pets section */}
        <section className="py-12 px-4 md:px-6">
          <div className="container max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
              <Link to="/pets" className="text-pet-purple hover:text-pet-dark-purple flex items-center gap-1">
                View all <ArrowRight size={16} />
              </Link>
            </div>
            
            <PetGrid pets={recentPets} />
          </div>
        </section>
        
        {/* Adoption process section */}
        <section className="py-12 px-4 md:px-6 bg-secondary">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How Adoption Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pet-light-purple text-pet-purple mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-3">Browse & Choose</h3>
                <p className="text-muted-foreground">
                  Browse pets from shelters across India, filter by location, type, and other preferences to find your perfect match.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pet-light-purple text-pet-purple mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-3">Apply to Adopt</h3>
                <p className="text-muted-foreground">
                  Submit your adoption application with valid ID proof as per Indian pet adoption regulations. Our team will review it quickly.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pet-light-purple text-pet-purple mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-3">Welcome Home</h3>
                <p className="text-muted-foreground">
                  Once approved, complete the adoption process and welcome your new friend to their forever home in India.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/adopt">
                <Button>Start Your Adoption Journey</Button>
              </Link>
            </div>
          </div>
        </section>
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

export default Index;
