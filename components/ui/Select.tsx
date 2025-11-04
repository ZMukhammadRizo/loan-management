'use client';

import styled from 'styled-components';
import { forwardRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  width: 100%;
`;

const Label = styled.label`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.text};
`;

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelect = styled.select<{ $hasError?: boolean }>`
  width: 100%;
  padding: 10px 40px 10px 14px;
  font-size: ${props => props.theme.fontSizes.sm};
  border: 1px solid ${props => props.$hasError ? props.theme.colors.error : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  transition: all 0.15s ease;
  appearance: none;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? props.theme.colors.error : props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? props.theme.colors.errorLight : props.theme.colors.primaryLight};
  }

  &:disabled {
    background: ${props => props.theme.colors.accent};
    cursor: not-allowed;
    opacity: 0.6;
  }

  option:first-of-type {
    color: ${props => props.theme.colors.textLight};
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${props => props.theme.colors.textLight};
  display: flex;
  align-items: center;
`;

const ErrorText = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.error};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  margin-top: 2px;
`;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, value, defaultValue, ...props }, ref) => {
    // Use empty string as defaultValue when placeholder exists and no value/defaultValue is provided
    const selectDefaultValue = placeholder && !value && !defaultValue ? '' : defaultValue;
    
    return (
      <SelectWrapper>
        {label && <Label>{label}</Label>}
        <SelectContainer>
          <StyledSelect 
            ref={ref} 
            $hasError={!!error} 
            value={value}
            defaultValue={selectDefaultValue}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </StyledSelect>
          <IconWrapper>
            <FiChevronDown size={20} />
          </IconWrapper>
        </SelectContainer>
        {error && <ErrorText>⚠️ {error}</ErrorText>}
      </SelectWrapper>
    );
  }
);

Select.displayName = 'Select';

