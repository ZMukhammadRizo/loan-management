# Project Brief: Loan Management Platform

## Project Overview
A full-featured web platform for a USA-based loan company that provides business loans to restaurants and other businesses. This is an **internal management platform** (no landing page) for managing and tracking loans across three user roles.

## Core Objectives
1. Enable brokers to sign up, get referral links, and track referred loan applicants
2. Provide loan applicants (borrowers) with a seamless 4-step application process
3. Give super admin comprehensive analytics and oversight of all loans, brokers, and leads
4. Store and manage all data securely in Supabase with proper access controls

## Target Audience
- **Super Admin**: Company leadership who need full platform visibility
- **Brokers**: Partners who refer borrowers and earn commissions
- **Loan Takers (Borrowers)**: Business owners seeking loans (restaurants, etc.)

## Key Requirements

### Functional Requirements
1. **Multi-role Authentication System**
   - Separate login flows for admin, broker, and loan taker
   - Role-based access control with RLS
   - JWT-based route protection

2. **Broker Referral System**
   - Auto-generate unique referral codes on signup
   - Track all leads from each broker's referral link
   - Dashboard showing referred leads and their status

3. **4-Step Loan Application Form**
   - Step 1: Deal Basics (address, loan amount, property type)
   - Step 2: Borrowing Entity (company + owner info)
   - Step 3: Pre-Approval Quote (auto-calculated summary)
   - Step 4: Registration (account creation)
   - Auto-save progress after each step
   - Recovery of incomplete forms

4. **Admin Analytics Dashboard**
   - KPI cards (total loans, approved loans, total amount, active brokers)
   - Charts (loans per month, top brokers, loan statuses)
   - Export capabilities

5. **Broker Dashboard**
   - View all referred clients
   - Track loan statuses
   - View commission information

### Non-Functional Requirements
- **Performance**: Fast page loads, smooth transitions
- **Security**: RLS policies, role-based access, secure data handling
- **Scalability**: Handle growing number of brokers and loan applications
- **Usability**: Modern, clean, intuitive UI inspired by Linear.app, Notion, Stripe
- **Responsiveness**: Works on all devices

## Design Philosophy
- Modern, minimalistic, and clean aesthetic
- Premium SaaS dashboard feel
- Subtle shadows and glassy surfaces
- Consistent spacing and rounded corners
- Smooth animations and transitions
- Light theme with clear contrast

## Success Metrics
1. Brokers can successfully sign up and receive referral links
2. Loan takers can complete 4-step form with auto-save
3. Admin can view comprehensive analytics
4. Form data persists correctly in Supabase
5. Role-based access works correctly
6. All user flows are intuitive and bug-free

## References
- Platform inspiration: https://fundingtape.com/
- Form reference: https://borrower.fundingtape.com/quotes/new/

## Timeline
- **MVP Target**: ~20 days
- **Phase 1-2**: Setup & authentication (4 days)
- **Phase 3**: Multi-step form (5 days)
- **Phase 4**: Broker dashboard (3 days)
- **Phase 5**: Admin dashboard (4 days)
- **Phase 6-7**: Polish & deployment (4 days)

## Out of Scope (MVP)
- Document uploads for verification
- Loan approval workflow
- Email notifications
- PDF generation
- Real-time notifications
- CSV/PDF exports
- Commission payment tracking

