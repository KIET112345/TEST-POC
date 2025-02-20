import { cn } from '../../lib/utils';
import { ReactNode } from 'react';

interface CardContentProps {
  className?: string;
  children: ReactNode;
}

export function CardContent({ className, children }: CardContentProps) {
  return <div className={cn('p-4', className)}>{children}</div>;
}
