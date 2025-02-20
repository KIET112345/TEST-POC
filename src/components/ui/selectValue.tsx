import { ReactNode } from 'react';

interface SelectValueProps {
  children?: ReactNode;
  placeholder: string;
}

export function SelectValue({ children }: SelectValueProps) {
  return <span>{children}</span>;
}
