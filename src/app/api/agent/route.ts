import { NextResponse } from 'next/server';
import { runAgent } from '@/agent/orchestrator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerId, orderId, message } = body;
    if (!message) {
      return NextResponse.json({ error: 'Missing message' }, { status: 400 });
    }

    const result = await runAgent({ customerId, orderId, customerMessage: message });
    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Agent API error', err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
