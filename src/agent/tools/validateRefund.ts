import { daysBetween } from '@/utils/helpers';
import { getOrderById, getCustomerById } from '@/data/seeds';
import { AgentResponse } from '@/types';

/**
 * Minimal validation engine that checks refund rules against order & customer.
 * Returns a structured AgentResponse-like object.
 */
export async function validateRefundTool(params: {
  orderId?: string;
  customerId?: string;
}): Promise<AgentResponse> {
  const { orderId, customerId } = params;
  const toolCalls: string[] = ['getOrder', 'getCustomer', 'getRefundPolicy'];

  if (!orderId && !customerId) {
    return {
      decision: 'DENIED',
      reason: 'Missing orderId and customerId',
      policyMatched: 'Rule 0',
      confidence: 0.0,
      toolCalls,
      timestamp: new Date().toISOString(),
    };
  }

  const order = orderId ? getOrderById(orderId) : undefined;
  const customer = customerId ? getCustomerById(customerId) : undefined;

  // Basic checks
  if (!order) {
    return {
      decision: 'DENIED',
      reason: 'Order not found',
      policyMatched: 'Rule 0',
      confidence: 0.0,
      toolCalls,
      timestamp: new Date().toISOString(),
    };
  }

  // Rule: Digital products cannot be refunded
  if (order.category === 'digital_products') {
    return {
      decision: 'DENIED',
      reason: 'Digital products are non-refundable',
      policyMatched: 'Rule 3',
      confidence: 0.98,
      toolCalls,
      timestamp: new Date().toISOString(),
    };
  }

  // Rule: Gift cards cannot be refunded
  if (order.category === 'gift_cards') {
    return {
      decision: 'DENIED',
      reason: 'Gift cards are non-refundable',
      policyMatched: 'Rule 4',
      confidence: 0.99,
      toolCalls,
      timestamp: new Date().toISOString(),
    };
  }

  // Rule: Damaged items => approve
  if (order.status === 'DAMAGED') {
    return {
      decision: 'APPROVED',
      reason: 'Order marked as damaged',
      policyMatched: 'Rule 2',
      confidence: 0.95,
      toolCalls,
      timestamp: new Date().toISOString(),
    };
  }

  // Rule: within 30-day window
  const purchaseDate = new Date(order.purchaseDate);
  const now = new Date();
  const days = daysBetween(purchaseDate, now);
  if (days <= 30) {
    // Personal care opened items are not refundable
    if (order.category === 'personal_care') {
      return {
        decision: 'DENIED',
        reason: 'Opened personal care items are not refundable',
        policyMatched: 'Rule 5',
        confidence: 0.9,
        toolCalls,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      decision: 'APPROVED',
      reason: 'Within 30-day window and item eligible',
      policyMatched: 'Rule 1',
      confidence: 0.9,
      toolCalls,
      timestamp: new Date().toISOString(),
    };
  }

  // Outside 30-day window: premium customers may get manual review
  if (customer && customer.isPremium && days <= 60) {
    return {
      decision: 'PENDING_REVIEW',
      reason: 'Premium customer eligible for manual review (31-60 days)',
      policyMatched: 'Rule 8',
      confidence: 0.6,
      toolCalls,
      timestamp: new Date().toISOString(),
    };
  }

  // Default: deny
  return {
    decision: 'DENIED',
    reason: 'Outside refund window or policy disallows refund',
    policyMatched: 'Rule 1',
    confidence: 0.5,
    toolCalls,
    timestamp: new Date().toISOString(),
  };
}

export const validateRefund_spec = {
  name: 'validateRefund',
  description: 'Validate refund eligibility given orderId and/or customerId',
  parameters: {
    type: 'object',
    properties: {
      orderId: { type: 'string' },
      customerId: { type: 'string' },
    },
    required: [],
  },
};
