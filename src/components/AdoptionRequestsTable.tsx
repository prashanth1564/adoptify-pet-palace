
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdoptionRequest } from '@/types/adoptionRequest';
import AdoptionRequestRow from './AdoptionRequestRow';

interface AdoptionRequestsTableProps {
  title: string;
  description: string;
  requests: AdoptionRequest[];
  showRequesterInfo?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewPet: (petId: string) => void;
  isRequestorView?: boolean;
}

const AdoptionRequestsTable = ({
  title,
  description,
  requests,
  showRequesterInfo = false,
  onApprove,
  onReject,
  onDelete,
  onViewPet,
  isRequestorView = false
}: AdoptionRequestsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pet</TableHead>
              {showRequesterInfo && <TableHead>From</TableHead>}
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map(request => (
              <AdoptionRequestRow
                key={request.id}
                request={request}
                showActions={showRequesterInfo}
                onApprove={onApprove}
                onReject={onReject}
                onDelete={onDelete}
                onViewPet={onViewPet}
                isRequestorView={isRequestorView}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdoptionRequestsTable;
