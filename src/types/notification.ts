
export interface Notification {
  id: string;
  type: 'adoption_request' | 'adoption_approved' | 'adoption_rejected' | 'message';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  relatedId?: string; // ID of related item (request ID, pet ID, etc)
}
