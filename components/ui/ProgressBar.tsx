'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // 0-100
  showLabel?: boolean;
  height?: number;
  color?: string;
}

const Container = styled.div`
  width: 100%;
`;

const BarBackground = styled.div<{ $height: number }>`
  width: 100%;
  height: ${props => props.$height}px;
  background: ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadiusFull};
  overflow: hidden;
  position: relative;
`;

const BarFill = styled(motion.div)<{ $color?: string }>`
  height: 100%;
  background: ${props => props.$color || props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadiusFull};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
`;

const Label = styled.div`
  margin-top: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  text-align: right;
  font-weight: ${props => props.theme.fontWeights.medium};
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showLabel = true,
  height = 8,
  color,
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <Container>
      <BarBackground $height={height}>
        <BarFill
          $color={color}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </BarBackground>
      {showLabel && <Label>{clampedProgress}% Complete</Label>}
    </Container>
  );
};

