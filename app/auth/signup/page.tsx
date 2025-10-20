'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button, Input, Select } from '@/components/ui';
import { FiDollarSign } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}15 0%, ${props => props.theme.colors.accent} 100%);
  padding: ${props => props.theme.spacing.lg};
`;

const FormCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadiusLg};
  padding: ${props => props.theme.spacing['2xl']};
  box-shadow: ${props => props.theme.shadows.large};
  max-width: 450px;
  width: 100%;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const LogoIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.theme.spacing.md};

  svg {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const SigninLink = styled.div`
  text-align: center;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  margin-top: ${props => props.theme.spacing.lg};

  a {
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.fontWeights.semibold};
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'broker',
    companyName: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock signup - redirect based on role
    if (formData.role === 'broker') {
      router.push('/broker');
    } else {
      router.push('/admin');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <FormCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo>
          <LogoIcon>
            <FiDollarSign />
          </LogoIcon>
          <Title>Create Account</Title>
          <Subtitle>Join us to start referring borrowers</Subtitle>
        </Logo>

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="fullName"
            label="Full Name"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <Input
            type="email"
            name="email"
            label="Email Address"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            type="tel"
            name="phone"
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <Select
            name="role"
            label="Account Type"
            value={formData.role}
            onChange={handleChange}
            options={[
              { value: 'broker', label: 'Broker' },
              { value: 'loan_taker', label: 'Loan Taker' },
            ]}
          />

          {formData.role === 'broker' && (
            <Input
              type="text"
              name="companyName"
              label="Company Name"
              placeholder="Your Company LLC"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          )}

          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <Button type="submit" size="lg" fullWidth>
            Create Account
          </Button>
        </Form>

        <SigninLink>
          Already have an account? <Link href="/auth/login">Sign in</Link>
        </SigninLink>
      </FormCard>
    </Container>
  );
}

