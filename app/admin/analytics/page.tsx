'use client';

import { DashboardLayout } from '@/components/layout';
import { Card } from '@/components/ui';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FiTrendingUp, FiDollarSign, FiUsers, FiActivity } from 'react-icons/fi';

const Header = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.md};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const MetricCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadiusLg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.small};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const IconWrapper = styled.div<{ $color: string }>`
  width: 56px;
  height: 56px;
  border-radius: ${props => props.theme.borderRadius};
  background: ${props => props.$color}15;
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: ${props => props.theme.fontSizes['2xl']};
  }
`;

const MetricInfo = styled.div`
  flex: 1;
`;

const MetricLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 4px;
`;

const MetricValue = styled.div`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
`;

const MetricChange = styled.div<{ $positive: boolean }>`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.$positive ? props.theme.colors.success : props.theme.colors.error};
  margin-top: 4px;
`;

const ChartSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ChartTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ChartCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadiusLg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.small};
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export default function AnalyticsPage() {
  // Mock data for charts
  const loanTrendData = [
    { month: 'Jan', loans: 12, amount: 1.2 },
    { month: 'Feb', loans: 19, amount: 1.8 },
    { month: 'Mar', loans: 15, amount: 1.5 },
    { month: 'Apr', loans: 23, amount: 2.3 },
    { month: 'May', loans: 28, amount: 2.8 },
    { month: 'Jun', loans: 34, amount: 3.4 },
  ];

  const loanStatusData = [
    { name: 'Approved', value: 156, color: '#4CAF50' },
    { name: 'Under Review', value: 45, color: '#1A73E8' },
    { name: 'Pending', value: 23, color: '#FF9800' },
    { name: 'Rejected', value: 10, color: '#F44336' },
  ];

  const brokerPerformanceData = [
    { name: 'John Smith', loans: 24, commission: 48 },
    { name: 'Sarah Johnson', loans: 31, commission: 72 },
    { name: 'Michael Brown', loans: 19, commission: 37.5 },
    { name: 'Emily Davis', loans: 28, commission: 58.5 },
    { name: 'Robert Wilson', loans: 8, commission: 16.5 },
  ];

  const loanTypeData = [
    { type: 'Working Capital', count: 45 },
    { type: 'Equipment', count: 38 },
    { type: 'Real Estate', count: 32 },
    { type: 'Business Acquisition', count: 28 },
    { type: 'Other', count: 22 },
  ];

  return (
    <DashboardLayout
      role="admin"
      pageTitle="Analytics"
      userName="Admin User"
      userRole="admin"
    >
      <Header>
        <Title>Analytics Dashboard</Title>
        <Subtitle>Comprehensive insights into your loan platform performance</Subtitle>
      </Header>

      <Grid>
        <MetricCard>
          <IconWrapper $color="#1A73E8">
            <FiTrendingUp />
          </IconWrapper>
          <MetricInfo>
            <MetricLabel>Monthly Growth</MetricLabel>
            <MetricValue>+23.5%</MetricValue>
            <MetricChange $positive={true}>↑ 4.2% from last month</MetricChange>
          </MetricInfo>
        </MetricCard>

        <MetricCard>
          <IconWrapper $color="#4CAF50">
            <FiDollarSign />
          </IconWrapper>
          <MetricInfo>
            <MetricLabel>Total Revenue</MetricLabel>
            <MetricValue>$12.5M</MetricValue>
            <MetricChange $positive={true}>↑ $1.8M from last month</MetricChange>
          </MetricInfo>
        </MetricCard>

        <MetricCard>
          <IconWrapper $color="#FF9800">
            <FiUsers />
          </IconWrapper>
          <MetricInfo>
            <MetricLabel>Active Brokers</MetricLabel>
            <MetricValue>48</MetricValue>
            <MetricChange $positive={true}>↑ 6 new this month</MetricChange>
          </MetricInfo>
        </MetricCard>

        <MetricCard>
          <IconWrapper $color="#9C27B0">
            <FiActivity />
          </IconWrapper>
          <MetricInfo>
            <MetricLabel>Avg. Processing Time</MetricLabel>
            <MetricValue>4.2 days</MetricValue>
            <MetricChange $positive={true}>↓ 0.8 days faster</MetricChange>
          </MetricInfo>
        </MetricCard>
      </Grid>

      <ChartSection>
        <ChartTitle>Loan Applications & Amount Trends</ChartTitle>
        <ChartCard>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={loanTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="loans"
                stroke="#1A73E8"
                strokeWidth={2}
                name="Number of Loans"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="amount"
                stroke="#4CAF50"
                strokeWidth={2}
                name="Amount ($M)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartSection>

      <TwoColumnGrid>
        <ChartSection>
          <ChartTitle>Loan Status Distribution</ChartTitle>
          <ChartCard>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={loanStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {loanStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </ChartSection>

        <ChartSection>
          <ChartTitle>Loan Types Distribution</ChartTitle>
          <ChartCard>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={loanTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1A73E8" name="Applications" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </ChartSection>
      </TwoColumnGrid>

      <ChartSection>
        <ChartTitle>Broker Performance</ChartTitle>
        <ChartCard>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={brokerPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="loans" fill="#1A73E8" name="Total Loans" />
              <Bar yAxisId="right" dataKey="commission" fill="#4CAF50" name="Commission ($K)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartSection>
    </DashboardLayout>
  );
}

