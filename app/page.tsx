'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiDollarSign, FiUsers, FiBarChart } from 'react-icons/fi';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.backgroundAlt};
`;

const Card = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: ${props => props.theme.borderRadiusLg};
  padding: ${props => props.theme.spacing['3xl']};
  box-shadow: ${props => props.theme.shadows.small};
  max-width: 900px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes['3xl']};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing['3xl']};
  line-height: 1.6;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};

  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Button = styled(motion(Link))`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing['2xl']};
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadiusMd};
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.fontWeights.medium};
  font-size: ${props => props.theme.fontSizes.sm};
  transition: all 0.15s ease;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.accent};
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.small};
  }

  svg {
    font-size: ${props => props.theme.fontSizes['2xl']};
    color: ${props => props.theme.colors.primary};
  }
`;

const Version = styled.div`
  margin-top: ${props => props.theme.spacing['2xl']};
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.textLight};
`;

export default function Home() {
  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>
          Loan Management Platform
        </Title>
        <Subtitle>
          Welcome to your business loan management system
        </Subtitle>

        <ButtonGrid>
          <Button
            href="/admin"
            whileTap={{ scale: 0.98 }}
          >
            <FiBarChart />
            <span>Admin Dashboard</span>
          </Button>

          <Button
            href="/broker"
            whileTap={{ scale: 0.98 }}
          >
            <FiUsers />
            <span>Broker Portal</span>
          </Button>

          <Button
            href="/apply"
            whileTap={{ scale: 0.98 }}
          >
            <FiDollarSign />
            <span>Apply for Loan</span>
          </Button>
        </ButtonGrid>

        <Version>Version 1.0.0 • Phase 1 Complete</Version>
      </Card>
    </Container>
  );
}

