import { cn } from '../../lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost';
}

export function Button({
  className,
  variant = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 text-white font-medium rounded-xl transition',
        variant === 'default' && 'bg-blue-600 hover:bg-blue-700',
        variant === 'ghost' && 'bg-transparent text-gray-700 hover:bg-gray-100',
        className
      )}
      {...props}
    />
  );
}
