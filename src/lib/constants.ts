/**
 * Application constants
 */

export const APP_CONFIG = {
  NAME: 'AI Customer Support Agent',
  DESCRIPTION: 'Intelligent refund request processing system',
  VERSION: '1.0.0',
};

export const REFUND_DAYS_LIMIT = 30;

export const REFUND_CATEGORIES_BLOCKED = ['digital_products', 'gift_cards', 'personal_care'];

export const AGENT_CONFIG = {
  TEMPERATURE: 0.3,
  MAX_TOKENS: 1000,
  TIMEOUT_MS: 30000,
};

export const UI_CONFIG = {
  ANIMATION_DURATION: 0.3,
  MESSAGE_TYPING_SPEED: 30,
  TOAST_DURATION: 3000,
};
