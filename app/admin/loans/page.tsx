'use client';

import { DashboardLayout } from '@/components/layout';
import { DataTable, StatusBadge } from '@/components/dashboard';
import { Button, Input } from '@/components/ui';
import styled from 'styled-components';
import { FiSearch, FiFilter, FiDownload, FiEye } from 'react-icons/fi';
import { useState } from 'react';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const Title = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
`;

const Actions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
`;

const SearchWrapper = styled.div`
  width: 300px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const Filters = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadiusLg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.small};
  display: flex;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  background: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.secondary};
  color: ${props => props.$active ? props.theme.colors.white : props.theme.colors.text};
  
  &:hover {
    background: ${props => props.$active ? props.theme.colors.primaryHover : props.theme.colors.border};
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadiusLg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.small};
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
`;

export default function LoansPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data - will be replaced with real data from Supabase
  const mockLoans = [
    {
      id: 'L001',
      businessName: 'Tech Innovations Ltd',
      brokerName: 'John Smith',
      amount: '$250,000',
      status: 'approved' as const,
      requestDate: '2024-01-15',
      loanType: 'Equipment Financing',
      term: '36 months',
    },
    {
      id: 'L002',
      businessName: 'Green Energy Solutions',
      brokerName: 'Sarah Johnson',
      amount: '$500,000',
      status: 'under_review' as const,
      requestDate: '2024-01-18',
      loanType: 'Working Capital',
      term: '24 months',
    },
    {
      id: 'L003',
      businessName: 'Urban Restaurant Group',
      brokerName: 'Michael Brown',
      amount: '$150,000',
      status: 'pending' as const,
      requestDate: '2024-01-20',
      loanType: 'Business Acquisition',
      term: '60 months',
    },
    {
      id: 'L004',
      businessName: 'Construction Pro Inc',
      brokerName: 'Emily Davis',
      amount: '$750,000',
      status: 'approved' as const,
      requestDate: '2024-01-12',
      loanType: 'Real Estate',
      term: '120 months',
    },
    {
      id: 'L005',
      businessName: 'Digital Marketing Hub',
      brokerName: 'John Smith',
      amount: '$100,000',
      status: 'rejected' as const,
      requestDate: '2024-01-10',
      loanType: 'Working Capital',
      term: '12 months',
    },
  ];

  const columns = [
    {
      key: 'id',
      label: 'Loan ID',
      width: '100px',
    },
    {
      key: 'businessName',
      label: 'Business Name',
    },
    {
      key: 'brokerName',
      label: 'Broker',
    },
    {
      key: 'amount',
      label: 'Amount',
      width: '120px',
    },
    {
      key: 'loanType',
      label: 'Type',
    },
    {
      key: 'term',
      label: 'Term',
      width: '100px',
    },
    {
      key: 'status',
      label: 'Status',
      width: '130px',
      render: (value: any) => <StatusBadge status={value} />,
    },
    {
      key: 'requestDate',
      label: 'Request Date',
      width: '130px',
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '100px',
      render: (_: any, row: any) => (
        <Button size="sm" variant="outline" onClick={(e) => {
          e.stopPropagation();
          console.log('View loan:', row.id);
        }}>
          <FiEye /> View
        </Button>
      ),
    },
  ];

  const filteredLoans = mockLoans.filter(loan => {
    const matchesSearch = loan.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.brokerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || loan.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: mockLoans.length,
    approved: mockLoans.filter(l => l.status === 'approved').length,
    pending: mockLoans.filter(l => l.status === 'pending').length,
    underReview: mockLoans.filter(l => l.status === 'under_review').length,
  };

  return (
    <DashboardLayout
      role="admin"
      pageTitle="All Loans"
      userName="Admin User"
      userRole="admin"
    >
      <Header>
        <Title>Loan Applications</Title>
        <Actions>
          <SearchWrapper>
            <Input
              placeholder="Search loans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchWrapper>
          <Button variant="outline">
            <FiFilter /> Filters
          </Button>
          <Button variant="secondary">
            <FiDownload /> Export
          </Button>
        </Actions>
      </Header>

      <Stats>
        <StatCard>
          <StatLabel>Total Loans</StatLabel>
          <StatValue>{stats.total}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Approved</StatLabel>
          <StatValue>{stats.approved}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Under Review</StatLabel>
          <StatValue>{stats.underReview}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Pending</StatLabel>
          <StatValue>{stats.pending}</StatValue>
        </StatCard>
      </Stats>

      <Filters>
        <FilterButton
          $active={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
        >
          All ({mockLoans.length})
        </FilterButton>
        <FilterButton
          $active={activeFilter === 'approved'}
          onClick={() => setActiveFilter('approved')}
        >
          Approved ({stats.approved})
        </FilterButton>
        <FilterButton
          $active={activeFilter === 'under_review'}
          onClick={() => setActiveFilter('under_review')}
        >
          Under Review ({stats.underReview})
        </FilterButton>
        <FilterButton
          $active={activeFilter === 'pending'}
          onClick={() => setActiveFilter('pending')}
        >
          Pending ({stats.pending})
        </FilterButton>
      </Filters>

      <DataTable
        columns={columns}
        data={filteredLoans}
        onRowClick={(row) => console.log('Clicked loan:', row)}
      />
    </DashboardLayout>
  );
}

