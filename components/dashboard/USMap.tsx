'use client';

import styled from 'styled-components';
import { useState } from 'react';

interface StateData {
  name: string;
  borrowers: number;
  totalAmount: number;
}

interface USMapProps {
  stateData: Record<string, StateData>;
}

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const MapSVG = styled.svg`
  width: 100%;
  height: auto;
  
  path {
    fill: #E5E7EB;
    stroke: #FFFFFF;
    stroke-width: 1.5;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      fill: #3B82F6;
      stroke: #FFFFFF;
      stroke-width: 2;
    }
    
    &.has-data {
      fill: #93C5FD;
      
      &:hover {
        fill: #3B82F6;
      }
    }
  }
`;

const Tooltip = styled.div<{ $show: boolean; $x: number; $y: number }>`
  position: fixed;
  display: ${props => props.$show ? 'block' : 'none'};
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  background: white;
  border: 2px solid #1A73E8;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  pointer-events: none;
  z-index: 1000;
  min-width: 220px;
  transform: translate(-50%, -120%);
`;

const TooltipTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 2px solid #e5e7eb;
`;

const TooltipRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #6b7280;
  margin-top: 4px;
`;

const TooltipLabel = styled.span`
  font-weight: 500;
`;

const TooltipValue = styled.span`
  font-weight: 600;
  color: #1A73E8;
  margin-left: 12px;
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  margin-top: 24px;
  padding: 12px;
  flex-wrap: wrap;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
`;

const LegendColor = styled.div<{ $color: string }>`
  width: 24px;
  height: 24px;
  background: ${props => props.$color};
  border: 2px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const USMap: React.FC<USMapProps> = ({ stateData }) => {
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    state: string;
    data: StateData | null;
  }>({
    show: false,
    x: 0,
    y: 0,
    state: '',
    data: null,
  });

  const handleMouseEnter = (e: React.MouseEvent, stateCode: string, stateName: string) => {
    const data = stateData[stateCode];
    setTooltip({
      show: !!data,
      x: e.clientX,
      y: e.clientY,
      state: stateName,
      data: data || null,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (tooltip.show) {
      setTooltip(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    }
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, show: false }));
  };

  return (
    <MapContainer>
      <MapSVG
        viewBox="0 0 960 600"
        onMouseMove={handleMouseMove}
      >
        {/* Simplified accurate US state shapes */}
        <path d="M 215 445 L 230 445 L 230 455 L 245 455 L 245 470 L 230 470 L 230 485 L 215 485 Z" className={stateData.AL ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'AL', 'Alabama')} onMouseLeave={handleMouseLeave} />
        <path d="M 65 35 L 150 35 L 150 95 L 65 95 Z" className={stateData.AK ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'AK', 'Alaska')} onMouseLeave={handleMouseLeave} />
        <path d="M 115 325 L 145 325 L 160 355 L 160 410 L 130 410 L 115 380 Z" className={stateData.AZ ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'AZ', 'Arizona')} onMouseLeave={handleMouseLeave} />
        <path d="M 290 390 L 335 390 L 335 430 L 290 430 Z" className={stateData.AR ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'AR', 'Arkansas')} onMouseLeave={handleMouseLeave} />
        <path d="M 50 180 L 95 180 L 110 260 L 100 345 L 50 330 Z" className={stateData.CA ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'CA', 'California')} onMouseLeave={handleMouseLeave} />
        <path d="M 165 270 L 240 270 L 240 330 L 165 330 Z" className={stateData.CO ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'CO', 'Colorado')} onMouseLeave={handleMouseLeave} />
        <path d="M 820 195 L 845 195 L 845 210 L 820 210 Z" className={stateData.CT ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'CT', 'Connecticut')} onMouseLeave={handleMouseLeave} />
        <path d="M 805 240 L 815 240 L 815 260 L 805 260 Z" className={stateData.DE ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'DE', 'Delaware')} onMouseLeave={handleMouseLeave} />
        <path d="M 760 475 L 790 475 L 800 495 L 810 520 L 795 530 L 775 520 L 765 500 Z" className={stateData.FL ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'FL', 'Florida')} onMouseLeave={handleMouseLeave} />
        <path d="M 710 425 L 760 425 L 760 475 L 710 475 Z" className={stateData.GA ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'GA', 'Georgia')} onMouseLeave={handleMouseLeave} />
        <path d="M 215 555 L 280 555 L 280 580 L 215 580 Z" className={stateData.HI ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'HI', 'Hawaii')} onMouseLeave={handleMouseLeave} />
        <path d="M 145 185 L 190 185 L 190 280 L 165 280 L 145 250 Z" className={stateData.ID ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'ID', 'Idaho')} onMouseLeave={handleMouseLeave} />
        <path d="M 565 295 L 600 295 L 600 380 L 580 380 L 565 360 Z" className={stateData.IL ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'IL', 'Illinois')} onMouseLeave={handleMouseLeave} />
        <path d="M 620 315 L 655 315 L 655 375 L 620 375 Z" className={stateData.IN ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'IN', 'Indiana')} onMouseLeave={handleMouseLeave} />
        <path d="M 495 270 L 545 270 L 545 315 L 495 315 Z" className={stateData.IA ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'IA', 'Iowa')} onMouseLeave={handleMouseLeave} />
        <path d="M 360 335 L 435 335 L 435 370 L 360 370 Z" className={stateData.KS ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'KS', 'Kansas')} onMouseLeave={handleMouseLeave} />
        <path d="M 655 360 L 730 360 L 730 390 L 655 390 Z" className={stateData.KY ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'KY', 'Kentucky')} onMouseLeave={handleMouseLeave} />
        <path d="M 340 465 L 390 465 L 390 510 L 370 515 L 350 505 L 340 490 Z" className={stateData.LA ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'LA', 'Louisiana')} onMouseLeave={handleMouseLeave} />
        <path d="M 855 115 L 875 115 L 880 130 L 875 165 L 865 170 L 855 155 Z" className={stateData.ME ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'ME', 'Maine')} onMouseLeave={handleMouseLeave} />
        <path d="M 770 245 L 805 245 L 805 265 L 770 265 Z" className={stateData.MD ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'MD', 'Maryland')} onMouseLeave={handleMouseLeave} />
        <path d="M 820 170 L 860 170 L 860 190 L 820 190 Z" className={stateData.MA ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'MA', 'Massachusetts')} onMouseLeave={handleMouseLeave} />
        <path d="M 615 210 L 650 210 L 665 225 L 665 260 L 650 275 L 620 275 L 605 260 L 605 230 Z" className={stateData.MI ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'MI', 'Michigan')} onMouseLeave={handleMouseLeave} />
        <path d="M 480 185 L 545 185 L 545 255 L 480 255 Z" className={stateData.MN ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'MN', 'Minnesota')} onMouseLeave={handleMouseLeave} />
        <path d="M 580 430 L 610 430 L 610 490 L 580 490 Z" className={stateData.MS ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'MS', 'Mississippi')} onMouseLeave={handleMouseLeave} />
        <path d="M 495 330 L 565 330 L 565 390 L 495 390 Z" className={stateData.MO ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'MO', 'Missouri')} onMouseLeave={handleMouseLeave} />
        <path d="M 195 145 L 315 145 L 315 210 L 195 210 Z" className={stateData.MT ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'MT', 'Montana')} onMouseLeave={handleMouseLeave} />
        <path d="M 355 280 L 465 280 L 465 325 L 355 325 Z" className={stateData.NE ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'NE', 'Nebraska')} onMouseLeave={handleMouseLeave} />
        <path d="M 110 260 L 165 260 L 180 310 L 165 360 L 115 350 Z" className={stateData.NV ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'NV', 'Nevada')} onMouseLeave={handleMouseLeave} />
        <path d="M 845 150 L 860 150 L 860 175 L 845 175 Z" className={stateData.NH ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'NH', 'New Hampshire')} onMouseLeave={handleMouseLeave} />
        <path d="M 805 215 L 820 215 L 820 245 L 805 245 Z" className={stateData.NJ ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'NJ', 'New Jersey')} onMouseLeave={handleMouseLeave} />
        <path d="M 165 355 L 240 355 L 240 445 L 165 445 Z" className={stateData.NM ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'NM', 'New Mexico')} onMouseLeave={handleMouseLeave} />
        <path d="M 755 180 L 820 180 L 830 195 L 820 220 L 770 220 L 755 205 Z" className={stateData.NY ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'NY', 'New York')} onMouseLeave={handleMouseLeave} />
        <path d="M 705 375 L 780 375 L 780 405 L 705 405 Z" className={stateData.NC ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'NC', 'North Carolina')} onMouseLeave={handleMouseLeave} />
        <path d="M 395 165 L 480 165 L 480 210 L 395 210 Z" className={stateData.ND ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'ND', 'North Dakota')} onMouseLeave={handleMouseLeave} />
        <path d="M 670 285 L 720 285 L 720 340 L 670 340 Z" className={stateData.OH ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'OH', 'Ohio')} onMouseLeave={handleMouseLeave} />
        <path d="M 290 370 L 385 370 L 385 420 L 290 420 Z" className={stateData.OK ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'OK', 'Oklahoma')} onMouseLeave={handleMouseLeave} />
        <path d="M 65 165 L 145 165 L 145 235 L 65 235 Z" className={stateData.OR ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'OR', 'Oregon')} onMouseLeave={handleMouseLeave} />
        <path d="M 730 240 L 800 240 L 800 280 L 730 280 Z" className={stateData.PA ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'PA', 'Pennsylvania')} onMouseLeave={handleMouseLeave} />
        <path d="M 848 190 L 858 190 L 858 200 L 848 200 Z" className={stateData.RI ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'RI', 'Rhode Island')} onMouseLeave={handleMouseLeave} />
        <path d="M 730 410 L 770 410 L 770 445 L 730 445 Z" className={stateData.SC ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'SC', 'South Carolina')} onMouseLeave={handleMouseLeave} />
        <path d="M 395 225 L 480 225 L 480 270 L 395 270 Z" className={stateData.SD ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'SD', 'South Dakota')} onMouseLeave={handleMouseLeave} />
        <path d="M 615 385 L 710 385 L 710 420 L 615 420 Z" className={stateData.TN ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'TN', 'Tennessee')} onMouseLeave={handleMouseLeave} />
        <path d="M 245 385 L 335 385 L 345 420 L 345 490 L 315 505 L 285 505 L 265 480 L 250 450 Z" className={stateData.TX ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'TX', 'Texas')} onMouseLeave={handleMouseLeave} />
        <path d="M 165 285 L 240 285 L 240 355 L 165 355 Z" className={stateData.UT ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'UT', 'Utah')} onMouseLeave={handleMouseLeave} />
        <path d="M 830 165 L 842 165 L 842 185 L 830 185 Z" className={stateData.VT ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'VT', 'Vermont')} onMouseLeave={handleMouseLeave} />
        <path d="M 730 320 L 790 320 L 790 360 L 730 360 Z" className={stateData.VA ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'VA', 'Virginia')} onMouseLeave={handleMouseLeave} />
        <path d="M 65 110 L 155 110 L 155 160 L 65 160 Z" className={stateData.WA ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'WA', 'Washington')} onMouseLeave={handleMouseLeave} />
        <path d="M 710 310 L 750 310 L 750 345 L 710 345 Z" className={stateData.WV ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'WV', 'West Virginia')} onMouseLeave={handleMouseLeave} />
        <path d="M 550 230 L 600 230 L 600 290 L 550 290 Z" className={stateData.WI ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'WI', 'Wisconsin')} onMouseLeave={handleMouseLeave} />
        <path d="M 195 225 L 315 225 L 315 280 L 195 280 Z" className={stateData.WY ? 'has-data' : ''} onMouseEnter={(e) => handleMouseEnter(e, 'WY', 'Wyoming')} onMouseLeave={handleMouseLeave} />
      </MapSVG>

      <Legend>
        <LegendItem>
          <LegendColor $color="#93C5FD" />
          <span>States with Borrowers</span>
        </LegendItem>
        <LegendItem>
          <LegendColor $color="#E5E7EB" />
          <span>No Data</span>
        </LegendItem>
      </Legend>

      <Tooltip
        $show={tooltip.show}
        $x={tooltip.x}
        $y={tooltip.y}
      >
        {tooltip.data && (
          <>
            <TooltipTitle>{tooltip.state}</TooltipTitle>
            <TooltipRow>
              <TooltipLabel>Borrowers:</TooltipLabel>
              <TooltipValue>{tooltip.data.borrowers}</TooltipValue>
            </TooltipRow>
            <TooltipRow>
              <TooltipLabel>Total Loan Amount:</TooltipLabel>
              <TooltipValue>${tooltip.data.totalAmount.toLocaleString()}</TooltipValue>
            </TooltipRow>
          </>
        )}
      </Tooltip>
    </MapContainer>
  );
};
