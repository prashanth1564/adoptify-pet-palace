
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

interface EmptyStateCardProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyStateCard = ({ title, description, actionLabel, onAction }: EmptyStateCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {actionLabel && onAction && (
        <CardFooter>
          <Button onClick={onAction}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {actionLabel}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default EmptyStateCard;
