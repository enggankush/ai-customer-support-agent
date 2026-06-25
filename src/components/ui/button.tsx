import * as React from 'react';
import { cn } from '@/lib/utils';

export function Button({ className, type = 'button', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:bg-blue-400',
        className
      )}
      {...props}
    />
  );
}
