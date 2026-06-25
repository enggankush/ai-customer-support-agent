'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black px-4">
      <main className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Customer Support Agent
        </h1>

        <p className="text-xl text-zinc-700 dark:text-zinc-300 mb-8">
          Intelligent refund request processing with real AI agent orchestration
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link
            href="/chat"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            💬 Chat with Agent
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
          >
            📊 View Dashboard
          </Link>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 text-left space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            <strong>Features:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Real-time chat interface for refund requests</li>
            <li>AI agent with OpenAI function calling</li>
            <li>Intelligent decision-making based on policies</li>
            <li>Complete reasoning and logging</li>
            <li>Professional dashboard for admin review</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
