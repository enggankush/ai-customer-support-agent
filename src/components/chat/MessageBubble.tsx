import type { Message } from '@/types';

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} py-1`}>
      <div
        className={`max-w-[80%] rounded-3xl p-4 text-sm leading-6 shadow-sm ${
          isUser
            ? 'bg-blue-600 text-white ring-1 ring-blue-500/20'
            : 'bg-zinc-100 text-zinc-900 ring-1 ring-zinc-200/80 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700'
        }`}
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="font-semibold">{isUser ? 'You' : 'Agent'}</span>
        </div>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
