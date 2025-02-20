import { cn } from '../../lib/utils';
import { ReactNode } from 'react';

interface SelectTriggerProps {
  className?: string;
  children: ReactNode;
  placeholder: string;
}

export function SelectTrigger({ className, children }: SelectTriggerProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between border px-3 py-2 rounded-md cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
