'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { StateData } from '@/lib/mockData';

interface SimpleUSMapProps {
  role: 'admin' | 'broker';
  stateData: Record<string, StateData>;
  onStateClick?: (stateId: string, stateData: StateData) => void;
}

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadiusLg};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  font-family: 'Inter', sans-serif;
`;

const MapHeader = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
`;

const MapTitle = styled.h3`
  margin: 0;
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: #1F1F1F;
`;

const MapSubtitle = styled.p`
  margin: 4px 0 0 0;
  font-size: ${props => props.theme.fontSizes.sm};
  color: #64748B;
`;

const MapSVG = styled.svg`
  width: 100%;
  height: calc(100% - 100px);
  cursor: default;
`;

const StateShape = styled.rect<{ $hasData: boolean; $color: string; $isHovered: boolean }>`
  fill: ${props => props.$hasData ? props.$color : '#F3F4F6'};
  stroke: #FFFFFF;
  stroke-width: 2;
  cursor: ${props => props.$hasData ? 'pointer' : 'default'};
  transition: all 0.3s ease;
  transform: ${props => props.$isHovered ? 'scale(1.05)' : 'scale(1)'};
  transform-origin: center;
`;

const Tooltip = styled(motion.div)<{ $x: number; $y: number }>`
  position: absolute;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  background: white;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid #E2E8F0;
  pointer-events: none;
  z-index: 1000;
  min-width: 240px;
  transform: translate(-50%, -120%);
  font-family: 'Inter', sans-serif;
`;

const TooltipTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #111827;
  margin-bottom: 12px;
`;

const TooltipRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #4B5563;
  margin-bottom: 6px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TooltipLabel = styled.span`
  font-weight: 500;
  color: #6B7280;
`;

const TooltipValue = styled.span<{ $color?: string }>`
  font-weight: 700;
  font-size: 15px;
  color: ${props => props.$color || '#111827'};
`;

// Simple state positions for demonstration
const simpleStates = [
  { code: 'CA', name: 'California', x: 50, y: 250, width: 80, height: 120 },
  { code: 'TX', name: 'Texas', x: 300, y: 320, width: 100, height: 80 },
  { code: 'FL', name: 'Florida', x: 500, y: 380, width: 90, height: 60 },
  { code: 'NY', name: 'New York', x: 550, y: 150, width: 70, height: 50 },
  { code: 'IL', name: 'Illinois', x: 400, y: 200, width: 60, height: 80 },
  { code: 'WA', name: 'Washington', x: 80, y: 80, width: 70, height: 60 },
];

export const SimpleUSMap: React.FC<SimpleUSMapProps> = ({
  role,
  stateData,
  onStateClick
}) => {
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    data: StateData & { stateId: string } | null;
  }>({ show: false, x: 0, y: 0, data: null });

  const [hoveredState, setHoveredState] = useState<string | null>(null);

  // Color scales based on role
  const colors = role === 'admin' 
    ? { min: '#E5ECF4', max: '#1A73E8' }
    : { min: '#E5F4EA', max: '#00875A' };

  const handleMouseEnter = (event: React.MouseEvent, stateCode: string) => {
    const data = stateData[stateCode];
    if (data) {
      const rect = event.currentTarget.getBoundingClientRect();
      setTooltip({
        show: true,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        data: { ...data, stateId: stateCode }
      });
      setHoveredState(stateCode);
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (tooltip.show) {
      const rect = event.currentTarget.getBoundingClientRect();
      setTooltip(prev => ({
        ...prev,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }));
    }
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, show: false }));
    setHoveredState(null);
  };

  const handleClick = (stateCode: string) => {
    const data = stateData[stateCode];
    if (data && onStateClick) {
      onStateClick(stateCode, data);
    }
  };

  const getStateColor = (stateCode: string) => {
    const data = stateData[stateCode];
    if (!data) return '#F3F4F6';
    
    // Simple color interpolation based on loan amount
    const maxAmount = Math.max(...Object.values(stateData).map(d => d.totalAmount));
    const intensity = data.totalAmount / maxAmount;
    
    if (role === 'admin') {
      const r = Math.round(26 + (229 - 26) * (1 - intensity));
      const g = Math.round(115 + (236 - 115) * (1 - intensity));
      const b = Math.round(232 + (244 - 232) * (1 - intensity));
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      const r = Math.round(0 + (229 - 0) * (1 - intensity));
      const g = Math.round(135 + (244 - 135) * (1 - intensity));
      const b = Math.round(90 + (234 - 90) * (1 - intensity));
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  return (
    <MapContainer>
      <MapHeader>
        <MapTitle>
          {role === 'admin' ? 'National Loan Distribution' : 'Your Loan Portfolio by State'}
        </MapTitle>
        <MapSubtitle>
          {role === 'admin' 
            ? 'Hover over states to see loan statistics, click for detailed information'
            : 'States where you have active loan clients'
          }
        </MapSubtitle>
      </MapHeader>

      <MapSVG viewBox="0 0 700 500" onMouseMove={handleMouseMove}>
        {simpleStates.map(state => {
          const hasData = !!stateData[state.code];
          const isHovered = hoveredState === state.code;
          
          return (
            <StateShape
              key={state.code}
              x={state.x}
              y={state.y}
              width={state.width}
              height={state.height}
              $hasData={hasData}
              $color={getStateColor(state.code)}
              $isHovered={isHovered}
              onMouseEnter={(e) => handleMouseEnter(e, state.code)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(state.code)}
            />
          );
        })}
        
        {/* State labels */}
        {simpleStates.map(state => (
          <text
            key={`label-${state.code}`}
            x={state.x + state.width / 2}
            y={state.y + state.height / 2 + 5}
            textAnchor="middle"
            fill={stateData[state.code] ? 'white' : '#9CA3AF'}
            fontSize="12"
            fontWeight="600"
            pointerEvents="none"
          >
            {state.code}
          </text>
        ))}
      </MapSVG>

      <AnimatePresence>
        {tooltip.show && tooltip.data && (
          <Tooltip
            $x={tooltip.x}
            $y={tooltip.y}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <TooltipTitle>{tooltip.data.stateName}</TooltipTitle>
            <TooltipRow>
              <TooltipLabel>Total Borrowers:</TooltipLabel>
              <TooltipValue $color={colors.max}>
                {tooltip.data.totalLoans}
              </TooltipValue>
            </TooltipRow>
            <TooltipRow>
              <TooltipLabel>Loan Amount:</TooltipLabel>
              <TooltipValue $color={colors.max}>
                ${(tooltip.data.totalAmount / 1000000).toFixed(1)}M
              </TooltipValue>
            </TooltipRow>
            <TooltipRow>
              <TooltipLabel>Avg Loan Size:</TooltipLabel>
              <TooltipValue $color="#6B7280">
                ${(tooltip.data.totalAmount / tooltip.data.totalLoans / 1000).toFixed(0)}K
              </TooltipValue>
            </TooltipRow>
            <TooltipRow style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #F3F4F6' }}>
              <TooltipLabel>💡 Click for details</TooltipLabel>
              <TooltipValue style={{ color: colors.max }}>→</TooltipValue>
            </TooltipRow>
          </Tooltip>
        )}
      </AnimatePresence>
    </MapContainer>
  );
};

