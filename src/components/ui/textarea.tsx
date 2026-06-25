import * as React from 'react';
import { cn } from '@/lib/utils';

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'w-full resize-none rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-blue-400',
      className
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';
