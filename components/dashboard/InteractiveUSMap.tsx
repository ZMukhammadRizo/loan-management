'use client';

import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { StateData, LoanDetail } from '@/lib/mockData';

const geoUrl = "https://unpkg.com/us-atlas@3/states-10m.json";

interface InteractiveUSMapProps {
  role: 'admin' | 'broker';
  stateData: Record<string, StateData>;
  loanDetails?: Record<string, LoanDetail[]>;
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

const MapWrapper = styled.div`
  position: relative;
  height: calc(100% - 100px);
  overflow: hidden;
`;

const StyledComposableMap = styled(ComposableMap)`
  width: 100%;
  height: 100%;
`;

const Tooltip = styled(motion.div)<{ $x: number; $y: number }>`
  position: absolute;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  background: white;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05);
  border: 1px solid #E2E8F0;
  pointer-events: none;
  z-index: 1000;
  min-width: 240px;
  max-width: 300px;
  transform: translate(-50%, calc(-100% - 15px));
  font-family: 'Inter', sans-serif;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: white;
    border: 1px solid #E2E8F0;
    border-top: none;
    border-left: none;
    transform: translateX(-50%) rotate(45deg);
  }
`;

const TooltipTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #111827;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #F3F4F6;
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
  margin-left: 12px;
`;

const Legend = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: white;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  z-index: 5;
`;

const LegendTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

const LegendScale = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #6B7280;
`;

const LegendGradient = styled.div<{ $colors: string }>`
  width: 80px;
  height: 12px;
  background: linear-gradient(to right, ${props => props.$colors});
  border-radius: 6px;
`;

const NoDataIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #9CA3AF;
  font-size: 16px;
  font-weight: 500;
`;

export const InteractiveUSMap: React.FC<InteractiveUSMapProps> = ({
  role,
  stateData,
  loanDetails = {},
  onStateClick
}) => {
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    data: StateData & { stateId: string } | null;
  }>({ show: false, x: 0, y: 0, data: null });

  // Debug logging
  console.log('InteractiveUSMap props:', { role, stateData: Object.keys(stateData), loanDetails });

  // Color scales based on role
  const adminColors = {
    min: '#E5ECF4',
    mid: '#7BB3F0',
    max: '#1A73E8'
  };
  
  const brokerColors = {
    min: '#E5F4EA',
    mid: '#7BC88A',
    max: '#00875A'
  };

  const colors = role === 'admin' ? adminColors : brokerColors;
  
  // Get min and max loan amounts for color scaling
  const amounts = Object.values(stateData).map(d => d.totalAmount);
  const minAmount = Math.min(...amounts);
  const maxAmount = Math.max(...amounts);

  const colorScale = scaleLinear<string>()
    .domain([minAmount, maxAmount])
    .range([colors.min, colors.max]);

  // State name to code mapping
  const stateNameToCode: Record<string, string> = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
    'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
    'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
    'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
  };

  const getStateCode = (geo: any): string => {
    // Try multiple ways to get state identifier
    if (geo.properties?.NAME) {
      return stateNameToCode[geo.properties.NAME] || geo.properties.NAME;
    }
    if (geo.properties?.name) {
      return stateNameToCode[geo.properties.name] || geo.properties.name;
    }
    if (geo.id && geo.id.length === 2) {
      return geo.id;
    }
    return geo.id || '';
  };

  const handleMouseEnter = (geo: any, event: React.MouseEvent) => {
    const stateCode = getStateCode(geo);
    const data = stateData[stateCode];
    
    if (data) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const containerRect = event.currentTarget.closest('svg')?.getBoundingClientRect();
      if (containerRect) {
        setTooltip({
          show: true,
          x: event.clientX - containerRect.left,
          y: event.clientY - containerRect.top,
          data: { ...data, stateId: stateCode }
        });
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (tooltip.show) {
      const containerRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      setTooltip(prev => ({
        ...prev,
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top
      }));
    }
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, show: false }));
  };

  const handleClick = (geo: any) => {
    const stateCode = getStateCode(geo);
    const data = stateData[stateCode];
    
    if (data && onStateClick) {
      onStateClick(stateCode, data);
    }
  };

  const getStateFill = (geo: any) => {
    const stateCode = getStateCode(geo);
    const data = stateData[stateCode];
    
    if (!data) {
      return '#F3F4F6';
    }
    
    return colorScale(data.totalAmount);
  };

  const hasData = Object.keys(stateData).length > 0;

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

      <MapWrapper onMouseMove={handleMouseMove}>
        {!hasData ? (
          <NoDataIndicator>
            No loan data available
          </NoDataIndicator>
        ) : (
          <>
            <StyledComposableMap
              projection="geoAlbersUsa"
              projectionConfig={{
                scale: 1000,
                center: [-96, 38]
              }}
            >
              <ZoomableGroup>
                <Geographies geography={geoUrl}>
                  {({ geographies, error, loading }) => {
                    console.log('Geography status:', { loading, error, geoCount: geographies?.length });
                    
                    if (loading) {
                      return (
                        <text x={480} y={300} textAnchor="middle" fill="#6B7280" fontSize={16}>
                          Loading map...
                        </text>
                      );
                    }
                    
                    if (error) {
                      console.error('Geography error:', error);
                      return (
                        <text x={480} y={300} textAnchor="middle" fill="#DC2626" fontSize={16}>
                          Error loading map
                        </text>
                      );
                    }
                    
                    if (!geographies || geographies.length === 0) {
                      return (
                        <text x={480} y={300} textAnchor="middle" fill="#6B7280" fontSize={16}>
                          No geographic data available
                        </text>
                      );
                    }
                    
                    return geographies.map(geo => {
                      const stateCode = getStateCode(geo);
                      console.log('Rendering state:', stateCode, geo.properties);
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={getStateFill(geo)}
                          stroke="#FFFFFF"
                          strokeWidth={0.75}
                          style={{
                            default: {
                              outline: "none",
                              cursor: stateData[stateCode] ? "pointer" : "default"
                            },
                            hover: {
                              outline: "none",
                              fill: stateData[stateCode] ? colors.max : "#F3F4F6",
                              stroke: "#FFFFFF",
                              strokeWidth: 1.5
                            },
                            pressed: {
                              outline: "none",
                              fill: colors.max
                            }
                          }}
                          onMouseEnter={(event) => handleMouseEnter(geo, event)}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => handleClick(geo)}
                        />
                      );
                    });
                  }}
                </Geographies>
              </ZoomableGroup>
            </StyledComposableMap>

            <Legend>
              <LegendTitle>Loan Amount</LegendTitle>
              <LegendScale>
                <span>${(minAmount / 1000).toFixed(0)}K</span>
                <LegendGradient $colors={`${colors.min}, ${colors.mid}, ${colors.max}`} />
                <span>${(maxAmount / 1000000).toFixed(1)}M</span>
              </LegendScale>
            </Legend>

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
                  {loanDetails[tooltip.data.stateId] && loanDetails[tooltip.data.stateId].length > 0 && (
                    <TooltipRow style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #F3F4F6' }}>
                      <TooltipLabel>💡 Click for details</TooltipLabel>
                      <TooltipValue style={{ color: colors.max }}>→</TooltipValue>
                    </TooltipRow>
                  )}
                </Tooltip>
              )}
            </AnimatePresence>
          </>
        )}
      </MapWrapper>
    </MapContainer>
  );
};
