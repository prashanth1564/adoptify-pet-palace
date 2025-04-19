
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, ExternalLink, Mail, Phone } from 'lucide-react';
import { AdoptionRequest } from '@/types/adoptionRequest';

interface AdoptionRequestRowProps {
  request: AdoptionRequest;
  showActions?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onViewPet: (petId: string) => void;
}

const AdoptionRequestRow = ({ 
  request, 
  showActions = false,
  onApprove,
  onReject,
  onViewPet
}: AdoptionRequestRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center space-x-3">
          <img 
            src={request.pet.image_url || ''} 
            alt={request.pet.name}
            className="w-10 h-10 rounded-md object-cover"
          />
          <div>
            <div>{request.pet.name}</div>
            <div className="text-sm text-muted-foreground">{request.pet.breed}</div>
          </div>
        </div>
      </TableCell>
      {showActions && (
        <TableCell>
          <div>
            <div>{request.requester_profile?.name || 'Unknown User'}</div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Mail className="h-3 w-3" />
              {request.contact_email}
            </div>
            {request.contact_phone && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Phone className="h-3 w-3" />
                {request.contact_phone}
              </div>
            )}
          </div>
        </TableCell>
      )}
      <TableCell>
        <Badge 
          variant={
            request.status === 'approved' ? 'success' :
            request.status === 'rejected' ? 'destructive' :
            'default'
          }
        >
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </Badge>
      </TableCell>
      <TableCell>
        {new Date(request.created_at).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewPet(request.pet_id)}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          
          {showActions && request.status === 'pending' && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={() => onApprove?.(request.id)}
                className="bg-green-500 hover:bg-green-600"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onReject?.(request.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AdoptionRequestRow;
