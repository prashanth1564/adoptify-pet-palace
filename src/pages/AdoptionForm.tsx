
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import AppHeader from '@/components/AppHeader';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pet } from '@/types/pet';

const adoptionSchema = z.object({
  contact_email: z.string().email({ message: 'Please enter a valid email address' }),
  contact_phone: z.string().optional(),
  message: z.string().min(20, { message: 'Please write at least 20 characters about why you want to adopt this pet' }),
});

type AdoptionFormValues = z.infer<typeof adoptionSchema>;

const AdoptionForm = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<AdoptionFormValues>({
    resolver: zodResolver(adoptionSchema),
    defaultValues: {
      contact_email: user?.email || '',
      contact_phone: '',
      message: '',
    },
  });

  useEffect(() => {
    if (!id) return;
    
    const fetchPet = async () => {
      try {
        const { data, error } = await supabase
          .from('pets')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setPet(data as Pet);
        }
      } catch (error) {
        console.error('Error fetching pet:', error);
        toast.error('Error fetching pet details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPet();
  }, [id]);
  
  useEffect(() => {
    // Update the form with user's email when the user data is available
    if (user?.email) {
      form.setValue('contact_email', user.email);
    }
  }, [user, form]);

  const onSubmit = async (values: AdoptionFormValues) => {
    if (!user) {
      toast.error('You must be logged in to submit an adoption request');
      navigate('/auth');
      return;
    }
    
    if (!pet) {
      toast.error('Pet data is missing');
      return;
    }
    
    if (user.id === pet.user_id) {
      toast.error("You can't adopt your own pet");
      return;
    }

    setSubmitting(true);

    try {
      // Check if user already has an active request for this pet
      const { data: existingRequests, error: checkError } = await supabase
        .from('adoption_requests')
        .select('*')
        .eq('pet_id', id)
        .eq('requester_id', user.id);
        
      if (checkError) throw checkError;
      
      if (existingRequests && existingRequests.length > 0) {
        toast.error('You already have an active adoption request for this pet');
        return;
      }
      
      // Submit adoption request
      const { error } = await supabase
        .from('adoption_requests')
        .insert({
          pet_id: id,
          requester_id: user.id,
          owner_id: pet.user_id,
          message: values.message,
          contact_email: values.contact_email,
          contact_phone: values.contact_phone || null,
        });
        
      if (error) throw error;
      
      toast.success('Adoption request submitted successfully!');
      
      // Redirect to pet details page
      navigate(`/pets/${id}`);
      
    } catch (error: any) {
      toast.error(`Failed to submit adoption request: ${error.message}`);
      console.error('Error submitting adoption request:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Pet Not Found</CardTitle>
              <CardDescription>
                The pet you're looking for might have been adopted or removed.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate('/pets')} className="w-full">
                Browse Other Pets
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  // If the user is the owner of the pet, redirect them
  if (user?.id === pet.user_id) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>This is Your Pet</CardTitle>
              <CardDescription>
                You cannot submit an adoption request for your own pet.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex gap-4">
              <Button onClick={() => navigate(`/pets/${id}`)} className="flex-1">
                View Pet Details
              </Button>
              <Button onClick={() => navigate('/pets')} variant="outline" className="flex-1">
                Browse Other Pets
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <Button variant="outline" className="mb-6" onClick={() => navigate(`/pets/${id}`)}>
            ← Back to Pet Details
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle>Adopt {pet.name}</CardTitle>
              <CardDescription>
                Please fill out this form to express your interest in adopting {pet.name}, 
                the {pet.breed} {pet.type}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <img 
                    src={pet.image_url} 
                    alt={pet.name} 
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{pet.name}</h3>
                    <p className="text-sm text-muted-foreground">{pet.breed} · {pet.location}</p>
                    <p className="text-sm mt-1">Adoption Fee: ₹{pet.adoption_fee}</p>
                  </div>
                </div>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="contact_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The owner will contact you at this email
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contact_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Providing a phone number is optional but helps speed up the process
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Why do you want to adopt {pet.name}?</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            className="min-h-32"
                            placeholder={`Tell the owner why you'd be a good match for ${pet.name}, your experience with ${pet.type}s, and about your living situation.`}
                          />
                        </FormControl>
                        <FormDescription>
                          Be specific and honest about your ability to care for this pet
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Adoption Request'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdoptionForm;
