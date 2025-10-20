# Tech Context: Loan Management Platform

## Technology Stack

### Frontend Framework
**Next.js 15 (App Router)**
- Version: 15.x (latest stable)
- Router: App Router (not Pages Router)
- Rendering: Server Components + Client Components
- Package Manager: npm or pnpm

**Installation:**
```bash
npx create-next-app@latest loan-platform --typescript --app --no-tailwind
```

### Styling
**Styled Components**
```json
{
  "styled-components": "^6.1.0",
  "babel-plugin-styled-components": "^2.1.0"
}
```

**Setup Required:**
```js
// .babelrc
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}
```

**Theme Setup:**
```tsx
// styles/theme.ts
export const theme = {
  colors: {
    primary: '#1A73E8',
    secondary: '#F5F7FA',
    text: '#1F1F1F',
    accent: '#E8EEF5',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
  },
  fonts: {
    main: "'Inter', sans-serif",
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  borderRadius: '8px',
  borderRadiusLg: '12px',
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.12)',
    large: '0 8px 16px rgba(0, 0, 0, 0.15)',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
  },
};
```

### Form Management
**React Hook Form + Zod**
```json
{
  "react-hook-form": "^7.51.0",
  "zod": "^3.22.0",
  "@hookform/resolvers": "^3.3.0"
}
```

**Usage Pattern:**
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  property_address: z.string().min(5, 'Address too short'),
  loan_amount: z.number().min(10000, 'Minimum loan: $10,000'),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
```

### State Management
**Zustand**
```json
{
  "zustand": "^4.5.0"
}
```

**Store Pattern:**
```tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLoanFormStore = create(
  persist(
    (set) => ({
      currentStep: 1,
      formData: {},
      referralCode: null,
      loanId: null,
      
      setReferralCode: (code: string) => set({ referralCode: code }),
      setLoanId: (id: string) => set({ loanId: id }),
      updateFormData: (data: any) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
      resetForm: () => set({ currentStep: 1, formData: {}, loanId: null }),
    }),
    {
      name: 'loan-form-storage',
    }
  )
);
```

### Animation
**Framer Motion**
```json
{
  "framer-motion": "^11.0.0"
}
```

**Usage Examples:**
```tsx
import { motion } from 'framer-motion';

// Page transition
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {children}
</motion.div>

// Button hover
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Submit
</motion.button>
```

### Icons
**React Icons**
```json
{
  "react-icons": "^5.0.0"
}
```

**Common Icons:**
```tsx
import { FiHome, FiUser, FiDollarSign, FiBarChart } from 'react-icons/fi';
import { MdDashboard, MdPeople } from 'react-icons/md';
import { BiBuildings } from 'react-icons/bi';
```

### Data Visualization
**Recharts**
```json
{
  "recharts": "^2.10.0"
}
```

**Chart Types Needed:**
- Line Chart (loans per month)
- Bar Chart (top brokers)
- Pie Chart (loan statuses)

### Tables
**TanStack Table (React Table v8)**
```json
{
  "@tanstack/react-table": "^8.11.0"
}
```

**Features:**
- Sorting
- Filtering
- Pagination
- Row selection

### Backend & Database
**Supabase**
```json
{
  "@supabase/supabase-js": "^2.39.0",
  "@supabase/auth-helpers-nextjs": "^0.8.0"
}
```

**Environment Variables:**
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Client Setup:**
```tsx
// lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const supabase = createClientComponentClient();
```

**Server Setup:**
```tsx
// lib/supabase/server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createClient = () => {
  return createServerComponentClient({ cookies });
};
```

## Development Setup

### Prerequisites
- Node.js 18.17 or later
- npm, pnpm, or yarn
- Supabase account (free tier works)
- Git
- VS Code (recommended)

### Initial Setup Steps

**1. Create Next.js Project**
```bash
npx create-next-app@latest loan-platform --typescript --app --no-tailwind
cd loan-platform
```

**2. Install Dependencies**
```bash
npm install styled-components @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install react-hook-form zod @hookform/resolvers
npm install zustand framer-motion react-icons recharts
npm install @tanstack/react-table
npm install -D babel-plugin-styled-components
```

**3. Configure Babel**
```json
// .babelrc
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}
```

**4. Setup Environment Variables**
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

**5. Configure Next.js**
```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
```

**6. Setup Supabase Project**
- Create project at https://supabase.com
- Copy Project URL and anon key
- Run SQL migrations (see systemPatterns.md for schema)

## Project Structure

```
loan-platform/
├── app/
│   ├── layout.tsx                 # Root layout with ThemeProvider
│   ├── page.tsx                   # Landing/redirect page
│   ├── admin/
│   │   ├── page.tsx               # Admin dashboard
│   │   ├── layout.tsx             # Admin layout with sidebar
│   │   ├── loans/page.tsx         # All loans view
│   │   ├── brokers/page.tsx       # All brokers view
│   │   └── analytics/page.tsx    # Charts and insights
│   ├── broker/
│   │   ├── page.tsx               # Broker dashboard
│   │   ├── layout.tsx             # Broker layout
│   │   ├── leads/page.tsx         # Referred leads
│   │   └── profile/page.tsx       # Broker profile
│   ├── apply/
│   │   ├── page.tsx               # Step 1: Deal Basics
│   │   ├── step2/page.tsx         # Step 2: Borrowing Entity
│   │   ├── step3/page.tsx         # Step 3: Quote
│   │   └── step4/page.tsx         # Step 4: Registration
│   ├── auth/
│   │   ├── login/page.tsx         # Login page
│   │   └── signup/page.tsx        # Signup page
│   └── api/
│       ├── loans/route.ts         # Loan CRUD operations
│       └── brokers/route.ts       # Broker operations
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   ├── ProgressBar.tsx
│   │   └── StepIndicator.tsx
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   └── DashboardLayout.tsx
│   ├── forms/
│   │   ├── Step1DealBasics.tsx
│   │   ├── Step2BorrowingEntity.tsx
│   │   ├── Step3Quote.tsx
│   │   └── Step4Register.tsx
│   └── dashboard/
│       ├── KPICard.tsx
│       ├── LoanTable.tsx
│       ├── LoanChart.tsx
│       └── BrokerLeaderboard.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Client-side Supabase
│   │   ├── server.ts              # Server-side Supabase
│   │   └── queries.ts             # Reusable queries
│   ├── utils/
│   │   ├── calculations.ts        # Loan quote logic
│   │   └── validators.ts          # Zod schemas
│   └── constants/
│       └── options.ts             # Dropdown options
├── stores/
│   └── loanFormStore.ts           # Zustand store
├── styles/
│   ├── theme.ts                   # Design tokens
│   └── globalStyles.ts            # Global CSS
├── types/
│   ├── database.types.ts          # Supabase generated types
│   └── index.ts                   # Custom types
├── middleware.ts                  # Route protection
├── .env.local                     # Environment variables
└── package.json
```

## Technical Constraints

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- No IE11 support

### Performance Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90

### Database Limits
- Max file upload size: 50MB (Supabase free tier)
- Max database size: 500MB (free tier)
- Request rate: Reasonable limits for MVP

## Dependencies Summary

**Core:**
```json
{
  "next": "15.x",
  "react": "18.x",
  "react-dom": "18.x",
  "typescript": "5.x"
}
```

**Styling:**
```json
{
  "styled-components": "^6.1.0"
}
```

**Forms & Validation:**
```json
{
  "react-hook-form": "^7.51.0",
  "zod": "^3.22.0",
  "@hookform/resolvers": "^3.3.0"
}
```

**State:**
```json
{
  "zustand": "^4.5.0"
}
```

**Backend:**
```json
{
  "@supabase/supabase-js": "^2.39.0",
  "@supabase/auth-helpers-nextjs": "^0.8.0"
}
```

**UI/UX:**
```json
{
  "framer-motion": "^11.0.0",
  "react-icons": "^5.0.0",
  "recharts": "^2.10.0",
  "@tanstack/react-table": "^8.11.0"
}
```

## Development Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Building
npm run build           # Build for production
npm run start           # Start production server

# Type Checking
npm run type-check      # Run TypeScript compiler

# Linting
npm run lint            # Run ESLint

# Supabase (if using local development)
npx supabase init       # Initialize Supabase locally
npx supabase start      # Start local Supabase
npx supabase db reset   # Reset local database
```

## Tool Usage Patterns

### Generating Supabase Types
```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.types.ts
```

### VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- Styled Components
- Prettier
- ESLint
- TypeScript

### Git Workflow
```bash
# Branch naming
feature/broker-dashboard
fix/form-validation
chore/setup-supabase

# Commit messages
feat: add broker referral system
fix: resolve form auto-save issue
docs: update README with setup steps
```

## Environment-Specific Configuration

### Development
```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=local-anon-key
```

### Production (Vercel)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=production-anon-key
SUPABASE_SERVICE_ROLE_KEY=production-service-key
```

## Deployment

### Vercel Setup
1. Connect GitHub repository
2. Add environment variables
3. Deploy command: `npm run build`
4. Auto-deploy on push to main

### Supabase Setup
1. Create production project
2. Run migrations via SQL editor
3. Enable RLS policies
4. Configure auth providers (email/password)
5. Add redirect URLs for auth

## Testing Strategy (Future)
- Unit tests: Jest + React Testing Library
- E2E tests: Playwright
- Type checking: TypeScript strict mode
- Linting: ESLint + Prettier

