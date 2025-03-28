
export type PetType = 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other';

export type PetSize = 'small' | 'medium' | 'large';

export type PetGender = 'male' | 'female';

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  age: number; // in months
  size: PetSize;
  gender: PetGender;
  color: string;
  description: string;
  imageUrl: string;
  location: string;
  goodWith: string[];
  medicalInfo: string;
  adoptionFee: number;
  dateAdded: string;
}
