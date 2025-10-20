'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

const CardContainer = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadiusLg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.small};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.medium};
    transform: translateY(-4px);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const IconWrapper = styled.div<{ $color?: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius};
  background: ${props => props.$color || props.theme.colors.primary}15;
  color: ${props => props.$color || props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: ${props => props.theme.fontSizes['2xl']};
  }
`;

const Value = styled.div`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
`;

const Trend = styled.div<{ $isPositive: boolean }>`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.$isPositive ? props.theme.colors.success : props.theme.colors.error};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};

  &::before {
    content: '${props => props.$isPositive ? '↑' : '↓'}';
  }
`;

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon,
  trend,
  color,
}) => {
  return (
    <CardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header>
        <Title>{title}</Title>
        <IconWrapper $color={color}>{icon}</IconWrapper>
      </Header>
      <Value>{value}</Value>
      {trend && (
        <Trend $isPositive={trend.isPositive}>
          {Math.abs(trend.value)}% from last month
        </Trend>
      )}
    </CardContainer>
  );
};

