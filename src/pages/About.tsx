
import AppHeader from '@/components/AppHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-center">About Adoptify</h1>
          
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              At Adoptify, our mission is to connect loving homes with pets in need. We believe every animal deserves a 
              chance to find their forever family. By providing a simple, accessible platform for pet adoption, we aim to 
              reduce the number of pets in shelters and increase successful adoptions nationwide.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">How We Help</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-secondary rounded-xl p-5">
                <h3 className="font-medium text-lg mb-2">For Adopters</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Simple search and filter options</li>
                  <li>• Detailed pet profiles</li>
                  <li>• Streamlined adoption process</li>
                  <li>• Post-adoption support resources</li>
                </ul>
              </div>
              
              <div className="bg-secondary rounded-xl p-5">
                <h3 className="font-medium text-lg mb-2">For Shelters & Rescues</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Increased visibility for available pets</li>
                  <li>• Simplified listing management</li>
                  <li>• Adoption application screening</li>
                  <li>• Analytics and reporting tools</li>
                </ul>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-6">
              Adoptify began in 2018 with a simple idea: make pet adoption easier and more accessible. Founded by a team 
              of animal lovers and technology experts, we've grown from a small local platform to a nationwide network 
              connecting thousands of pets with their forever homes. Our dedicated team works tirelessly to improve the 
              platform and provide the best possible experience for both adopters and animal welfare organizations.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
            <p className="text-muted-foreground mb-6">
              Whether you're looking to adopt, volunteer, or support our mission, there are many ways to get involved with 
              Adoptify. By joining our community, you become part of a movement to ensure every pet finds the loving home 
              they deserve.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pets">
                <Button className="w-full">Find a Pet</Button>
              </Link>
              <Button variant="outline" className="w-full">Contact Us</Button>
            </div>
          </div>
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

export default About;
