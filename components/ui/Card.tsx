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
  border-radius: ${props => props.theme.borderRadiusLg};
  box-shadow: ${props => props.theme.shadows.small};
  padding: ${props => {
    if (props.$padding === 'sm') return props.theme.spacing.md;
    if (props.$padding === 'lg') return props.theme.spacing.xl;
    return props.theme.spacing.lg;
  }};
  transition: all 0.3s ease;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};
  
  ${props => props.$hoverable && `
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${props.theme.shadows.medium};
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
      whileHover={hoverable ? { y: -4 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      {children}
    </StyledCard>
  );
};

