'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { Message as MessageType, AgentResponse } from '@/types';
import { APP_CONFIG } from '@/lib/constants';
import { generateId } from '@/utils/helpers';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const suggestedPrompts = [
  'I want to request a refund for a damaged item.',
  'My gift card purchase was charged incorrectly.',
  'Can you check if I qualify for a refund?',
  'Why was my digital subscription denied?',
  'I need help with an order that arrived late.',
];

const defaultCustomer = {
  customerId: 'CUST001',
  orderId: 'ORD001',
};

export default function ChatPage() {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: generateId(),
      role: 'assistant',
      content: `Hi there! Welcome to ${APP_CONFIG.NAME}. Start by describing your refund issue or choose a suggested prompt below.`,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [customerId, setCustomerId] = useState(defaultCustomer.customerId);
  const [orderId, setOrderId] = useState(defaultCustomer.orderId);
  const [errorMessage, setErrorMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isTyping]);

  const appendMessage = (message: MessageType) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) {
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    setIsTyping(true);

    const userMessage: MessageType = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    appendMessage(userMessage);
    setInputValue('');

    const agentMessageId = generateId();
    appendMessage({
      id: agentMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
    });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, orderId, message: text }),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error || 'Failed to send message');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Streaming not available');
      }

      const decoder = new TextDecoder();
      let assistantText = '';
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        if (streamDone) {
          break;
        }

        const chunkText = decoder.decode(value, { stream: true });
        const events = chunkText.split('\n\n').filter(Boolean);

        for (const event of events) {
          if (!event.startsWith('data:')) {
            continue;
          }
          const payload = event.replace(/^data:\s*/, '');
          try {
            const parsed = JSON.parse(payload) as {
              type: string;
              text?: string;
              agentResponse?: AgentResponse;
            };
            if (parsed.type === 'delta' && parsed.text) {
              assistantText += parsed.text;
              setMessages((current) =>
                current.map((message) =>
                  message.id === agentMessageId ? { ...message, content: assistantText } : message
                )
              );
            }
            if (parsed.type === 'done') {
              done = true;
              if (parsed.agentResponse) {
                const reason = parsed.agentResponse.reason;
                setMessages((current) =>
                  current.map((message) =>
                    message.id === agentMessageId
                      ? { ...message, content: reason || assistantText }
                      : message
                  )
                );
              }
            }
          } catch {
            // ignore JSON parse errors from partial chunks
          }
        }
      }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      setErrorMessage(error);
      setMessages((prev) => prev.filter((message) => message.id !== agentMessageId));
      appendMessage({
        id: generateId(),
        role: 'assistant',
        content: `Sorry, I couldn't complete your request: ${error}`,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    setInputValue(prompt);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 py-8 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-200/40 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-blue-600">Customer Support</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Chat with the refund assistant
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                Ask about refund eligibility, order status, or policy details. The agent streams a
                response in real time.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                Customer ID
                <Input value={customerId} onChange={(event) => setCustomerId(event.target.value)} />
              </label>
              <label className="grid gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                Order ID
                <Input value={orderId} onChange={(event) => setOrderId(event.target.value)} />
              </label>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-200/40 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/10">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Live chat</p>
                <h2 className="text-xl font-semibold">Conversation</h2>
              </div>
              {isLoading && (
                <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Streaming response...</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex max-h-[60vh] flex-col gap-3 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 p-4 shadow-inner shadow-zinc-100/80 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/20">
              <div className="flex-1 overflow-y-auto pr-2">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                <div ref={chatEndRef} />
              </div>
              {isTyping && (
                <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
                  <span>Agent is typing...</span>
                </div>
              )}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSend(inputValue);
              }}
              className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]"
            >
              <label className="grid gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                Type your message
                <Textarea
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  rows={3}
                  placeholder="Ask about your refund, order status, or returns policy."
                />
              </label>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send message'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {errorMessage ? (
              <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-200">
                {errorMessage}
              </div>
            ) : null}
          </section>

          <aside className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-200/40 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/10">
            <div className="flex items-center gap-3 rounded-3xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/25">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                  Suggested prompts
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Choose one to speed up your question.
                </p>
              </div>
            </div>
            <div className="grid gap-3">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handlePromptClick(prompt)}
                  className={`rounded-3xl border px-4 py-3 text-left text-sm transition ${
                    selectedPrompt === prompt
                      ? 'border-blue-500 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-950/60 dark:text-blue-200'
                      : 'border-zinc-200 bg-white text-zinc-800 hover:border-blue-500 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200'
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">Quick tips</p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>Use a valid customer/order ID for accurate results.</li>
                <li>Ask about refund windows, damaged items, or gift card policy.</li>
                <li>Check the assistant output for a linked decision and reasoning.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
