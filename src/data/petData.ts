
import { Pet } from '../types/pet';

export const pets: Pet[] = [
  {
    id: '1',
    name: 'Whiskers',
    type: 'cat',
    breed: 'Tabby',
    age: 24,
    size: 'medium',
    gender: 'male',
    color: 'Orange and White',
    description: 'Whiskers is a friendly, playful cat who loves to cuddle and chase toys. He gets along well with other cats and gentle dogs. He\'s litter box trained and enjoys lounging in sunny spots.',
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    location: 'Seattle, WA',
    goodWith: ['cats', 'children', 'dogs'],
    medicalInfo: 'Neutered, vaccinated, microchipped',
    adoptionFee: 125,
    dateAdded: '2023-06-15'
  },
  {
    id: '2',
    name: 'Luna',
    type: 'cat',
    breed: 'Tabby',
    age: 8,
    size: 'small',
    gender: 'female',
    color: 'Grey',
    description: 'Luna is a curious, energetic kitten who loves to play and explore. She purrs loudly when petted and enjoys climbing to high places. Luna would do best in a home where she gets plenty of attention and playtime.',
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
    location: 'Portland, OR',
    goodWith: ['cats', 'children'],
    medicalInfo: 'Spayed, vaccinated, microchipped',
    adoptionFee: 150,
    dateAdded: '2023-07-02'
  },
  {
    id: '3',
    name: 'Pebbles',
    type: 'bird',
    breed: 'Penguin',
    age: 36,
    size: 'small',
    gender: 'female',
    color: 'Black and White',
    description: 'Pebbles is a charming bird with a beautiful singing voice. She loves to chirp along to music and enjoys human company. Pebbles would thrive in a calm home environment with gentle handling.',
    imageUrl: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369',
    location: 'San Francisco, CA',
    goodWith: ['birds', 'quiet homes'],
    medicalInfo: 'Healthy, recently examined by avian vet',
    adoptionFee: 200,
    dateAdded: '2023-05-20'
  },
  {
    id: '4',
    name: 'Maverick',
    type: 'other',
    breed: 'Horse',
    age: 60,
    size: 'large',
    gender: 'male',
    color: 'Brown',
    description: 'Maverick is a gentle and well-trained horse who enjoys trail rides and is great with beginner riders. He has a calm temperament and gets along well with other horses. Maverick requires an owner with proper facilities and horse experience.',
    imageUrl: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2',
    location: 'Denver, CO',
    goodWith: ['horses', 'experienced handlers'],
    medicalInfo: 'Up-to-date on vaccinations and dental care',
    adoptionFee: 1500,
    dateAdded: '2023-04-12'
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
