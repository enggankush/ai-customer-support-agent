import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-blue-400',
      className
    )}
    {...props}
  />
));
Input.displayName = 'Input';
