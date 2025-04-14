
export type PetType = 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other';

export type PetSize = 'small' | 'medium' | 'large';

export type PetGender = 'male' | 'female';

export interface Pet {
  id: string;
  user_id: string;
  name: string;
  type: PetType;
  breed: string;
  age: number; // in months
  size: PetSize;
  gender: PetGender;
  color: string;
  description: string;
  image_url: string;
  location: string;
  good_with: string[];
  medical_info: string | null;
  adoption_fee: number | null;
  date_added: string;
  habitat: string | null;
  habits: string | null;
  origin: string | null;
}
