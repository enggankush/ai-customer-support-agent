import { NextResponse } from 'next/server';
import { runAgent } from '@/agent/orchestrator';

const CHUNK_SIZE = 30;
const CHUNK_DELAY = 30;

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
  const body = await request.json();
  const { customerId, orderId, message } = body;

  if (!message) {
    return NextResponse.json({ error: 'Missing message' }, { status: 400 });
  }

  const agentResponse = await runAgent({ customerId, orderId, customerMessage: message });
  const outputText =
    agentResponse.reasoning || agentResponse.reason || 'We could not generate a response.';
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let pointer = 0;
      while (pointer < outputText.length) {
        const chunk = outputText.slice(pointer, pointer + CHUNK_SIZE);
        const payload = JSON.stringify({ type: 'delta', text: chunk });
        controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
        pointer += CHUNK_SIZE;
        await sleep(CHUNK_DELAY);
      }

      const donePayload = JSON.stringify({ type: 'done', agentResponse });
      controller.enqueue(encoder.encode(`data: ${donePayload}\n\n`));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
