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
  border-radius: ${props => props.theme.borderRadiusMd};
  border: 1px solid ${props => props.theme.colors.borderLight};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.xs};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  transition: all 0.15s ease;

  &:hover {
    border-color: ${props => props.theme.colors.border};
    box-shadow: ${props => props.theme.shadows.small};
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const IconWrapper = styled.div<{ $color?: string }>`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius};
  background: ${props => props.$color || props.theme.colors.primary}10;
  color: ${props => props.$color || props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: ${props => props.theme.fontSizes.xl};
  }
`;

const Value = styled.div`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  line-height: 1;
`;

const Trend = styled.div<{ $isPositive: boolean }>`
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.$isPositive ? props.theme.colors.success : props.theme.colors.error};
  background: ${props => props.$isPositive ? props.theme.colors.successLight : props.theme.colors.errorLight};
  padding: 4px 8px;
  border-radius: ${props => props.theme.borderRadius};
  display: inline-flex;
  align-items: center;
  gap: 4px;
  width: fit-content;

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

