# AI Customer Support Agent

A production-grade AI-powered customer support system that intelligently processes refund requests using OpenAI's API with a real agent loop pattern. Built with Next.js 15, React 19, TypeScript, and modern web technologies.

## 🎯 Project Overview

This is a **hiring assignment project** designed to demonstrate:

- Clean, modular, scalable architecture
- Production-ready code quality
- SOLID principles implementation
- Real AI agent orchestration with function calling
- Full-stack TypeScript development
- Professional UI/UX with Tailwind CSS

The application features:

- **Customer Chat Interface**: ChatGPT-like UI for refund requests
- **Admin Dashboard**: Detailed view of agent reasoning, tool calls, and decisions
- **Real Agent Loop**: LLM uses tools to gather information before making decisions
- **Mock CRM**: 15 customer profiles for testing
- **Dynamic Refund Policy**: Markdown-based policy rules
- **Complete Logging**: Every agent step is tracked and stored

## 🏗️ Architecture

### Technology Stack

**Frontend**

- Next.js 15 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS 4
- shadcn/ui (component library)
- Lucide React (icons)
- Framer Motion (animations)

**Backend**

- Next.js API Routes
- TypeScript
- Zod (validation)

**AI & LLM**

- OpenAI API (GPT-4o-mini or configurable)
- Function Calling with Structured Outputs
- Real Agent Loop Pattern

**State Management & Storage**

- React Hooks (local state)
- Context API (global state)
- Zustand (optional advanced state)
- JSON files (mock database)

**Developer Tools**

- ESLint (code quality)
- Prettier (code formatting)
- Husky + lint-staged (pre-commit hooks)
- TypeScript strict checking

## 📁 Folder Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── chat/                    # Chat interface pages
│   │   └── page.tsx
│   ├── dashboard/               # Admin dashboard pages
│   │   └── page.tsx
│   └── api/                     # API routes
│       ├── chat/                # Chat endpoint
│       ├── agent/               # Agent orchestration endpoint
│       └── logs/                # Logging endpoints
│
├── components/                   # Reusable React components
│   ├── chat/                    # Chat UI components
│   │   ├── ChatMessage.tsx      # Individual message component
│   │   ├── ChatInput.tsx        # Message input with suggestions
│   │   └── ChatHistory.tsx      # Message history display
│   ├── dashboard/               # Dashboard components
│   │   ├── CustomerInfo.tsx     # Customer details card
│   │   ├── AgentReasoning.tsx   # Reasoning steps display
│   │   └── DecisionCard.tsx     # Decision result display
│   ├── common/                  # Shared components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Toast.tsx
│   └── layout/                  # Layout components
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
│
├── hooks/                        # Custom React hooks
│   ├── useChat.ts               # Chat conversation logic
│   ├── useAgent.ts              # Agent API interaction
│   └── useLocalStorage.ts       # Persistent state
│
├── types/                        # TypeScript type definitions
│   └── index.ts                 # All shared types
│
├── lib/                          # Core libraries & config
│   ├── env.ts                   # Environment variables
│   ├── constants.ts             # Application constants
│   └── config.ts                # Configuration files
│
├── utils/                        # Utility functions
│   ├── helpers.ts               # Common helpers
│   ├── formatting.ts            # Data formatting
│   └── validation.ts            # Input validation
│
├── services/                     # Business logic services
│   ├── customerService.ts       # Customer profile operations
│   ├── orderService.ts          # Order management
│   ├── policyService.ts         # Refund policy logic
│   └── loggingService.ts        # Agent logging
│
├── agent/                        # AI Agent orchestration
│   ├── orchestrator.ts          # Main agent loop
│   ├── prompts.ts               # System & user prompts
│   └── tools/                   # Agent tool implementations
│       ├── getCustomer.ts       # Customer lookup tool
│       ├── getOrder.ts          # Order lookup tool
│       ├── getPolicy.ts         # Policy retrieval tool
│       ├── validateRefund.ts    # Refund validation tool
│       └── saveLog.ts           # Logging tool
│
├── store/                        # Zustand state management (optional)
│   └── chatStore.ts             # Chat state
│
├── context/                      # React Context for global state
│   ├── ChatContext.tsx          # Chat provider
│   └── ThemeContext.tsx         # Theme provider
│
├── data/                         # Mock data & static files
│   ├── customers.json           # 15 customer profiles
│   ├── policy.md                # Refund policy markdown
│   └── seeds.ts                 # Data seeding utilities
│
└── public/                       # Static assets
    ├── images/
    ├── fonts/
    └── icons/
```

## 📋 Detailed Folder Descriptions

### `src/app/`

Next.js 15 App Router pages. Implements file-based routing with TypeScript and strict type checking. Includes:

- Root layout with global styles
- Chat page for customer interface
- Dashboard page for admin viewing
- API routes for server-side logic

### `src/components/`

Reusable, composable React components organized by feature. Each component:

- Has a single responsibility
- Is fully typed with TypeScript
- Uses Tailwind CSS for styling
- Implements proper prop interfaces
- Maximum 40 lines each (SOLID principle)

### `src/hooks/`

Custom React hooks for encapsulating state and side effect logic:

- `useChat`: Manages conversation state and history
- `useAgent`: Handles OpenAI API communication
- `useLocalStorage`: Persistent client-side storage

### `src/types/`

Centralized TypeScript type definitions for:

- Domain models (Customer, Order, etc.)
- API responses and requests
- Agent reasoning structures
- UI component props

### `src/lib/`

Core libraries and configuration:

- `env.ts`: Environment variable validation
- `constants.ts`: Application-wide constants
- `config.ts`: Feature flags and settings

### `src/utils/`

Pure utility functions for:

- Date/time formatting
- Currency formatting
- ID generation
- JSON parsing
- Debouncing and throttling

### `src/services/`

Business logic layer (SOLID Single Responsibility):

- `customerService.ts`: Customer CRUD operations
- `orderService.ts`: Order lookups
- `policyService.ts`: Policy rule evaluation
- `loggingService.ts`: Persisting agent logs

### `src/agent/`

AI agent orchestration (core of the application):

- `orchestrator.ts`: Main agent loop (receives message → calls tools → decides → responds)
- `prompts.ts`: System and dynamic prompts
- `tools/`: Individual tool implementations
  - Each tool returns structured data
  - Tools are composable and testable
  - Follows OpenAI function calling format

### `src/store/`

Zustand state management (optional, if global state becomes complex).

### `src/context/`

React Context providers for:

- Chat conversation state
- Theme preferences
- User authentication (future)

### `src/data/`

Mock data and database seeding:

- `customers.json`: 15 diverse customer profiles
- `policy.md`: Business rules in markdown
- `seeds.ts`: Functions to load and validate data

## 🤖 How the Agent Loop Works

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Customer Message                                         │
│    "I want a refund. My order arrived damaged."             │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Agent Orchestrator                                       │
│    - Extract customer intent                                │
│    - Determine required tools                               │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Function Calling (Agentic Loop)                          │
│    - getCustomer(customerId)                                │
│    - getOrder(orderId)                                      │
│    - getPolicy()                                            │
│    - validateRefund(customer, order, policy)                │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Process Results                                          │
│    - Check 30-day window ✓                                  │
│    - Check damage claim ✓                                   │
│    - Check premium status                                   │
│    - Evaluate policy rules                                  │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Make Decision                                            │
│    Decision: APPROVED                                       │
│    Reason: Within 30 days + damaged item                    │
│    Confidence: 0.97                                         │
│    Policy: Rule 2 (Damage claims within 30 days)            │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. Save Log & Return Response                               │
│    - Store reasoning steps                                  │
│    - Log tool calls                                         │
│    - Return structured JSON response                        │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Setup & Installation

### Prerequisites

- Node.js 20+ (v22.12.0 tested)
- npm or yarn
- OpenAI API key

### Installation Steps

1. **Clone and navigate to project**

   ```bash
   cd ai-customer-support-agent
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   ```bash
   cp .env.example .env.local
   ```

   Add to `.env.local`:

   ```
   OPENAI_API_KEY=sk_test_...your_key_here...
   OPENAI_MODEL=gpt-4o-mini
   ```

4. **Install Husky hooks** (for pre-commit linting)

   ```bash
   npx husky install
   chmod +x .husky/pre-commit
   ```

5. **Verify setup**
   ```bash
   npm run lint
   npm run build
   ```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Production Build

```bash
npm run build
npm run start
```

## 📊 Environment Variables

```bash
# Required
OPENAI_API_KEY=sk_test_...          # Your OpenAI API key

# Optional
OPENAI_MODEL=gpt-4o-mini            # Default model (can be gpt-4, gpt-4o, etc.)
NODE_ENV=development                # development | production
```

## 🧪 Testing the Agent

### Test Scenario 1: Approved Refund

- Customer: "I bought this 2 weeks ago and it arrived damaged"
- Expected: APPROVED (within 30 days + damage claim)

### Test Scenario 2: Denied Refund (Digital Product)

- Customer: "I bought a digital product 5 days ago, I want a refund"
- Expected: DENIED (digital products not refundable)

### Test Scenario 3: Denied Refund (Outside Window)

- Customer: "I bought this 45 days ago and want a refund"
- Expected: DENIED (outside 30-day window)

### Test Scenario 4: Premium Customer Review

- Customer: Premium customer requesting refund
- Expected: PENDING_REVIEW (premium customers get manual review)

## 📐 Code Quality Standards

### TypeScript

- Strict mode enabled
- No `any` types allowed
- Full type coverage for functions and variables
- Interface-based design

### Function Size

- Maximum 40 lines per function
- Single responsibility principle
- Clear naming conventions
- JSDoc comments for complex logic

### Component Design

- Presentational components (dumb)
- Container components (smart)
- Custom hooks for logic
- Props-based configuration

## 🎨 UI/UX Features

- **Chat Interface**: Real-time messaging with typing indicators
- **Loading States**: Skeleton screens and spinners
- **Animations**: Smooth transitions using Framer Motion
- **Responsive Design**: Mobile, tablet, and desktop support
- **Dark Mode**: Built-in theme switching
- **Toast Notifications**: User feedback for actions
- **Accessibility**: Semantic HTML and ARIA labels

## 🔐 Security Features

- Environment variable validation
- Input sanitization with Zod
- API rate limiting (recommended)
- Error boundary components
- Secure error messaging

## 📈 Performance Optimization

- Code splitting with Next.js
- Image optimization
- Dynamic imports for heavy components
- Debounced input handlers
- Efficient state management
- Server-side rendering where applicable

## 🛠️ Developer Tools

### ESLint

```bash
npm run lint              # Check code quality
npm run lint:fix          # Auto-fix issues
```

### Prettier

```bash
npm run format            # Format all files
npm run format:check      # Check formatting
```

### Type Checking

```bash
npm run type-check        # Run TypeScript compiler
```

## 📚 Project Dependencies

### Core

- `next@16.2.9` - React framework
- `react@19.2.4` - UI library
- `typescript@5` - Type safety

### UI/UX

- `tailwindcss@4` - Styling
- `lucide-react` - Icon library
- `framer-motion` - Animations

### Validation & Data

- `zod` - Schema validation
- `openai` - LLM API client

### State Management

- `zustand` - Optional state container

### Development

- `eslint` - Code quality
- `prettier` - Code formatting
- `husky` - Git hooks
- `lint-staged` - Pre-commit linting

## 🚧 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication (NextAuth.js)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Email notifications
- [ ] Webhook integrations
- [ ] Advanced caching strategies
- [ ] Integration tests with Playwright
- [ ] E2E testing with Cypress
- [ ] API rate limiting

## 📝 Coding Rules & Best Practices

1. **SOLID Principles**
   - Single Responsibility
   - Open/Closed
   - Liskov Substitution
   - Interface Segregation
   - Dependency Inversion

2. **Clean Code**
   - Meaningful variable names
   - Small functions (max 40 lines)
   - DRY principle (Don't Repeat Yourself)
   - Clear error handling

3. **TypeScript Strict Mode**
   - No implicit any
   - Non-null assertions avoided
   - Proper type exports
   - Discriminated unions for variants

4. **Async/Await**
   - Always use async/await over promises
   - Proper error handling with try/catch
   - Timeout management

5. **Component Structure**
   - Props interface definition
   - Default props handling
   - Composition over inheritance
   - Proper hook dependencies

## 📄 License

This is a portfolio/hiring project. All code is written from scratch following industry best practices.

## 👨‍💼 Author Notes

This project demonstrates:

- ✅ Production-grade architecture
- ✅ SOLID principles in practice
- ✅ Real AI agent orchestration
- ✅ Type-safe full-stack development
- ✅ Professional code quality
- ✅ Scalable folder structure
- ✅ Developer experience (DX)
- ✅ Clean code practices

Each feature is implemented feature-by-feature with complete explanations, production-ready code, and no TODOs.

---

**Ready to explore the codebase?** Check out the [src/](src/) directory to see the implementation details for each feature!
