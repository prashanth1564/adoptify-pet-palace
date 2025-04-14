
import { Pet } from '../types/pet';

export const pets: Pet[] = [
  {
    id: '1',
    user_id: '',
    name: 'Raja',
    type: 'dog',
    breed: 'Indian Pariah',
    age: 24,
    size: 'medium',
    gender: 'male',
    color: 'Tan and White',
    description: 'Raja is a loyal and intelligent dog who loves long walks and playing fetch. He has excellent guarding instincts and is very protective of his family. He\'s house-trained and gets along well with children.',
    image_url: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
    location: 'Mumbai, Maharashtra',
    good_with: ['children', 'families'],
    medical_info: 'Neutered, vaccinated, dewormed',
    adoption_fee: 2000,
    date_added: '2023-06-15',
    habitat: null,
    habits: null,
    origin: null
  },
  {
    id: '2',
    user_id: '',
    name: 'Lakshmi',
    type: 'cat',
    breed: 'Indian Domestic',
    age: 8,
    size: 'small',
    gender: 'female',
    color: 'Grey Tabby',
    description: 'Lakshmi is a playful and affectionate kitten who brings good fortune to any home. She loves to chase toys and cuddle with her humans. She would thrive in a home where she gets plenty of attention.',
    image_url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    location: 'Delhi, NCR',
    good_with: ['cats', 'quiet homes'],
    medical_info: 'Spayed, vaccinated, microchipped',
    adoption_fee: 1500,
    date_added: '2023-07-02',
    habitat: null,
    habits: null,
    origin: null
  },
  {
    id: '3',
    user_id: '',
    name: 'Moti',
    type: 'bird',
    breed: 'Indian Ringneck Parrot',
    age: 36,
    size: 'small',
    gender: 'male',
    color: 'Green and Yellow',
    description: 'Moti is a chatty and colorful parrot who can speak several words in Hindi and English. He enjoys mimicking sounds and interacting with humans. Moti would do best in a home with experienced bird owners.',
    image_url: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369',
    location: 'Bangalore, Karnataka',
    good_with: ['bird lovers', 'quiet homes'],
    medical_info: 'Healthy, examined by avian vet',
    adoption_fee: 3000,
    date_added: '2023-05-20',
    habitat: null,
    habits: null,
    origin: null
  },
  {
    id: '4',
    user_id: '',
    name: 'Shiva',
    type: 'dog',
    breed: 'Mudhol Hound',
    age: 60,
    size: 'large',
    gender: 'male',
    color: 'Fawn',
    description: 'Shiva is a majestic Mudhol Hound with a gentle temperament. He is well-trained, loyal, and has excellent hunting instincts. He requires an active family with a spacious home, preferably with a yard.',
    image_url: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2',
    location: 'Pune, Maharashtra',
    good_with: ['experienced owners', 'active families'],
    medical_info: 'Neutered, vaccinated, regular check-ups',
    adoption_fee: 4000,
    date_added: '2023-04-12',
    habitat: null,
    habits: null,
    origin: null
  },
  {
    id: '5',
    user_id: '',
    name: 'Ganga',
    type: 'cat',
    breed: 'Himalayan',
    age: 30,
    size: 'medium',
    gender: 'female',
    color: 'White and Grey',
    description: 'Ganga is a gorgeous Himalayan cat with a calm and gentle nature. She enjoys lounging in sunny spots and being brushed daily. She would be perfect for a family looking for a low-maintenance but loving companion.',
    image_url: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
    location: 'Kolkata, West Bengal',
    good_with: ['seniors', 'quiet homes'],
    medical_info: 'Spayed, vaccinated, dental check-up done',
    adoption_fee: 3500,
    date_added: '2023-03-25',
    habitat: null,
    habits: null,
    origin: null
  },
  {
    id: '6',
    user_id: '',
    name: 'Krishna',
    type: 'rabbit',
    breed: 'Indian White',
    age: 12,
    size: 'small',
    gender: 'male',
    color: 'White',
    description: 'Krishna is an adorable rabbit who loves to hop around and explore. He is litter-trained and enjoys fresh vegetables. He would make a wonderful pet for a family with children who can handle him gently.',
    image_url: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2',
    location: 'Chennai, Tamil Nadu',
    good_with: ['children', 'first-time owners'],
    medical_info: 'Neutered, vaccinated, healthy diet',
    adoption_fee: 1200,
    date_added: '2023-08-10',
    habitat: null,
    habits: null,
    origin: null
  }
];

export const getPets = () => {
  return pets;
};

export const getPetById = (id: string) => {
  return pets.find(pet => pet.id === id);
};

export const getPetsByType = (type: string) => {
  return pets.filter(pet => pet.type === type);
};

export const getRecentPets = (count: number) => {
  return [...pets]
    .sort((a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime())
    .slice(0, count);
};
