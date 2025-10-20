'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button, Input } from '@/components/ui';
import { FiMail, FiLock, FiDollarSign } from 'react-icons/fi';
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

const ForgotPassword = styled(Link)`
  text-align: right;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-top: -${props => props.theme.spacing.sm};

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin: ${props => props.theme.spacing.lg} 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme.colors.border};
  }

  span {
    color: ${props => props.theme.colors.textLight};
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

const SignupLink = styled.div`
  text-align: center;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};

  a {
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.fontWeights.semibold};
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - redirect based on email
    if (email.includes('admin')) {
      router.push('/admin');
    } else if (email.includes('broker')) {
      router.push('/broker');
    } else {
      router.push('/admin'); // Default
    }
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
          <Title>Welcome Back</Title>
          <Subtitle>Sign in to your account to continue</Subtitle>
        </Logo>

        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            label="Email Address"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div>
            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <ForgotPassword href="#">Forgot password?</ForgotPassword>
          </div>

          <Button type="submit" size="lg" fullWidth>
            Sign In
          </Button>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <SignupLink>
          Don't have an account? <Link href="/auth/signup">Sign up</Link>
        </SignupLink>
      </FormCard>
    </Container>
  );
}

