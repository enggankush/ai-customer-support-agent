# AI Customer Support Agent - Development Guidelines

## Project Setup Checklist

- [x] Initialize Next.js 15 project with TypeScript
- [x] Install all dependencies (Tailwind, Lucide, Framer Motion, Zod, OpenAI, Zustand)
- [x] Configure TypeScript with strict mode and path aliases (@/)
- [x] Set up ESLint and Prettier configuration
- [x] Create scalable folder structure
- [x] Set up Husky pre-commit hooks
- [x] Create comprehensive README and documentation
- [x] Create type definitions
- [x] Create utility functions and helpers
- [ ] Next: Build features feature-by-feature

## Project Overview

**AI Customer Support Agent** is a production-grade refund request processing system using:

- Next.js 15 (App Router) with TypeScript strict mode
- Real AI agent orchestration with OpenAI function calling
- Clean, modular, SOLID architecture
- Scalable folder structure with clear separation of concerns

## Folder Structure Explanation

```
src/
├── app/              → Next.js App Router pages and API routes
├── components/       → Reusable React components (max 40 lines each)
├── hooks/            → Custom React hooks (state & side effects)
├── types/            → TypeScript interfaces and types
├── lib/              → Core configuration (env, constants)
├── utils/            → Pure utility functions
├── services/         → Business logic layer (SOLID SRP)
├── agent/            → AI orchestration (agent loop pattern)
├── store/            → Zustand state (if needed)
├── context/          → React Context providers
└── data/             → Mock data and JSON files
```

## Coding Standards

### TypeScript Rules

- ✅ Strict mode enabled (`strict: true`)
- ✅ No `any` types allowed
- ✅ All functions must have type signatures
- ✅ Use `interface` for public contracts, `type` for aliases
- ✅ Use discriminated unions for variants

### Function Guidelines

- Maximum 40 lines per function
- Single responsibility principle
- Meaningful parameter names
- Clear error handling
- JSDoc comments for public functions

### Component Rules

- One component per file
- Props interface at the top
- Proper TypeScript typing
- Tailwind CSS for styling
- Maximum 40 lines (excluding JSDoc)
- Separated presentational & container components

### SOLID Principles

- **S**ingle Responsibility: One reason to change
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Subtypes must be substitutable
- **I**nterface Segregation: Many small interfaces
- **D**ependency Inversion: Depend on abstractions, not concretions

## Architecture Patterns

### Agent Loop Pattern

```typescript
// 1. Receive customer message
// 2. Determine required tools
// 3. Call tools with function calling
// 4. Process results
// 5. Make decision
// 6. Return structured response
```

### Service Layer (Business Logic)

```typescript
// services/customerService.ts → handles customer data
// services/orderService.ts → handles order lookups
// services/policyService.ts → handles refund rules
// services/loggingService.ts → handles agent logs
```

### Tool Implementation

```typescript
// agent/tools/getCustomer.ts
// agent/tools/getOrder.ts
// agent/tools/getPolicy.ts
// agent/tools/validateRefund.ts
// agent/tools/saveLog.ts
```

## Key Files to Implement

### Data Layer

- [ ] `src/data/customers.json` - 15 customer profiles
- [ ] `src/data/policy.md` - Refund policy rules
- [ ] `src/data/seeds.ts` - Data loading utilities

### API Routes

- [ ] `src/app/api/chat/route.ts` - Chat endpoint
- [ ] `src/app/api/agent/route.ts` - Agent orchestration
- [ ] `src/app/api/logs/route.ts` - Logging endpoints

### Agent Implementation

- [ ] `src/agent/orchestrator.ts` - Main agent loop
- [ ] `src/agent/prompts.ts` - System and user prompts
- [ ] `src/agent/tools/` - Tool implementations

### Services

- [ ] `src/services/customerService.ts`
- [ ] `src/services/orderService.ts`
- [ ] `src/services/policyService.ts`
- [ ] `src/services/loggingService.ts`

### Components

- [ ] `src/components/chat/ChatMessage.tsx`
- [ ] `src/components/chat/ChatInput.tsx`
- [ ] `src/components/dashboard/DecisionCard.tsx`
- [ ] `src/components/common/` (shared UI components)

### Pages

- [ ] `src/app/chat/page.tsx` - Customer interface
- [ ] `src/app/dashboard/page.tsx` - Admin dashboard

## Development Workflow

### Before Starting

1. Check this file for current status
2. Understand the folder structure
3. Review existing types in `src/types/index.ts`
4. Check constants in `src/lib/constants.ts`

### During Development

1. Keep functions ≤ 40 lines
2. Use TypeScript strict mode
3. Follow SOLID principles
4. Add JSDoc for public APIs
5. Type all parameters and returns
6. No TODOs - complete features fully

### Testing Your Code

```bash
npm run lint              # Check for errors
npm run lint:fix          # Auto-fix issues
npm run format            # Format code
npm run type-check        # TypeScript verification
npm run build             # Production build
```

### Git Hooks

- Husky pre-commit runs ESLint and Prettier automatically
- lint-staged ensures only staged files are linted

## Environment Setup

Required environment variables (`.env.local`):

```
OPENAI_API_KEY=sk_test_...
OPENAI_MODEL=gpt-4o-mini
```

## Implementation Order

1. **Data Layer** - Create mock customer data and policy
2. **Services** - Implement business logic
3. **Agent** - Build orchestrator and tools
4. **API Routes** - Connect services to HTTP endpoints
5. **Hooks** - Create custom React hooks
6. **Components** - Build UI components
7. **Pages** - Implement chat and dashboard
8. **Integration** - Connect frontend to backend

## Important Notes

- All code should be production-ready
- No placeholder TODOs
- Explain each feature implementation
- Test each feature after building
- Update this checklist as you progress
- Follow the SOLID principles throughout
- Use TypeScript strict mode strictly

## Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Zod Documentation](https://zod.dev)

---

**Project Status**: Setup complete ✅ | Ready for feature implementation
**Last Updated**: 2026-06-25
