import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import AppHeader from '@/components/AppHeader';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const petSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  type: z.string().min(1, { message: 'Pet type is required' }),
  breed: z.string().min(1, { message: 'Breed is required' }),
  age: z.coerce.number().min(0, { message: 'Age must be a positive number' }),
  size: z.string().min(1, { message: 'Size is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  color: z.string().min(1, { message: 'Color is required' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  location: z.string().min(1, { message: 'Location is required' }),
  medical_info: z.string().optional(),
  adoption_fee: z.coerce.number().min(0, { message: 'Adoption fee must be a positive number' }),
  habitat: z.string().min(1, { message: 'Habitat information is required' }),
  habits: z.string().min(1, { message: 'Habits information is required' }),
  origin: z.string().min(1, { message: 'Origin information is required' }),
  good_with_children: z.boolean().optional(),
  good_with_dogs: z.boolean().optional(),
  good_with_cats: z.boolean().optional(),
  good_with_other_animals: z.boolean().optional(),
  image: z.instanceof(FileList).refine(files => files.length > 0, {
    message: 'Pet image is required',
  }),
});

type PetFormValues = z.infer<typeof petSchema>;

const petTypes = ['dog', 'cat', 'bird', 'rabbit', 'hamster', 'other'];
const petSizes = ['small', 'medium', 'large'];
const petGenders = ['male', 'female'];

const ListPet = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<PetFormValues>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: '',
      type: '',
      breed: '',
      age: 0,
      size: '',
      gender: '',
      color: '',
      description: '',
      location: '',
      medical_info: '',
      adoption_fee: 0,
      habitat: '',
      habits: '',
      origin: '',
      good_with_children: false,
      good_with_dogs: false,
      good_with_cats: false,
      good_with_other_animals: false,
    },
  });

  const onSubmit = async (values: PetFormValues) => {
    if (!user) {
      toast.error('You must be logged in to list a pet');
      navigate('/auth');
      return;
    }

    setIsUploading(true);

    try {
      // First, upload the image to Supabase storage
      const file = values.image[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('pet_images')
        .upload(filePath, file);

      if (uploadError) {
        throw new Error(`Error uploading image: ${uploadError.message}`);
      }

      // Get the public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('pet_images')
        .getPublicUrl(filePath);

      // Prepare goodWith array
      const goodWith = [];
      if (values.good_with_children) goodWith.push('children');
      if (values.good_with_dogs) goodWith.push('dogs');
      if (values.good_with_cats) goodWith.push('cats');
      if (values.good_with_other_animals) goodWith.push('other animals');

      // Now insert the pet data with the image URL
      const { error: insertError, data: pet } = await supabase
        .from('pets')
        .insert({
          user_id: user.id,
          name: values.name,
          type: values.type,
          breed: values.breed,
          age: values.age,
          size: values.size,
          gender: values.gender,
          color: values.color,
          description: values.description,
          image_url: publicUrl,
          location: values.location,
          good_with: goodWith,
          medical_info: values.medical_info || 'Vaccinated and healthy',
          adoption_fee: values.adoption_fee,
          habitat: values.habitat,
          habits: values.habits,
          origin: values.origin,
        })
        .select()
        .single();

      if (insertError) {
        throw new Error(`Error inserting pet data: ${insertError.message}`);
      }

      toast.success('Pet listed successfully! 🐾');
      navigate(`/pets/${pet!.id}`);

    } catch (error: any) {
      toast.error(`Failed to list pet: ${error.message}`);
      console.error('Error listing pet:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>List Your Pet for Adoption</CardTitle>
              <CardDescription>
                Complete this form to help your pet find their forever home
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pet Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter pet name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pet Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select pet type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {petTypes.map(type => (
                                <SelectItem key={type} value={type}>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="breed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Breed</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter breed" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age (in months)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter age in months (e.g., 24 for 2 years)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Size</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {petSizes.map(size => (
                                <SelectItem key={size} value={size}>
                                  {size.charAt(0).toUpperCase() + size.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {petGenders.map(gender => (
                                <SelectItem key={gender} value={gender}>
                                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter pet color" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="City, State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="adoption_fee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adoption Fee (₹)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your pet's personality, behavior, and reason for adoption" 
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="medical_info"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medical Information</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Vaccination status, health conditions, special needs (if any)" 
                              className="min-h-20"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="habitat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Natural Habitat</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Environment the breed naturally thrives in" 
                                className="min-h-20"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="habits"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Common Habits</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Typical behaviors and characteristics of the breed" 
                                className="min-h-20"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="origin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Origin</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Where the breed originates from" 
                                className="min-h-20"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <FormLabel>Good With</FormLabel>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="good_with_children"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Children</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="good_with_dogs"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Dogs</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="good_with_cats"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Cats</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="good_with_other_animals"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Other Animals</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel>Pet Photo</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => onChange(e.target.files)}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Upload a clear photo of your pet (max 5MB)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isUploading}>
                      {isUploading ? 'Uploading...' : 'List Pet for Adoption'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ListPet;
