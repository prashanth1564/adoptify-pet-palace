import { Pet } from '../types/pet';

export const pets: Pet[] = [
  {
    id: '1',
    name: 'Raja',
    type: 'dog',
    breed: 'Indian Pariah',
    age: 24,
    size: 'medium',
    gender: 'male',
    color: 'Tan and White',
    description: 'Raja is a loyal and intelligent dog who loves long walks and playing fetch. He has excellent guarding instincts and is very protective of his family. He\'s house-trained and gets along well with children.',
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
    location: 'Mumbai, Maharashtra',
    goodWith: ['children', 'families'],
    medicalInfo: 'Neutered, vaccinated, dewormed',
    adoptionFee: 2000,
    dateAdded: '2023-06-15'
  },
  {
    id: '2',
    name: 'Lakshmi',
    type: 'cat',
    breed: 'Indian Domestic',
    age: 8,
    size: 'small',
    gender: 'female',
    color: 'Grey Tabby',
    description: 'Lakshmi is a playful and affectionate kitten who brings good fortune to any home. She loves to chase toys and cuddle with her humans. She would thrive in a home where she gets plenty of attention.',
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    location: 'Delhi, NCR',
    goodWith: ['cats', 'quiet homes'],
    medicalInfo: 'Spayed, vaccinated, microchipped',
    adoptionFee: 1500,
    dateAdded: '2023-07-02'
  },
  {
    id: '3',
    name: 'Moti',
    type: 'bird',
    breed: 'Indian Ringneck Parrot',
    age: 36,
    size: 'small',
    gender: 'male',
    color: 'Green and Yellow',
    description: 'Moti is a chatty and colorful parrot who can speak several words in Hindi and English. He enjoys mimicking sounds and interacting with humans. Moti would do best in a home with experienced bird owners.',
    imageUrl: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369',
    location: 'Bangalore, Karnataka',
    goodWith: ['bird lovers', 'quiet homes'],
    medicalInfo: 'Healthy, examined by avian vet',
    adoptionFee: 3000,
    dateAdded: '2023-05-20'
  },
  {
    id: '4',
    name: 'Shiva',
    type: 'dog',
    breed: 'Mudhol Hound',
    age: 60,
    size: 'large',
    gender: 'male',
    color: 'Fawn',
    description: 'Shiva is a majestic Mudhol Hound with a gentle temperament. He is well-trained, loyal, and has excellent hunting instincts. He requires an active family with a spacious home, preferably with a yard.',
    imageUrl: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2',
    location: 'Pune, Maharashtra',
    goodWith: ['experienced owners', 'active families'],
    medicalInfo: 'Neutered, vaccinated, regular check-ups',
    adoptionFee: 4000,
    dateAdded: '2023-04-12'
  },
  {
    id: '5',
    name: 'Ganga',
    type: 'cat',
    breed: 'Himalayan',
    age: 30,
    size: 'medium',
    gender: 'female',
    color: 'White and Grey',
    description: 'Ganga is a gorgeous Himalayan cat with a calm and gentle nature. She enjoys lounging in sunny spots and being brushed daily. She would be perfect for a family looking for a low-maintenance but loving companion.',
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
    location: 'Kolkata, West Bengal',
    goodWith: ['seniors', 'quiet homes'],
    medicalInfo: 'Spayed, vaccinated, dental check-up done',
    adoptionFee: 3500,
    dateAdded: '2023-03-25'
  },
  {
    id: '6',
    name: 'Krishna',
    type: 'rabbit',
    breed: 'Indian White',
    age: 12,
    size: 'small',
    gender: 'male',
    color: 'White',
    description: 'Krishna is an adorable rabbit who loves to hop around and explore. He is litter-trained and enjoys fresh vegetables. He would make a wonderful pet for a family with children who can handle him gently.',
    imageUrl: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2',
    location: 'Chennai, Tamil Nadu',
    goodWith: ['children', 'first-time owners'],
    medicalInfo: 'Neutered, vaccinated, healthy diet',
    adoptionFee: 1200,
    dateAdded: '2023-08-10'
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
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, count);
};
