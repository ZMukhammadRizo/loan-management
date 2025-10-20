'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { KPICard, InteractiveUSMap, StateDetailsDrawer } from '@/components/dashboard';
import { mockAdminStateData, mockLoanDetailsByState, StateData, LoanDetail } from '@/lib/mockData';
import styled from 'styled-components';
import { FiDollarSign, FiCheckCircle, FiUsers, FiTrendingUp } from 'react-icons/fi';

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

const WelcomeCard = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.primaryHover} 100%);
  border-radius: ${props => props.theme.borderRadiusLg};
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const WelcomeTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['3xl']};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const WelcomeText = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  opacity: 0.9;
`;

const RecentActivityList = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadiusLg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.small};
`;

const ActivityItem = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: background 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const ActivityIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$color}15;
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 4px;
`;

const ActivityDescription = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 4px;
`;

const ActivityTime = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.textLight};
`;

export default function AdminDashboard() {
  // State for the drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<{
    stateId: string;
    stateData: StateData;
  } | null>(null);

  // Mock data - will be replaced with real data from Supabase later
  const kpiData = {
    totalLoans: {
      value: '234',
      trend: { value: 12, isPositive: true },
    },
    approvedLoans: {
      value: '156',
      trend: { value: 8, isPositive: true },
    },
    activeBrokers: {
      value: '48',
      trend: { value: 15, isPositive: true },
    },
    totalAmount: {
      value: '$12.5M',
      trend: { value: 23, isPositive: true },
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

  return (
    <DashboardLayout
      role="admin"
      pageTitle="Dashboard"
      userName="Admin User"
      userRole="admin"
    >
      <WelcomeCard>
        <WelcomeTitle>Welcome back, Admin! 👋</WelcomeTitle>
        <WelcomeText>
          Here's what's happening with your loan platform today.
        </WelcomeText>
      </WelcomeCard>

      <Section>
        <SectionTitle>Key Metrics</SectionTitle>
        <Grid>
          <KPICard
            title="Total Loans"
            value={kpiData.totalLoans.value}
            icon={<FiDollarSign />}
            trend={kpiData.totalLoans.trend}
            color="#1A73E8"
          />
          <KPICard
            title="Approved Loans"
            value={kpiData.approvedLoans.value}
            icon={<FiCheckCircle />}
            trend={kpiData.approvedLoans.trend}
            color="#4CAF50"
          />
          <KPICard
            title="Active Brokers"
            value={kpiData.activeBrokers.value}
            icon={<FiUsers />}
            trend={kpiData.activeBrokers.trend}
            color="#FF9800"
          />
          <KPICard
            title="Total Amount"
            value={kpiData.totalAmount.value}
            icon={<FiTrendingUp />}
            trend={kpiData.totalAmount.trend}
            color="#9C27B0"
          />
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Loan Distribution by State</SectionTitle>
        <InteractiveUSMap
          role="admin"
          stateData={mockAdminStateData}
          loanDetails={mockLoanDetailsByState}
          onStateClick={handleStateClick}
        />
      </Section>

      <Section>
        <SectionTitle>Recent Activity</SectionTitle>
        <RecentActivityList>
          <ActivityItem>
            <ActivityIcon $color="#4CAF50">
              <FiCheckCircle />
            </ActivityIcon>
            <ActivityContent>
              <ActivityTitle>Loan Approved</ActivityTitle>
              <ActivityDescription>
                Tech Innovations Ltd - $250,000 Equipment Financing
              </ActivityDescription>
              <ActivityTime>2 hours ago</ActivityTime>
            </ActivityContent>
          </ActivityItem>
          
          <ActivityItem>
            <ActivityIcon $color="#1A73E8">
              <FiDollarSign />
            </ActivityIcon>
            <ActivityContent>
              <ActivityTitle>New Loan Application</ActivityTitle>
              <ActivityDescription>
                Green Energy Solutions - $500,000 Working Capital
              </ActivityDescription>
              <ActivityTime>4 hours ago</ActivityTime>
            </ActivityContent>
          </ActivityItem>
          
          <ActivityItem>
            <ActivityIcon $color="#FF9800">
              <FiUsers />
            </ActivityIcon>
            <ActivityContent>
              <ActivityTitle>New Broker Registered</ActivityTitle>
              <ActivityDescription>
                Jennifer Martinez joined the platform
              </ActivityDescription>
              <ActivityTime>Yesterday</ActivityTime>
            </ActivityContent>
          </ActivityItem>
          
          <ActivityItem>
            <ActivityIcon $color="#4CAF50">
              <FiCheckCircle />
            </ActivityIcon>
            <ActivityContent>
              <ActivityTitle>Loan Approved</ActivityTitle>
              <ActivityDescription>
                Construction Pro Inc - $750,000 Real Estate Loan
              </ActivityDescription>
              <ActivityTime>2 days ago</ActivityTime>
            </ActivityContent>
          </ActivityItem>
          
          <ActivityItem>
            <ActivityIcon $color="#1A73E8">
              <FiTrendingUp />
            </ActivityIcon>
            <ActivityContent>
              <ActivityTitle>Monthly Target Achieved</ActivityTitle>
              <ActivityDescription>
                Exceeded monthly loan approval target by 15%
              </ActivityDescription>
              <ActivityTime>3 days ago</ActivityTime>
            </ActivityContent>
          </ActivityItem>
        </RecentActivityList>
      </Section>

      <StateDetailsDrawer
        isOpen={drawerOpen}
        onClose={handleDrawerClose}
        stateId={selectedState?.stateId || null}
        stateData={selectedState?.stateData || null}
        loanDetails={selectedState ? (mockLoanDetailsByState[selectedState.stateId] || []) : []}
        role="admin"
      />
    </DashboardLayout>
  );
}

