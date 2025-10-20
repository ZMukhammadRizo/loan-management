'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const StyledButton = styled(motion.button)<{
  $variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
}>`
  padding: ${props => {
    if (props.$size === 'sm') return '8px 16px';
    if (props.$size === 'lg') return '16px 32px';
    return '12px 24px';
  }};
  
  font-size: ${props => {
    if (props.$size === 'sm') return props.theme.fontSizes.sm;
    if (props.$size === 'lg') return props.theme.fontSizes.lg;
    return props.theme.fontSizes.md;
  }};
  
  font-weight: ${props => props.theme.fontWeights.semibold};
  border-radius: ${props => props.theme.borderRadius};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  background: ${props => {
    if (props.disabled) return props.theme.colors.border;
    if (props.$variant === 'secondary') return props.theme.colors.secondary;
    if (props.$variant === 'outline') return 'transparent';
    if (props.$variant === 'danger') return props.theme.colors.error;
    return props.theme.colors.primary;
  }};
  
  color: ${props => {
    if (props.disabled) return props.theme.colors.textLight;
    if (props.$variant === 'primary') return props.theme.colors.white;
    if (props.$variant === 'secondary') return props.theme.colors.text;
    if (props.$variant === 'outline') return props.theme.colors.primary;
    if (props.$variant === 'danger') return props.theme.colors.white;
    return props.theme.colors.white;
  }};
  
  border: ${props => {
    if (props.$variant === 'outline') return `2px solid ${props.theme.colors.primary}`;
    return 'none';
  }};
  
  box-shadow: ${props => props.$variant === 'primary' || props.$variant === 'danger' ? props.theme.shadows.small : 'none'};
  transition: all 0.2s ease;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
    background: ${props => {
      if (props.$variant === 'primary') return props.theme.colors.primaryHover;
      if (props.$variant === 'danger') return '#d32f2f';
      return props.background;
    }};
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {children}
    </StyledButton>
  );
};

