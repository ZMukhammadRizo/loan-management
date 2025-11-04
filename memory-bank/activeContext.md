# Active Context: Loan Management Platform

## Current Status
**Phase:** Phase 1 Complete - Ready for Phase 2  
**Last Updated:** October 14, 2025  
**Current Branch:** main (assumed)  

## Project State
✅ **Phase 1 COMPLETE**: Full project setup and infrastructure established. Next.js 15 project created with all dependencies installed, folder structure built, theme system configured, Supabase clients created, and middleware implemented. Development server is ready to run.

## Immediate Next Steps

### Phase 1: Foundation (Priority: HIGHEST)
1. **Initialize Next.js Project**
   - Run: `npx create-next-app@latest loan-platform --typescript --app --no-tailwind`
   - Setup folder structure as defined in techContext.md

2. **Install All Dependencies**
   - Styled Components + Babel plugin
   - Supabase packages
   - React Hook Form + Zod
   - Zustand
   - Framer Motion
   - React Icons
   - Recharts
   - TanStack Table

3. **Configure Build Tools**
   - Setup `.babelrc` for Styled Components SSR
   - Configure `next.config.js` for styled-components compiler
   - Create `.env.local` with Supabase credentials

4. **Setup Supabase Project**
   - Create new Supabase project
   - Run SQL migrations to create all tables (see systemPatterns.md)
   - Configure RLS policies
   - Enable email/password auth
   - Add redirect URLs

5. **Create Core Infrastructure**
   - `styles/theme.ts` - Design tokens
   - `styles/globalStyles.ts` - Global CSS
   - `lib/supabase/client.ts` - Client Supabase instance
   - `lib/supabase/server.ts` - Server Supabase instance
   - `middleware.ts` - Route protection
   - Root layout with ThemeProvider

### Phase 2: Authentication (After Phase 1)
1. Build login page (`/auth/login`)
2. Build signup page (`/auth/signup`)
3. Implement JWT handling
4. Setup middleware for protected routes
5. Create auth context/hooks

### Phase 3: Shared Components (Parallel with Auth)
1. Create all UI components:
   - Button, Input, Select
   - Card, ProgressBar, StepIndicator
2. Create layout components:
   - Sidebar, Topbar, DashboardLayout
3. Test components with Storybook (optional)

## Current Work Focus
**Right now:** UI parity between admin and broker dashboards; unified map component usage.

## Recent Decisions & Considerations

### Design Decisions Made
1. **No Tailwind**: Using Styled Components for better theme integration and component-scoped styles
2. **App Router**: Using Next.js 15 App Router (not Pages Router) for modern patterns
3. **Supabase RLS**: Database-level security instead of API middleware
4. **Zustand over Redux**: Simpler state management for form progress
5. **4-Step Form**: Splitting loan application into manageable chunks with auto-save
6. **Unified Map Component**: Use `InteractiveUSMap` for both admin and broker dashboards for consistent UX and visuals.

### Technical Considerations
1. **Auto-Save Strategy**: Debounce auto-save calls (500ms delay) to reduce API requests
2. **Form Recovery**: Use Zustand persist + Supabase to allow users to resume incomplete applications
3. **Referral Tracking**: Store referral code in both Zustand (temporary) and loan record (permanent)
4. **Role Detection**: Store user role in JWT claims for efficient middleware checks
5. **Mobile-First**: Design components mobile-first, then enhance for desktop

### Important Patterns to Follow

#### 1. Server vs Client Components
```tsx
// DEFAULT: Use Server Components
export default async function AdminPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from('loans').select('*');
  return <Dashboard data={data} />;
}

// ONLY when needed: Client Components (use 'use client')
'use client';
export default function InteractiveForm() {
  const [value, setValue] = useState('');
  // ...
}
```

#### 2. Data Fetching Pattern
```tsx
// Parallel fetches for better performance
const [loans, brokers, stats] = await Promise.all([
  supabase.from('loans').select('*'),
  supabase.from('brokers').select('*'),
  supabase.rpc('get_statistics')
]);
```

#### 3. Form Auto-Save Pattern
```tsx
const debouncedSave = useMemo(
  () => debounce(async (data) => {
    await supabase.from('loan_details').upsert({
      loan_id: loanId,
      ...data
    });
  }, 500),
  [loanId]
);

useEffect(() => {
  if (formData) {
    debouncedSave(formData);
  }
}, [formData, debouncedSave]);
```

#### 4. Error Handling Pattern
```tsx
try {
  const { data, error } = await supabase.from('loans').insert(loanData);
  if (error) throw error;
  
  toast.success('Loan created successfully');
  router.push('/apply/step2');
} catch (error) {
  console.error('Error creating loan:', error);
  toast.error('Failed to create loan. Please try again.');
}
```

#### 5. Theme Usage Pattern
```tsx
const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  padding: 12px 24px;
  border-radius: ${props => props.theme.borderRadius};
  font-weight: ${props => props.theme.fontWeights.semibold};
  box-shadow: ${props => props.theme.shadows.medium};
  
  &:hover {
    transform: translateY(-2px);
  }
`;
```

### Implementation Notes (Nov 4, 2025)
- Fixed missing exports in `components/dashboard/index.ts` for `SimpleUSMap`, `InteractiveUSMap`, and `StateDetailsDrawer` to resolve undefined import at runtime.
- Replaced `SimpleUSMap` with `InteractiveUSMap` in `app/broker/page.tsx` and passed `loanDetails={mockLoanDetailsByState}` to match admin dashboard behavior and appearance.

## Active Questions & Unknowns
1. **Broker Approval**: Should brokers be auto-approved or require admin approval?
   - *Assumption for MVP:* Auto-approved after signup
   
2. **Commission Calculation**: How are broker commissions calculated?
   - *Assumption for MVP:* Display placeholder, implement calculation later

3. **Loan Approval Process**: Who approves loans and how?
   - *Assumption for MVP:* Manual admin approval (no automated workflow)

4. **Document Uploads**: Do we need document uploads in MVP?
   - *Decision:* Not in MVP, listed as future enhancement

5. **Notifications**: Email notifications for loan status changes?
   - *Decision:* Not in MVP, listed as future enhancement

## Known Risks & Mitigations

### Risk 1: Supabase Free Tier Limits
**Risk:** Free tier has 500MB database limit and rate limits  
**Mitigation:** Monitor usage, optimize queries, plan for upgrade if needed

### Risk 2: Form Data Loss
**Risk:** Users may lose progress if browser crashes  
**Mitigation:** Implemented auto-save + Zustand persist + Supabase storage

### Risk 3: Security Vulnerabilities
**Risk:** Improper RLS policies could expose sensitive data  
**Mitigation:** Thoroughly test RLS policies, use service role key only server-side

### Risk 4: Mobile UX
**Risk:** Multi-step form may be cumbersome on mobile  
**Mitigation:** Mobile-first design, clear progress indicators, save & exit option

## Learnings & Project Insights

### From Similar Projects (Based on Memories)
1. **RLS is Critical**: Always test RLS policies thoroughly - they can block legitimate operations if misconfigured
2. **File Upload Challenges**: Supabase file uploads need service role key; custom triggers can cause issues
3. **Progressive Enhancement**: Build core functionality first, enhance with animations later
4. **Responsive Design**: Start mobile-first, especially for forms
5. **User Feedback**: Loading states, success/error messages, and smooth transitions improve perceived performance

### Best Practices to Apply
1. **Component Reusability**: Build generic components (Button, Input) before specific features
2. **Type Safety**: Generate Supabase types early and use throughout
3. **Error Handling**: Always handle Supabase errors gracefully with user-friendly messages
4. **State Management**: Keep Zustand stores focused (one for form, one for auth, etc.)
5. **Testing as You Go**: Test each component/feature before moving to next

## Development Preferences

### Code Style
- **TypeScript**: Strict mode enabled
- **Naming**: camelCase for variables/functions, PascalCase for components
- **File Organization**: Group by feature, not by type
- **Comments**: Use JSDoc for complex functions
- **Imports**: Absolute imports via `@/` alias

### Git Workflow
- **Branches**: `feature/`, `fix/`, `chore/` prefixes
- **Commits**: Conventional commits (feat, fix, docs, etc.)
- **PR Strategy**: One feature per PR (not applicable for initial setup)

### Testing Approach (When Implemented)
- **Unit Tests**: For utility functions (calculations, validators)
- **Integration Tests**: For form flows and API routes
- **E2E Tests**: For critical user journeys (loan application, login)

## Communication Preferences
- **Clarity**: Prefer explicit over implicit
- **Documentation**: Update Memory Bank after significant changes
- **Questions**: Ask for clarification rather than assume

## Next Session Preparation
When development continues, priority should be:
1. ✅ Memory Bank initialized (DONE)
2. ⬜ Run Next.js setup command
3. ⬜ Install all dependencies
4. ⬜ Configure Babel and Next.js
5. ⬜ Create Supabase project and run migrations
6. ⬜ Setup theme and global styles
7. ⬜ Create Supabase client/server utilities
8. ⬜ Implement middleware for route protection

**Ready to start coding!** 🚀

