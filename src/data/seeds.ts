/**
 * Data seeding utilities for loading and validating mock data
 */
import fs from 'fs';
import path from 'path';
import { Customer, Order } from '@/types';

/**
 * Load customers data from JSON file
 */
export function loadCustomers(): Customer[] {
  try {
    const filePath = path.join(process.cwd(), 'src/data/customers.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as Customer[];
  } catch (error) {
    console.error('Error loading customers:', error);
    return [];
  }
}

/**
 * Load orders data from JSON file
 */
export function loadOrders(): Order[] {
  try {
    const filePath = path.join(process.cwd(), 'src/data/orders.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as Order[];
  } catch (error) {
    console.error('Error loading orders:', error);
    return [];
  }
}

/**
 * Load refund policy from markdown file
 */
export function loadRefundPolicy(): string {
  try {
    const filePath = path.join(process.cwd(), 'src/data/policy.md');
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error('Error loading refund policy:', error);
    return '';
  }
}

/**
 * Get customer by ID
 */
export function getCustomerById(customerId: string): Customer | undefined {
  const customers = loadCustomers();
  return customers.find((c) => c.id === customerId);
}

/**
 * Get order by ID
 */
export function getOrderById(orderId: string): Order | undefined {
  const orders = loadOrders();
  return orders.find((o) => o.orderId === orderId);
}

/**
 * Get all orders for a customer
 */
export function getCustomerOrders(customerId: string): Order[] {
  const orders = loadOrders();
  return orders.filter((o) => o.customerId === customerId);
}

/**
 * Validate customer data structure
 */
export function validateCustomer(customer: Customer): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!customer.id) errors.push('Missing customer ID');
  if (!customer.name) errors.push('Missing customer name');
  if (!customer.email) errors.push('Missing customer email');
  if (!customer.orderId) errors.push('Missing order ID');
  if (customer.price < 0) errors.push('Invalid price');

  const validStatuses = ['PENDING', 'APPROVED', 'DENIED', 'REFUNDED'];
  if (!validStatuses.includes(customer.refundStatus)) {
    errors.push(`Invalid refund status: ${customer.refundStatus}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate order data structure
 */
export function validateOrder(order: Order): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!order.orderId) errors.push('Missing order ID');
  if (!order.customerId) errors.push('Missing customer ID');
  if (!order.product) errors.push('Missing product name');
  if (order.price < 0) errors.push('Invalid price');

  const validStatuses = ['DELIVERED', 'DAMAGED', 'RETURNED', 'REFUNDED'];
  if (!validStatuses.includes(order.status)) {
    errors.push(`Invalid order status: ${order.status}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Initialize and validate all data
 */
export function initializeData(): {
  success: boolean;
  customers: Customer[];
  orders: Order[];
  policy: string;
  errors: string[];
} {
  const errors: string[] = [];

  const customers = loadCustomers();
  const orders = loadOrders();
  const policy = loadRefundPolicy();

  if (customers.length === 0) {
    errors.push('No customers loaded');
  } else {
    customers.forEach((customer, index) => {
      const validation = validateCustomer(customer);
      if (!validation.valid) {
        errors.push(`Customer ${index} (${customer.id}): ${validation.errors.join(', ')}`);
      }
    });
  }

  if (orders.length === 0) {
    errors.push('No orders loaded');
  } else {
    orders.forEach((order, index) => {
      const validation = validateOrder(order);
      if (!validation.valid) {
        errors.push(`Order ${index} (${order.orderId}): ${validation.errors.join(', ')}`);
      }
    });
  }

  if (!policy) {
    errors.push('Refund policy not loaded');
  }

  return {
    success: errors.length === 0,
    customers,
    orders,
    policy,
    errors,
  };
}

/**
 * Get test scenarios for agent testing
 */
export function getTestScenarios(): Array<{
  scenario: string;
  customerId: string;
  expectedDecision: 'APPROVED' | 'DENIED' | 'PENDING_REVIEW';
  reason: string;
}> {
  return [
    {
      scenario: 'Damaged electronics within 30 days',
      customerId: 'CUST001',
      expectedDecision: 'APPROVED',
      reason: 'Within 30-day window + damaged item',
    },
    {
      scenario: 'Digital product refund request',
      customerId: 'CUST003',
      expectedDecision: 'DENIED',
      reason: 'Digital products are non-refundable',
    },
    {
      scenario: 'Gift card refund request',
      customerId: 'CUST007',
      expectedDecision: 'DENIED',
      reason: 'Gift cards cannot be refunded',
    },
    {
      scenario: 'Personal care item opened',
      customerId: 'CUST005',
      expectedDecision: 'DENIED',
      reason: 'Opened personal care items not refundable without medical proof',
    },
    {
      scenario: 'Order outside 30-day window',
      customerId: 'CUST006',
      expectedDecision: 'DENIED',
      reason: 'Outside 30-day refund window',
    },
    {
      scenario: 'Premium customer edge case',
      customerId: 'CUST013',
      expectedDecision: 'PENDING_REVIEW',
      reason: 'Premium customer eligible for manual review',
    },
  ];
}
