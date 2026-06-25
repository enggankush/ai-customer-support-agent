import fs from 'fs';
import path from 'path';
import { AgentLog } from '@/types';

const LOGS_PATH = path.join(process.cwd(), 'src/data/logs.json');

export async function saveLog(log: AgentLog): Promise<boolean> {
  try {
    let existing: AgentLog[] = [];
    if (fs.existsSync(LOGS_PATH)) {
      existing = JSON.parse(fs.readFileSync(LOGS_PATH, 'utf-8')) as AgentLog[];
    }
    existing.unshift(log);
    fs.writeFileSync(LOGS_PATH, JSON.stringify(existing, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Failed to save log', error);
    return false;
  }
}

export const saveLog_spec = {
  name: 'saveLog',
  description: 'Persist agent reasoning log entry',
  parameters: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      customerId: { type: 'string' },
      timestamp: { type: 'string' },
      customerMessage: { type: 'string' },
      toolsUsed: { type: 'array', items: { type: 'string' } },
      intermediateSteps: { type: 'array', items: { type: 'string' } },
      finalDecision: { type: 'object' },
    },
    required: ['id', 'customerId', 'timestamp', 'finalDecision'],
  },
};
