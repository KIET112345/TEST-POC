import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SelectContentProps {
  className?: string;
  children: ReactNode;
}

export function SelectContent({ className, children }: SelectContentProps) {
  return (
    <div
      className={cn(
        'absolute top-full mt-1 w-full bg-white shadow-md rounded-md overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}
