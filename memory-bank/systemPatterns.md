# System Patterns: Loan Management Platform

## Architecture Overview

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────┐
│                      Next.js 15 App                     │
│                     (App Router)                        │
├─────────────────────────────────────────────────────────┤
│  /admin          /broker         /apply      /auth      │
│  (Super Admin)   (Broker Panel)  (Loan Form) (Login)    │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Supabase Backend                           │
│  ┌──────────┬──────────────┬─────────────────────┐     │
│  │   Auth   │   Postgres   │   Row Level Security │     │
│  │  (JWT)   │  (Database)  │       (RLS)          │     │
│  └──────────┴──────────────┴─────────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

## Database Architecture

### Entity Relationship Diagram
```
users (1) ──────────────────> (1) brokers
  │                                │
  │ (loan_taker_id)                │ (broker_id)
  │                                │
  └────────> loans (1) <───────────┘
               │
               ├──────> (1) loan_details
               ├──────> (1) borrowing_entity
               └──────> (1) loan_quote
```

### Tables Schema

#### users
```sql
- id (uuid, PK)
- full_name (text)
- email (text, unique)
- phone (text)
- role (text: 'admin' | 'broker' | 'loan_taker')
- created_at (timestamptz)
```

#### brokers
```sql
- id (uuid, PK)
- user_id (uuid, FK → users.id)
- company_name (text)
- referral_code (text, unique)
- total_leads (int, default: 0)
- created_at (timestamptz)
```

#### loans
```sql
- id (uuid, PK)
- broker_id (uuid, FK → brokers.id, nullable)
- loan_taker_id (uuid, FK → users.id)
- status (text: 'draft' | 'pending' | 'approved' | 'rejected')
- step (int, 1-4, tracks form progress)
- created_at (timestamptz)
```

#### loan_details
```sql
- id (uuid, PK)
- loan_id (uuid, FK → loans.id)
- property_address (text)
- city (text)
- state (text)
- zip (text)
- deal_type (text)
- property_type (text)
- loan_type (text)
- requested_amount (numeric)
- term_months (int)
- monthly_property_tax (numeric)
- insurance_payment (numeric)
- rental_income (numeric)
- association_dues (numeric)
```

#### borrowing_entity
```sql
- id (uuid, PK)
- loan_id (uuid, FK → loans.id)
- company_name (text)
- owner_first_name (text)
- owner_last_name (text)
- co_owner_first_name (text, nullable)
- co_owner_last_name (text, nullable)
- real_estate_deals (int)
- credit_score (text)
```

#### loan_quote
```sql
- id (uuid, PK)
- loan_id (uuid, FK → loans.id)
- estimated_amount (numeric)
- down_payment (numeric)
- monthly_interest (numeric)
- processing_fee (numeric)
- lender_fee (numeric)
- legal_fee (numeric)
- closing_cost (numeric)
- accepted_terms (boolean, default: false)
```

## Key Technical Decisions

### 1. Next.js 15 App Router
**Why:** 
- Server Components for better performance
- Built-in API routes
- File-based routing matches role structure
- Native middleware for auth protection

**Pattern:**
```
/app
  /admin/page.tsx         → Super admin dashboard
  /broker/page.tsx        → Broker dashboard
  /apply/page.tsx         → Multi-step form
  /auth/login.tsx         → Login page
```

### 2. Styled Components (No Tailwind)
**Why:**
- Full CSS-in-JS power
- Theme provider for consistent design tokens
- Component-scoped styles
- Dynamic styling based on props

**Pattern:**
```tsx
const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  padding: 12px 24px;
  border-radius: ${props => props.theme.borderRadius};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;
```

### 3. Supabase RLS (Row Level Security)
**Why:**
- Database-level security
- No need for complex API middleware
- Automatic enforcement of data access rules

**Policies:**

**Brokers:**
```sql
-- Brokers can only see their own leads
CREATE POLICY "Brokers see own leads"
ON loans FOR SELECT
USING (broker_id = auth.uid());
```

**Loan Takers:**
```sql
-- Loan takers see only their own loans
CREATE POLICY "Loan takers see own loans"
ON loans FOR SELECT
USING (loan_taker_id = auth.uid());
```

**Admins:**
```sql
-- Admins see everything
CREATE POLICY "Admins see all"
ON loans FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');
```

### 4. Zustand for State Management
**Why:**
- Lightweight (simpler than Redux)
- No boilerplate
- React hooks API
- Perfect for form progress and global state

**Pattern:**
```tsx
// stores/loanFormStore.ts
export const useLoanFormStore = create((set) => ({
  currentStep: 1,
  formData: {},
  updateFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
}));
```

### 5. React Hook Form + Zod
**Why:**
- Type-safe validation
- Excellent performance (uncontrolled components)
- Easy integration with multi-step forms
- Clear error handling

**Pattern:**
```tsx
const schema = z.object({
  property_address: z.string().min(5),
  loan_amount: z.number().min(10000),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});
```

## Design Patterns in Use

### 1. Multi-Step Form Pattern
**Implementation:**
- Each step is a separate component
- Shared state via Zustand
- Auto-save to Supabase after each step
- Progress bar component shows completion
- Can navigate back/forward

**Flow:**
```
Step1Component → Save to Supabase → Update Zustand → Navigate to Step2
```

### 2. Referral Tracking Pattern
**Implementation:**
```tsx
// URL: /apply?ref=broker_123
const searchParams = useSearchParams();
const referralCode = searchParams.get('ref');

// On form submission:
const broker = await supabase
  .from('brokers')
  .select('id')
  .eq('referral_code', referralCode)
  .single();

await supabase.from('loans').insert({
  broker_id: broker.id,
  loan_taker_id: userId,
  status: 'pending'
});
```

### 3. Role-Based Routing Pattern
**Implementation:**
```tsx
// middleware.ts
export function middleware(request: NextRequest) {
  const user = await getUser();
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/admin') && user.role !== 'admin') {
    return NextResponse.redirect('/');
  }
  if (pathname.startsWith('/broker') && user.role !== 'broker') {
    return NextResponse.redirect('/');
  }
}
```

### 4. Dashboard Card Pattern
**Reusable Components:**
```tsx
<Card>
  <CardHeader>
    <Icon />
    <Title>Total Loans</Title>
  </CardHeader>
  <CardBody>
    <Value>1,234</Value>
    <Trend>+12% from last month</Trend>
  </CardBody>
</Card>
```

## Component Relationships

### Core Components

**Shared Components:**
- `Button.tsx` - Primary, secondary, outlined variants
- `Input.tsx` - Text, number, tel inputs with validation display
- `Select.tsx` - Dropdown with search
- `Card.tsx` - Container for content sections
- `ProgressBar.tsx` - Shows form completion (%)
- `StepIndicator.tsx` - Visual step counter (1/4, 2/4, etc.)

**Layout Components:**
- `Sidebar.tsx` - Navigation for dashboards
- `Topbar.tsx` - User info, notifications, logout
- `DashboardLayout.tsx` - Wraps sidebar + topbar + content

**Form Components:**
- `Step1DealBasics.tsx`
- `Step2BorrowingEntity.tsx`
- `Step3Quote.tsx`
- `Step4Register.tsx`
- `FormNavigation.tsx` - Back/Next buttons

**Dashboard Components:**
- `KPICard.tsx` - Display metrics
- `LoanTable.tsx` - Using TanStack Table
- `LoanChart.tsx` - Using Recharts
- `BrokerLeaderboard.tsx`

## Critical Implementation Paths

### Path 1: Loan Application Flow
```
1. User visits /apply?ref=broker_123
2. Referral code stored in Zustand + localStorage
3. Step 1: User fills Deal Basics
4. On "Next": Validate → Save to Supabase → Navigate to Step 2
5. Step 2: User fills Borrowing Entity
6. On "Next": Validate → Update loan record → Navigate to Step 3
7. Step 3: System calculates quote → Display summary
8. User accepts → Navigate to Step 4
9. Step 4: User creates account → Link loan to user → Submit
10. Redirect to confirmation page
```

### Path 2: Broker Dashboard
```
1. Broker logs in → JWT stored
2. Middleware verifies role = 'broker'
3. Dashboard loads:
   - Query loans WHERE broker_id = current_broker.id
   - Display leads in table
   - Show statistics
4. Broker clicks "Copy Referral Link"
5. Link copied to clipboard with toast notification
```

### Path 3: Admin Analytics
```
1. Admin logs in → JWT stored
2. Middleware verifies role = 'admin'
3. Dashboard loads:
   - Query all loans (no RLS restriction)
   - Aggregate statistics
   - Render charts (Recharts)
4. Admin filters by date/status
5. Data re-fetched and charts update
```

## Calculation Logic

### Loan Quote Calculation
```typescript
interface LoanQuoteCalculation {
  loanAmount: number;
  
  // Constants
  annualInterestRate: 9; // 9%
  downPaymentPercent: 20; // 20%
  processingFeePercent: 1.5; // 1.5%
  closingCostPercent: 3; // 3%
  
  // Calculations
  downPayment: loanAmount * 0.20;
  monthlyInterest: (loanAmount * 0.09) / 12;
  processingFee: loanAmount * 0.015;
  closingCost: loanAmount * 0.03;
  lenderFee: 1500; // flat fee
  legalFee: 1000; // flat fee
}

// Example: $500,000 loan
// Down payment: $100,000
// Monthly interest: $3,750
// Processing fee: $7,500
// Closing cost: $15,000
```

## API Structure

### Supabase Functions
```typescript
// services/supabase.ts

// Create new loan (Step 1)
async function createLoan(userId: string, brokerId: string | null) {
  return supabase.from('loans').insert({
    loan_taker_id: userId,
    broker_id: brokerId,
    status: 'draft',
    step: 1
  });
}

// Update loan details (Step 1)
async function updateLoanDetails(loanId: string, details: LoanDetails) {
  return supabase.from('loan_details').upsert({
    loan_id: loanId,
    ...details
  });
}

// Get broker's leads
async function getBrokerLeads(brokerId: string) {
  return supabase
    .from('loans')
    .select('*, loan_details(*), users!loan_taker_id(*)')
    .eq('broker_id', brokerId);
}

// Get all loans (admin)
async function getAllLoans() {
  return supabase
    .from('loans')
    .select('*, loan_details(*), brokers(*), users!loan_taker_id(*)');
}

// Get loan statistics
async function getLoanStats() {
  const { data } = await supabase.rpc('get_loan_statistics');
  return data;
}
```

## Security Patterns

### Authentication Flow
```
1. User submits credentials
2. Supabase Auth verifies and returns JWT
3. JWT stored in httpOnly cookie
4. All requests include JWT in Authorization header
5. Middleware validates JWT and extracts user role
6. RLS policies enforce database-level access control
```

### API Route Protection
```typescript
// app/api/loans/route.ts
export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // RLS automatically filters results based on user role
  const { data } = await supabase.from('loans').select('*');
  return NextResponse.json(data);
}
```

## Performance Patterns

1. **Server Components**: Use by default, client components only when needed
2. **Data Fetching**: Parallel requests where possible
3. **Caching**: React cache for repeated data fetches
4. **Lazy Loading**: Dynamic imports for heavy components (charts)
5. **Optimistic Updates**: Update UI before server response
6. **Debouncing**: Delay auto-save to reduce API calls

