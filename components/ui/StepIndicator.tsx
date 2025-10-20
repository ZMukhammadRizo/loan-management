'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

interface Step {
  title: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number; // 1-based index
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${props => props.theme.spacing.lg} 0;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
`;

const StepCircle = styled(motion.div)<{ $isActive: boolean; $isCompleted: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes.lg};
  z-index: 2;
  
  background: ${props => {
    if (props.$isCompleted) return props.theme.colors.success;
    if (props.$isActive) return props.theme.colors.primary;
    return props.theme.colors.white;
  }};
  
  color: ${props => {
    if (props.$isCompleted || props.$isActive) return props.theme.colors.white;
    return props.theme.colors.textLight;
  }};
  
  border: 3px solid ${props => {
    if (props.$isCompleted) return props.theme.colors.success;
    if (props.$isActive) return props.theme.colors.primary;
    return props.theme.colors.border;
  }};
  
  box-shadow: ${props => props.$isActive || props.$isCompleted ? props.theme.shadows.medium : 'none'};
`;

const StepLine = styled(motion.div)<{ $isCompleted: boolean }>`
  position: absolute;
  top: 24px;
  left: 50%;
  width: 100%;
  height: 3px;
  background: ${props => props.$isCompleted ? props.theme.colors.success : props.theme.colors.border};
  z-index: 1;
`;

const StepContent = styled.div<{ $isActive: boolean }>`
  margin-top: ${props => props.theme.spacing.sm};
  text-align: center;
`;

const StepTitle = styled.div<{ $isActive: boolean }>`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.$isActive ? props.theme.fontWeights.semibold : props.theme.fontWeights.medium};
  color: ${props => props.$isActive ? props.theme.colors.text : props.theme.colors.textLight};
`;

const StepDescription = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.textLight};
  margin-top: 2px;
`;

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <Container>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        const showLine = index < steps.length - 1;

        return (
          <StepWrapper key={index}>
            {showLine && (
              <StepLine
                $isCompleted={isCompleted}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isCompleted ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <StepCircle
              $isActive={isActive}
              $isCompleted={isCompleted}
              initial={{ scale: 0.8 }}
              animate={{ scale: isActive ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {isCompleted ? <FiCheck size={24} /> : stepNumber}
            </StepCircle>
            <StepContent $isActive={isActive}>
              <StepTitle $isActive={isActive}>{step.title}</StepTitle>
              {step.description && <StepDescription>{step.description}</StepDescription>}
            </StepContent>
          </StepWrapper>
        );
      })}
    </Container>
  );
};

