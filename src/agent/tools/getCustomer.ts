import { getCustomerById } from '@/data/seeds';
import { Customer } from '@/types';

export async function getCustomer(customerId: string): Promise<Customer | null> {
  const customer = getCustomerById(customerId);
  return customer ?? null;
}

export const getCustomer_spec = {
  name: 'getCustomer',
  description: 'Retrieve a customer profile by customer ID',
  parameters: {
    type: 'object',
    properties: {
      customerId: { type: 'string', description: 'Customer ID, e.g., CUST001' },
    },
    required: ['customerId'],
  },
};
