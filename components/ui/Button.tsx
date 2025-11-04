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
    if (props.$size === 'sm') return '7px 14px';
    if (props.$size === 'lg') return '13px 28px';
    return '10px 20px';
  }};
  
  font-size: ${props => {
    if (props.$size === 'sm') return props.theme.fontSizes.sm;
    if (props.$size === 'lg') return props.theme.fontSizes.md;
    return props.theme.fontSizes.sm;
  }};
  
  font-weight: ${props => props.theme.fontWeights.medium};
  border-radius: ${props => props.theme.borderRadius};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  background: ${props => {
    if (props.disabled) return props.theme.colors.borderLight;
    if (props.$variant === 'secondary') return props.theme.colors.white;
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
    if (props.$variant === 'outline') return `1px solid ${props.theme.colors.border}`;
    if (props.$variant === 'secondary') return `1px solid ${props.theme.colors.border}`;
    return 'none';
  }};
  
  box-shadow: ${props => props.$variant === 'primary' || props.$variant === 'danger' ? props.theme.shadows.xs : 'none'};
  transition: all 0.15s ease;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  &:hover:not(:disabled) {
    background: ${props => {
      if (props.$variant === 'primary') return props.theme.colors.primaryHover;
      if (props.$variant === 'secondary') return props.theme.colors.accent;
      if (props.$variant === 'outline') return props.theme.colors.accent;
      if (props.$variant === 'danger') return '#DC2626';
      return props.theme.colors.primaryHover;
    }};
    border-color: ${props => {
      if (props.$variant === 'outline') return props.theme.colors.primary;
      if (props.$variant === 'secondary') return props.theme.colors.border;
      return 'transparent';
    }};
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  
  &:disabled {
    opacity: 0.5;
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

