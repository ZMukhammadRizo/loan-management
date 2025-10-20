'use client';

import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDollarSign, FiUsers, FiTrendingUp, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import { StateData, LoanDetail } from '@/lib/mockData';

interface StateDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  stateId: string | null;
  stateData: StateData | null;
  loanDetails: LoanDetail[];
  role: 'admin' | 'broker';
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const DrawerContainer = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 480px;
  max-width: 90vw;
  background: white;
  z-index: 1001;
  overflow-y: auto;
  box-shadow: -10px 0 25px rgba(0, 0, 0, 0.15);
`;

const DrawerHeader = styled.div<{ $role: 'admin' | 'broker' }>`
  padding: 24px;
  background: ${props => props.$role === 'admin' 
    ? 'linear-gradient(135deg, #E5ECF4 0%, #D1E7F5 100%)' 
    : 'linear-gradient(135deg, #E5F4EA 0%, #D1F2DD 100%)'
  };
  border-bottom: 1px solid #E5E7EB;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6B7280;
  }
`;

const StateTitle = styled.h2`
  margin: 0 40px 8px 0;
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  font-family: 'Inter', sans-serif;
`;

const StateSubtitle = styled.p`
  margin: 0 40px 0 0;
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`;

const DrawerContent = styled.div`
  padding: 24px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const StatCard = styled.div<{ $color: string }>`
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.$color};
  }
`;

const StatIcon = styled.div<{ $bgColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;

  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
  font-family: 'Inter', sans-serif;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
`;

const LoansList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LoanCard = styled.div`
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s ease;

  &:hover {
    background: #F3F4F6;
    border-color: #D1D5DB;
  }
`;

const LoanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const LoanBorrower = styled.div`
  font-weight: 600;
  color: #111827;
  font-size: 14px;
`;

const LoanAmount = styled.div`
  font-weight: 700;
  color: #059669;
  font-size: 14px;
`;

const LoanMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #6B7280;
`;

const LoanBroker = styled.span`
  font-weight: 500;
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  ${props => {
    switch (props.$status.toLowerCase()) {
      case 'approved':
        return `
          background: #D1FAE5;
          color: #065F46;
        `;
      case 'pending':
        return `
          background: #FEF3C7;
          color: #92400E;
        `;
      case 'in review':
        return `
          background: #DBEAFE;
          color: #1E40AF;
        `;
      case 'rejected':
        return `
          background: #FEE2E2;
          color: #991B1B;
        `;
      default:
        return `
          background: #F3F4F6;
          color: #374151;
        `;
    }
  }}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #9CA3AF;
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyStateText = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

export const StateDetailsDrawer: React.FC<StateDetailsDrawerProps> = ({
  isOpen,
  onClose,
  stateId,
  stateData,
  loanDetails,
  role
}) => {
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <FiCheckCircle />;
      case 'pending':
        return <FiClock />;
      case 'rejected':
        return <FiXCircle />;
      default:
        return <FiClock />;
    }
  };

  const primaryColor = role === 'admin' ? '#1A73E8' : '#00875A';
  const secondaryColor = role === 'admin' ? '#E5ECF4' : '#E5F4EA';

  return (
    <AnimatePresence>
      {isOpen && stateData && (
        <>
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <DrawerContainer
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <DrawerHeader $role={role}>
              <StateTitle>{stateData.stateName}</StateTitle>
              <StateSubtitle>
                {role === 'admin' ? 'State loan overview' : 'Your portfolio in this state'}
              </StateSubtitle>
              <CloseButton onClick={onClose}>
                <FiX />
              </CloseButton>
            </DrawerHeader>

            <DrawerContent>
              <StatsGrid>
                <StatCard $color={primaryColor}>
                  <StatIcon $bgColor={primaryColor}>
                    <FiUsers />
                  </StatIcon>
                  <StatValue>{stateData.totalLoans}</StatValue>
                  <StatLabel>Total Loans</StatLabel>
                </StatCard>

                <StatCard $color={primaryColor}>
                  <StatIcon $bgColor={primaryColor}>
                    <FiDollarSign />
                  </StatIcon>
                  <StatValue>${(stateData.totalAmount / 1000000).toFixed(1)}M</StatValue>
                  <StatLabel>Total Amount</StatLabel>
                </StatCard>

                <StatCard $color={primaryColor}>
                  <StatIcon $bgColor={primaryColor}>
                    <FiTrendingUp />
                  </StatIcon>
                  <StatValue>${(stateData.totalAmount / stateData.totalLoans / 1000).toFixed(0)}K</StatValue>
                  <StatLabel>Avg Loan Size</StatLabel>
                </StatCard>
              </StatsGrid>

              <Section>
                <SectionTitle>
                  <FiUsers />
                  Loan Details
                </SectionTitle>
                
                {loanDetails.length > 0 ? (
                  <LoansList>
                    {loanDetails.map((loan) => (
                      <LoanCard key={loan.id}>
                        <LoanHeader>
                          <LoanBorrower>{loan.borrower}</LoanBorrower>
                          <LoanAmount>${loan.amount.toLocaleString()}</LoanAmount>
                        </LoanHeader>
                        <LoanMeta>
                          <LoanBroker>Broker: {loan.broker}</LoanBroker>
                          <StatusBadge $status={loan.status}>
                            {getStatusIcon(loan.status)}
                            {loan.status}
                          </StatusBadge>
                        </LoanMeta>
                      </LoanCard>
                    ))}
                  </LoansList>
                ) : (
                  <EmptyState>
                    <EmptyStateIcon>📊</EmptyStateIcon>
                    <EmptyStateText>No detailed loan information available</EmptyStateText>
                  </EmptyState>
                )}
              </Section>
            </DrawerContent>
          </DrawerContainer>
        </>
      )}
    </AnimatePresence>
  );
};

