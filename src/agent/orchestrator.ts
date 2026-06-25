import { OpenAI } from 'openai';
import { env } from '@/lib/env';
import { getCustomer } from './tools/getCustomer';
import { getOrder } from './tools/getOrder';
import { getPolicy } from './tools/getPolicy';
import { validateRefundTool } from './tools/validateRefund';
import { saveLog } from './tools/saveLog';
import { generateId } from '@/utils/helpers';
import { AgentResponse } from '@/types';

const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export async function runAgent(params: {
  customerId?: string;
  orderId?: string;
  customerMessage: string;
  userId?: string;
}): Promise<AgentResponse & { reasoning?: string }> {
  const { customerId, orderId, customerMessage } = params;

  // 1) Retrieve data using tools
  const customer = customerId ? await getCustomer(customerId) : null;
  const order = orderId ? await getOrder(orderId) : null;
  const policyText = await getPolicy();

  const intermediateSteps: string[] = [];
  intermediateSteps.push('Searched CRM');
  intermediateSteps.push(`Customer found: ${customer ? customer.name : 'not found'}`);
  intermediateSteps.push('Read refund policy');
  intermediateSteps.push(`Policy length: ${policyText.length} chars`);

  // 2) Validate refund eligibility using tool
  const validation = await validateRefundTool({ orderId, customerId });
  intermediateSteps.push(`Validation result: ${validation.decision} - ${validation.reason}`);

  // 3) Use OpenAI Responses API for human-readable reasoning (but do NOT let it decide final result)
  let reasoning = '';
  try {
    const system = `You are an AI assistant that helps summarize tool outputs for agents. Do not make the final decision — use the decision provided by the validation tool and only produce a concise human-readable reasoning summary.`;
    const input = `Customer message: ${customerMessage}\n\nCustomer: ${customer ? JSON.stringify(customer) : 'N/A'}\nOrder: ${order ? JSON.stringify(order) : 'N/A'}\nValidation: ${JSON.stringify(validation)}\nPolicy (first 500 chars): ${policyText.slice(0, 500)}`;

    const resp = await client.responses.create({
      model: env.OPENAI_MODEL,
      input: [
        { role: 'system', content: system },
        { role: 'user', content: input },
      ],
      max_output_tokens: 400,
    });

    // The SDK returns output[0].content[0].text or similar
    const outputs = resp.output ?? [];
    if (Array.isArray(outputs) && outputs.length > 0) {
      const firstOutput = outputs[0];
      if (
        typeof firstOutput === 'object' &&
        firstOutput !== null &&
        'type' in firstOutput &&
        firstOutput.type === 'message' &&
        Array.isArray(firstOutput.content)
      ) {
        const chunk = firstOutput.content.find(
          (item) =>
            typeof item === 'object' &&
            item !== null &&
            'type' in item &&
            item.type === 'output_text'
        );
        if (
          chunk &&
          typeof chunk === 'object' &&
          'text' in chunk &&
          typeof chunk.text === 'string'
        ) {
          reasoning = chunk.text;
        }
      } else if (typeof firstOutput === 'string') {
        reasoning = firstOutput;
      }
    }
  } catch (err) {
    console.warn('Reasoning generation failed', err);
    reasoning = '';
  }

  // 4) Persist log
  const logId = generateId();
  const log = {
    id: logId,
    customerId: customerId ?? order?.customerId ?? 'unknown',
    timestamp: new Date().toISOString(),
    customerMessage,
    toolsUsed: ['getCustomer', 'getOrder', 'getPolicy', 'validateRefund'],
    intermediateSteps,
    finalDecision: validation,
  };

  await saveLog(log);

  // 5) Return structured decision (derived from validation tool). Include model reasoning as separate field.
  return {
    ...validation,
    reasoning,
  };
}
