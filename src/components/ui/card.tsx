import { cn } from '../../lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn('bg-white shadow-md rounded-lg p-4', className)}>
      {children}
    </div>
  );
}
