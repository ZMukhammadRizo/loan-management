# Product Context: Loan Management Platform

## Why This Exists

### Business Problem
Loan companies need efficient systems to:
1. **Scale their broker network** - Empower partners to refer borrowers with trackable referral links
2. **Streamline loan applications** - Replace manual processes with structured digital forms
3. **Track performance** - Monitor broker effectiveness and loan portfolio health
4. **Maintain transparency** - Give all stakeholders visibility into relevant data

### Current Pain Points (Assumed)
- Manual tracking of broker referrals
- Paper-based or fragmented loan applications
- Lack of real-time visibility into loan pipeline
- Difficult to calculate broker commissions
- No centralized system for managing business loans

## What It Solves

### For Super Admin
- **Visibility**: One dashboard to see all loans, brokers, and leads
- **Analytics**: Charts and KPIs for data-driven decisions
- **Oversight**: Monitor broker performance and loan distribution
- **Reporting**: Access to comprehensive platform data

### For Brokers
- **Referral Tracking**: Unique link auto-tracks all referred borrowers
- **Performance Dashboard**: See all leads, statuses, and potential commissions
- **Transparency**: Real-time updates on referred loan applications
- **Simplified Process**: No manual tracking of referrals

### For Loan Takers (Borrowers)
- **Easy Application**: Clean 4-step form vs. lengthy paper applications
- **Progress Saving**: Auto-save prevents data loss
- **Immediate Quote**: Get pre-approval estimate in Step 3
- **Professional Experience**: Modern UI builds trust

## How It Works

### User Journeys

#### 1️⃣ Broker Journey
```
Sign Up → System Generates Referral Link → Share Link → View Dashboard → Track Referred Leads
```

**Key Features:**
- Registration at `/auth/signup`
- Auto-generated unique referral code (e.g., `broker_123`)
- Referral link format: `https://platform.com/apply?ref=broker_123`
- Dashboard shows: total leads, loan statuses, commission estimates

#### 2️⃣ Loan Taker Journey
```
Click Referral Link → Complete 4-Step Form → Submit → Wait for Review
```

**Step-by-Step Flow:**

**Step 1: Deal Basics**
- Property address (street, city, state, zip)
- Deal type (purchase, refinance, etc.)
- Property type (single-family, multi-family, etc.)
- Loan type (fix & flip, rental, etc.)
- Requested loan amount
- Term length (months)
- Monthly expenses (property tax, insurance, rental income, HOA)

**Step 2: Borrowing Entity**
- Company name
- Owner information (first name, last name)
- Co-owner information (optional)
- Real estate deals completed
- Credit score range

**Step 3: Pre-Approval Quote**
- System calculates:
  - Down payment (20% of loan amount)
  - Processing fee (1.5% of loan amount)
  - Closing cost (3% of loan amount)
  - Monthly interest (9% annual / 12 months)
  - Lender fee, legal fee
- Visual breakdown via pie chart
- User accepts/reviews terms

**Step 4: Registration**
- Create account (if new user)
- Final submission
- Links to broker via referral code

**Key Features:**
- Auto-save after each step to Supabase
- Progress bar shows completion status
- Can resume incomplete applications
- Form validation with Zod
- Smooth transitions with Framer Motion

#### 3️⃣ Admin Journey
```
Login → View Dashboard → Analyze Data → Export Reports
```

**Dashboard Components:**
- **KPI Cards**: Total loans, approved loans, total distributed amount, active brokers
- **Charts**: 
  - Line chart: Loans per month
  - Bar chart: Top brokers by referrals
  - Pie chart: Loan statuses (draft/pending/approved/rejected)
- **Tables**: Detailed loan list with filters

## User Experience Goals

### Design Principles
1. **Clarity**: Every element has a clear purpose
2. **Simplicity**: Minimal cognitive load, intuitive flows
3. **Trust**: Professional design builds confidence
4. **Efficiency**: Quick task completion, no unnecessary steps
5. **Delight**: Smooth animations, responsive feedback

### Visual Design
- **Color Palette**:
  - Primary: `#1A73E8` (professional blue)
  - Secondary: `#F5F7FA` (light gray)
  - Text: `#1F1F1F` (near black)
  - Accent: `#E8EEF5` (soft blue-gray)

- **Typography**:
  - Font: Inter (clean, modern, readable)
  - Hierarchy: Bold titles (600), regular body (400)

- **Components**:
  - Cards with subtle shadows
  - Rounded corners (8-12px)
  - Glassy surfaces (backdrop blur)
  - Minimal borders
  - Consistent spacing (grid-based layout)

### Interaction Design
- **Form Behavior**:
  - Real-time validation
  - Clear error messages
  - Auto-save indicators
  - Progress persistence
  - Disabled states for incomplete fields

- **Navigation**:
  - Sidebar navigation for dashboards
  - Step indicators for multi-step form
  - Breadcrumbs where needed
  - Back/Next buttons with keyboard support

- **Feedback**:
  - Loading states for async actions
  - Success/error toasts
  - Hover effects on interactive elements
  - Smooth page transitions (Framer Motion)

## Key Differentiators
1. **Referral-First**: Built around broker referral system
2. **Auto-Save**: Never lose application progress
3. **Instant Quote**: Immediate pre-approval calculation
4. **Role Separation**: Each role sees only what they need
5. **Modern UX**: Premium dashboard feel vs. traditional loan systems

## Constraints & Considerations
- **USA-Focused**: All fields and logic assume USA business loans
- **B2B Only**: Designed for business loans, not personal loans
- **Internal Tool**: No marketing pages or public-facing content
- **Manual Approval**: System collects data but doesn't auto-approve loans
- **Broker-Driven**: Assumes most borrowers come via broker referrals

