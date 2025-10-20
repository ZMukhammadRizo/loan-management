# Loan Management Platform

A full-featured web platform for business loan management with support for admins, brokers, and loan applicants.

## 🎯 Project Overview

This platform enables:
- **Super Admin**: View and analyze all brokers, leads, and loans
- **Broker**: Sign up, get unique referral links, track referred loan takers
- **Loan Takers**: Apply for loans through a 4-step form with auto-save

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript
- **Styling**: Styled Components
- **Backend**: Supabase (Auth + Postgres + RLS)
- **Forms**: React Hook Form + Zod
- **State**: Zustand
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Tables**: TanStack Table

## 📋 Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase Database

1. Create a new Supabase project at https://supabase.com
2. Run the SQL migrations found in `/memory-bank/systemPatterns.md`
3. Configure RLS policies as documented
4. Enable email/password authentication

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
loan-platform/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── broker/            # Broker portal
│   ├── apply/             # Loan application form
│   ├── auth/              # Authentication pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # UI components (Button, Input, etc.)
│   ├── layout/           # Layout components (Sidebar, Topbar)
│   ├── forms/            # Form components
│   └── dashboard/        # Dashboard components
├── lib/                   # Utilities and helpers
│   ├── supabase/         # Supabase clients
│   ├── utils/            # Utility functions
│   └── constants/        # Constants and options
├── stores/               # Zustand stores
├── styles/               # Theme and global styles
├── types/                # TypeScript types
└── memory-bank/          # Project documentation
```

## 🗄️ Database Schema

The platform uses 6 main tables:
- `users` - User accounts with roles
- `brokers` - Broker information and referral codes
- `loans` - Loan applications
- `loan_details` - Property and loan details
- `borrowing_entity` - Borrower company information
- `loan_quote` - Loan calculations and quotes

See `/memory-bank/systemPatterns.md` for complete schema and RLS policies.

## 🚀 Development Roadmap

- [x] Phase 1: Initial setup and configuration
- [ ] Phase 2: Authentication system
- [ ] Phase 3: Multi-step loan application form
- [ ] Phase 4: Broker dashboard and referral system
- [ ] Phase 5: Admin analytics dashboard
- [ ] Phase 6: Styling polish and animations
- [ ] Phase 7: Testing and deployment

## 📚 Documentation

Complete project documentation is available in the `/memory-bank` directory:

- `projectbrief.md` - Project overview and requirements
- `productContext.md` - User journeys and product details
- `systemPatterns.md` - Architecture and database design
- `techContext.md` - Technology stack and setup
- `activeContext.md` - Current state and next steps
- `progress.md` - Development progress tracker

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Role-based access control via middleware
- JWT-based authentication
- Secure environment variables

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 🤝 Contributing

This is an internal project. For any questions, refer to the Memory Bank documentation.

## 📄 License

Private and confidential.

