
import { Pet } from './pet';

export interface AdoptionRequest {
  id: string;
  pet_id: string;
  requester_id: string;
  owner_id: string;
  status: string;
  message: string;
  contact_email: string;
  contact_phone: string | null;
  created_at: string;
  updated_at: string;
  pet: Pet;
  requester_profile: {
    name: string | null;
    contact_email: string | null;
    location: string | null;
  } | null;
}
