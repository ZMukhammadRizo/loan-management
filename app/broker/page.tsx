'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { KPICard, InteractiveUSMap, SimpleUSMap, StateDetailsDrawer } from '@/components/dashboard';
import { mockBrokerStateData, mockLoanDetailsByState, StateData } from '@/lib/mockData';
import { Card } from '@/components/ui';
import styled from 'styled-components';
import { FiUsers, FiDollarSign, FiClock, FiCopy } from 'react-icons/fi';
import { useToast } from '@/components/ui';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ReferralCard = styled(Card)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}15 0%, ${props => props.theme.colors.accent} 100%);
`;

const ReferralTitle = styled.h4`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ReferralText = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ReferralLinkContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: center;
`;

const ReferralLink = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.white};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.fontSizes.sm};
  font-family: monospace;
  color: ${props => props.theme.colors.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CopyButton = styled.button`
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryHover};
    transform: translateY(-2px);
  }

  svg {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const MapCard = styled(Card)`
  background: ${props => props.theme.colors.white};
`;

export default function BrokerDashboard() {
  const { showToast } = useToast();
  
  // State for the drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<{
    stateId: string;
    stateData: StateData;
  } | null>(null);
  
  // Mock data
  const referralCode = 'BROKER_123';
  const referralLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/apply?ref=${referralCode}`;
  
  const kpiData = {
    totalLeads: {
      value: '28',
      trend: { value: 18, isPositive: true },
    },
    pendingLoans: {
      value: '12',
      trend: { value: 5, isPositive: true },
    },
    approvedLoans: {
      value: '16',
      trend: { value: 12, isPositive: true },
    },
    estimatedCommission: {
      value: '$4,800',
      trend: { value: 15, isPositive: true },
    },
  };

  const handleStateClick = (stateId: string, stateData: StateData) => {
    setSelectedState({ stateId, stateData });
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedState(null);
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    showToast('Referral link copied to clipboard!', 'success');
  };

  return (
    <DashboardLayout
      role="broker"
      pageTitle="Dashboard"
      userName="John Broker"
      userRole="broker"
    >
      <Section>
        <SectionTitle>Your Referral Link</SectionTitle>
        <ReferralCard padding="lg">
          <ReferralTitle>🎯 Share your unique link</ReferralTitle>
          <ReferralText>
            Share this link with potential borrowers. You'll earn commission on every successful loan!
          </ReferralText>
          <ReferralLinkContainer>
            <ReferralLink>{referralLink}</ReferralLink>
            <CopyButton onClick={copyReferralLink}>
              <FiCopy />
              Copy
            </CopyButton>
          </ReferralLinkContainer>
        </ReferralCard>
      </Section>

      <Section>
        <SectionTitle>Performance Metrics</SectionTitle>
        <Grid>
          <KPICard
            title="Total Leads"
            value={kpiData.totalLeads.value}
            icon={<FiUsers />}
            trend={kpiData.totalLeads.trend}
            color="#1A73E8"
          />
          <KPICard
            title="Pending Loans"
            value={kpiData.pendingLoans.value}
            icon={<FiClock />}
            trend={kpiData.pendingLoans.trend}
            color="#FF9800"
          />
          <KPICard
            title="Approved Loans"
            value={kpiData.approvedLoans.value}
            icon={<FiDollarSign />}
            trend={kpiData.approvedLoans.trend}
            color="#4CAF50"
          />
          <KPICard
            title="Est. Commission"
            value={kpiData.estimatedCommission.value}
            icon={<FiDollarSign />}
            trend={kpiData.estimatedCommission.trend}
            color="#9C27B0"
          />
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Your Portfolio by State</SectionTitle>
        <InteractiveUSMap
          role="broker"
          stateData={mockBrokerStateData}
          loanDetails={mockLoanDetailsByState}
          onStateClick={handleStateClick}
        />
      </Section>

      <Section>
        <SectionTitle>Recent Leads</SectionTitle>
        <p style={{ color: '#6B7280' }}>Leads table will be added here with real data...</p>
      </Section>

      <StateDetailsDrawer
        isOpen={drawerOpen}
        onClose={handleDrawerClose}
        stateId={selectedState?.stateId || null}
        stateData={selectedState?.stateData || null}
        loanDetails={selectedState ? (mockLoanDetailsByState[selectedState.stateId] || []) : []}
        role="broker"
      />
    </DashboardLayout>
  );
}

