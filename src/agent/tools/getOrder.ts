import { getOrderById } from '@/data/seeds';
import { Order } from '@/types';

export async function getOrder(orderId: string): Promise<Order | null> {
  const order = getOrderById(orderId);
  return order ?? null;
}

export const getOrder_spec = {
  name: 'getOrder',
  description: 'Retrieve an order by order ID',
  parameters: {
    type: 'object',
    properties: {
      orderId: { type: 'string', description: 'Order ID, e.g., ORD001' },
    },
    required: ['orderId'],
  },
};
