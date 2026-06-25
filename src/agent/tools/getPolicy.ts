import { loadRefundPolicy } from '@/data/seeds';

export async function getPolicy(): Promise<string> {
  return loadRefundPolicy();
}

export const getPolicy_spec = {
  name: 'getPolicy',
  description: 'Return the refund policy as markdown text',
  parameters: {
    type: 'object',
    properties: {},
  },
};
