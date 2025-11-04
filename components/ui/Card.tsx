'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  onClick?: () => void;
}

const StyledCard = styled(motion.div)<{
  $padding?: 'sm' | 'md' | 'lg';
  $hoverable?: boolean;
}>`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadiusMd};
  border: 1px solid ${props => props.theme.colors.borderLight};
  box-shadow: ${props => props.theme.shadows.xs};
  padding: ${props => {
    if (props.$padding === 'sm') return props.theme.spacing.lg;
    if (props.$padding === 'lg') return props.theme.spacing['2xl'];
    return props.theme.spacing.xl;
  }};
  transition: all 0.15s ease;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};
  
  ${props => props.$hoverable && `
    &:hover {
      border-color: ${props.theme.colors.border};
      box-shadow: ${props.theme.shadows.small};
    }
  `}
`;

export const Card: React.FC<CardProps> = ({ 
  children, 
  padding = 'md', 
  hoverable = false,
  onClick 
}) => {
  return (
    <StyledCard 
      $padding={padding} 
      $hoverable={hoverable}
      onClick={onClick}
      whileTap={onClick ? { scale: 0.99 } : {}}
    >
      {children}
    </StyledCard>
  );
};

