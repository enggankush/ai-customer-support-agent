/**
 * Customer profile type definition
 */
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orderId: string;
  product: string;
  category: string;
  purchaseDate: string;
  deliveryDate: string;
  price: number;
  refundStatus: 'PENDING' | 'APPROVED' | 'DENIED' | 'REFUNDED';
  isPremium: boolean;
  reason: string;
}

/**
 * Order details type
 */
export interface Order {
  orderId: string;
  customerId: string;
  product: string;
  category: string;
  purchaseDate: string;
  deliveryDate: string;
  price: number;
  status: 'DELIVERED' | 'DAMAGED' | 'RETURNED' | 'REFUNDED';
}

/**
 * Agent response type
 */
export interface AgentResponse {
  decision: 'APPROVED' | 'DENIED' | 'PENDING_REVIEW';
  reason: string;
  policyMatched: string;
  confidence: number;
  toolCalls: string[];
  timestamp: string;
}

/**
 * Refund policy rule
 */
export interface RefundPolicyRule {
  id: string;
  title: string;
  description: string;
  applicable: boolean;
}

/**
 * Agent log entry
 */
export interface AgentLog {
  id: string;
  customerId: string;
  timestamp: string;
  customerMessage: string;
  toolsUsed: string[];
  intermediateSteps: string[];
  finalDecision: AgentResponse;
}

/**
 * Chat message type
 */
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

/**
 * Chat context for conversation
 */
export interface ChatContext {
  messages: Message[];
  customerId?: string;
  agentLogs: AgentLog[];
}
