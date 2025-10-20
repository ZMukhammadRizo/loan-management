# Supabase Setup Guide

Follow these steps to set up your Supabase project for the Loan Management Platform.

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "New Project"
3. Enter project details:
   - **Name**: loan-platform
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to your location
4. Click "Create new project"
5. Wait ~2 minutes for provisioning

## Step 2: Get API Credentials

1. In your project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Config")
   - **anon public** key (under "Project API keys")
   - **service_role** key (under "Project API keys") - **Keep this secret!**

3. Create `.env.local` in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Step 3: Run Database Migrations

Go to **SQL Editor** in your Supabase dashboard and run these SQL scripts:

### 3.1: Create Tables

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'broker', 'loan_taker')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create brokers table
CREATE TABLE brokers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  total_leads INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create loans table
CREATE TABLE loans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  broker_id UUID REFERENCES brokers(id) ON DELETE SET NULL,
  loan_taker_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'approved', 'rejected')),
  step INTEGER DEFAULT 1 CHECK (step BETWEEN 1 AND 4),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create loan_details table
CREATE TABLE loan_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  loan_id UUID REFERENCES loans(id) ON DELETE CASCADE UNIQUE,
  property_address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  deal_type TEXT,
  property_type TEXT,
  loan_type TEXT,
  requested_amount NUMERIC,
  term_months INTEGER,
  monthly_property_tax NUMERIC,
  insurance_payment NUMERIC,
  rental_income NUMERIC,
  association_dues NUMERIC
);

-- Create borrowing_entity table
CREATE TABLE borrowing_entity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  loan_id UUID REFERENCES loans(id) ON DELETE CASCADE UNIQUE,
  company_name TEXT,
  owner_first_name TEXT,
  owner_last_name TEXT,
  co_owner_first_name TEXT,
  co_owner_last_name TEXT,
  real_estate_deals INTEGER,
  credit_score TEXT
);

-- Create loan_quote table
CREATE TABLE loan_quote (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  loan_id UUID REFERENCES loans(id) ON DELETE CASCADE UNIQUE,
  estimated_amount NUMERIC,
  down_payment NUMERIC,
  monthly_interest NUMERIC,
  processing_fee NUMERIC,
  lender_fee NUMERIC DEFAULT 1500,
  legal_fee NUMERIC DEFAULT 1000,
  closing_cost NUMERIC,
  accepted_terms BOOLEAN DEFAULT false
);

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to loans table
CREATE TRIGGER update_loans_updated_at
BEFORE UPDATE ON loans
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

### 3.2: Enable Row Level Security

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE brokers ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE loan_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE borrowing_entity ENABLE ROW LEVEL SECURITY;
ALTER TABLE loan_quote ENABLE ROW LEVEL SECURITY;
```

### 3.3: Create RLS Policies

```sql
-- Users policies
CREATE POLICY "Users can view own record"
  ON users FOR SELECT
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own record"
  ON users FOR UPDATE
  USING (auth.uid()::text = id::text);

CREATE POLICY "Anyone can insert users"
  ON users FOR INSERT
  WITH CHECK (true);

-- Brokers policies
CREATE POLICY "Brokers can view own record"
  ON brokers FOR SELECT
  USING (user_id::text = auth.uid()::text);

CREATE POLICY "Anyone can insert broker"
  ON brokers FOR INSERT
  WITH CHECK (true);

-- Loans policies
CREATE POLICY "Loan takers view own loans"
  ON loans FOR SELECT
  USING (loan_taker_id::text = auth.uid()::text);

CREATE POLICY "Loan takers can create loans"
  ON loans FOR INSERT
  WITH CHECK (loan_taker_id::text = auth.uid()::text OR loan_taker_id IS NULL);

CREATE POLICY "Loan takers can update own loans"
  ON loans FOR UPDATE
  USING (loan_taker_id::text = auth.uid()::text);

CREATE POLICY "Brokers view referred loans"
  ON loans FOR SELECT
  USING (
    broker_id IN (
      SELECT id FROM brokers WHERE user_id::text = auth.uid()::text
    )
  );

-- Loan details policies
CREATE POLICY "Users can view own loan details"
  ON loan_details FOR SELECT
  USING (
    loan_id IN (
      SELECT id FROM loans WHERE loan_taker_id::text = auth.uid()::text
    ) OR
    loan_id IN (
      SELECT l.id FROM loans l
      JOIN brokers b ON l.broker_id = b.id
      WHERE b.user_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Users can insert own loan details"
  ON loan_details FOR INSERT
  WITH CHECK (
    loan_id IN (
      SELECT id FROM loans WHERE loan_taker_id::text = auth.uid()::text OR loan_taker_id IS NULL
    )
  );

CREATE POLICY "Users can update own loan details"
  ON loan_details FOR UPDATE
  USING (
    loan_id IN (
      SELECT id FROM loans WHERE loan_taker_id::text = auth.uid()::text
    )
  );

-- Similar policies for borrowing_entity and loan_quote
CREATE POLICY "Users can view own borrowing entity"
  ON borrowing_entity FOR SELECT
  USING (
    loan_id IN (
      SELECT id FROM loans WHERE loan_taker_id::text = auth.uid()::text
    ) OR
    loan_id IN (
      SELECT l.id FROM loans l
      JOIN brokers b ON l.broker_id = b.id
      WHERE b.user_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Users can insert own borrowing entity"
  ON borrowing_entity FOR INSERT
  WITH CHECK (
    loan_id IN (
      SELECT id FROM loans WHERE loan_taker_id::text = auth.uid()::text OR loan_taker_id IS NULL
    )
  );

CREATE POLICY "Users can update own borrowing entity"
  ON borrowing_entity FOR UPDATE
  USING (
    loan_id IN (
      SELECT id FROM loans WHERE loan_taker_id::text = auth.uid()::text
    )
  );

-- Loan quote policies
CREATE POLICY "Users can view own loan quote"
  ON loan_quote FOR SELECT
  USING (
    loan_id IN (
      SELECT id FROM loans WHERE loan_taker_id::text = auth.uid()::text
    ) OR
    loan_id IN (
      SELECT l.id FROM loans l
      JOIN brokers b ON l.broker_id = b.id
      WHERE b.user_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Users can insert own loan quote"
  ON loan_quote FOR INSERT
  WITH CHECK (
    loan_id IN (
      SELECT id FROM loans WHERE loan_taker_id::text = auth.uid()::text OR loan_taker_id IS NULL
    )
  );

CREATE POLICY "Users can update own loan quote"
  ON loan_quote FOR UPDATE
  USING (
    loan_id IN (
      SELECT id FROM loans WHERE loan_taker_id::text = auth.uid()::text
    )
  );
```

### 3.4: Create Admin Policies

```sql
-- Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE id::text = auth.uid()::text
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin policies (add to all tables)
CREATE POLICY "Admins have full access to users"
  ON users FOR ALL
  USING (is_admin());

CREATE POLICY "Admins have full access to brokers"
  ON brokers FOR ALL
  USING (is_admin());

CREATE POLICY "Admins have full access to loans"
  ON loans FOR ALL
  USING (is_admin());

CREATE POLICY "Admins have full access to loan_details"
  ON loan_details FOR ALL
  USING (is_admin());

CREATE POLICY "Admins have full access to borrowing_entity"
  ON borrowing_entity FOR ALL
  USING (is_admin());

CREATE POLICY "Admins have full access to loan_quote"
  ON loan_quote FOR ALL
  USING (is_admin());
```

## Step 4: Configure Authentication

1. Go to **Authentication** → **Providers**
2. Ensure **Email** provider is enabled
3. Go to **Authentication** → **URL Configuration**
4. Add redirect URLs:
   - For development: `http://localhost:3000/auth/callback`
   - For production: `https://yourdomain.com/auth/callback`

## Step 5: Create Admin User (Optional)

```sql
-- Insert admin user
INSERT INTO users (id, full_name, email, role)
VALUES (
  'your-auth-user-id-here',
  'Admin User',
  'admin@example.com',
  'admin'
);
```

## Step 6: Test Connection

1. Start your development server: `npm run dev`
2. Open http://localhost:3000
3. Check browser console for any Supabase connection errors

## 🎉 Setup Complete!

Your Supabase database is now ready. Next steps:
- Build authentication pages
- Test user signup/login
- Start building the multi-step form

## 📝 Notes

- **Security**: Never commit your `.env.local` file
- **Admin Access**: Admin users have full database access via RLS
- **Testing**: Test RLS policies thoroughly before production
- **Backup**: Supabase provides automatic backups on paid plans

## 🐛 Troubleshooting

**Issue**: Can't connect to Supabase
- Check your `.env.local` has correct credentials
- Verify project URL and keys in Supabase dashboard
- Restart dev server after changing env variables

**Issue**: RLS policy errors (403)
- Check user role is set correctly
- Verify policy conditions match your use case
- Use Supabase SQL Editor to test policies

**Issue**: Can't create tables
- Ensure you're running SQL as project owner
- Check for syntax errors in SQL
- Run scripts one at a time if needed

