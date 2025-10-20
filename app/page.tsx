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
  padding: ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}15 0%, ${props => props.theme.colors.accent} 100%);
`;

const Card = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadiusLg};
  padding: ${props => props.theme.spacing['2xl']};
  box-shadow: ${props => props.theme.shadows.large};
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes['4xl']};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.md};
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
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.secondary};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.fontWeights.semibold};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.medium};
  }

  svg {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const Version = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
  font-size: ${props => props.theme.fontSizes.sm};
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
          <FiDollarSign />
          Loan Management Platform
        </Title>
        <Subtitle>
          Welcome to your business loan management system
        </Subtitle>

        <ButtonGrid>
          <Button
            href="/admin"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiBarChart />
            <span>Admin Dashboard</span>
          </Button>

          <Button
            href="/broker"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiUsers />
            <span>Broker Portal</span>
          </Button>

          <Button
            href="/apply"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
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

