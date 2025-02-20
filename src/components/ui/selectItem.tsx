import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SelectItemProps {
  value: string;
  children?: ReactNode;
  onSelect: (value: string) => void;
  key: string;
}

export function SelectItem({ value, children, onSelect }: SelectItemProps) {
  return (
    <div
      className={cn('px-4 py-2 hover:bg-gray-100 cursor-pointer')}
      onClick={() => onSelect(value)}
    >
      {children}
    </div>
  );
}
