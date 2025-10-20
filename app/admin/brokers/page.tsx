'use client';

import { DashboardLayout } from '@/components/layout';
import { DataTable, StatusBadge } from '@/components/dashboard';
import { Button, Input, Card } from '@/components/ui';
import styled from 'styled-components';
import { FiSearch, FiUserPlus, FiMail, FiPhone, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
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

const BrokerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const BrokerDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const BrokerName = styled.div`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
`;

const BrokerContact = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.textLight};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
`;

export default function BrokersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - will be replaced with real data from Supabase
  const mockBrokers = [
    {
      id: 'B001',
      name: 'John Smith',
      email: 'john.smith@brokers.com',
      phone: '+1 (555) 123-4567',
      status: 'active' as const,
      totalLoans: 24,
      approvedLoans: 18,
      totalAmount: '$3.2M',
      joinDate: '2023-06-15',
      commission: '$48,000',
    },
    {
      id: 'B002',
      name: 'Sarah Johnson',
      email: 'sarah.j@brokers.com',
      phone: '+1 (555) 234-5678',
      status: 'active' as const,
      totalLoans: 31,
      approvedLoans: 25,
      totalAmount: '$4.8M',
      joinDate: '2023-04-20',
      commission: '$72,000',
    },
    {
      id: 'B003',
      name: 'Michael Brown',
      email: 'michael.b@brokers.com',
      phone: '+1 (555) 345-6789',
      status: 'active' as const,
      totalLoans: 19,
      approvedLoans: 14,
      totalAmount: '$2.5M',
      joinDate: '2023-08-10',
      commission: '$37,500',
    },
    {
      id: 'B004',
      name: 'Emily Davis',
      email: 'emily.d@brokers.com',
      phone: '+1 (555) 456-7890',
      status: 'active' as const,
      totalLoans: 28,
      approvedLoans: 22,
      totalAmount: '$3.9M',
      joinDate: '2023-05-05',
      commission: '$58,500',
    },
    {
      id: 'B005',
      name: 'Robert Wilson',
      email: 'robert.w@brokers.com',
      phone: '+1 (555) 567-8901',
      status: 'inactive' as const,
      totalLoans: 8,
      approvedLoans: 5,
      totalAmount: '$1.1M',
      joinDate: '2023-11-20',
      commission: '$16,500',
    },
  ];

  const columns = [
    {
      key: 'broker',
      label: 'Broker',
      render: (_: any, row: any) => (
        <BrokerInfo>
          <Avatar>{row.name.split(' ').map((n: string) => n[0]).join('')}</Avatar>
          <BrokerDetails>
            <BrokerName>{row.name}</BrokerName>
            <BrokerContact>
              <FiMail size={12} /> {row.email}
            </BrokerContact>
          </BrokerDetails>
        </BrokerInfo>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (value: string) => (
        <BrokerContact>
          <FiPhone size={12} /> {value}
        </BrokerContact>
      ),
    },
    {
      key: 'totalLoans',
      label: 'Total Loans',
      width: '120px',
    },
    {
      key: 'approvedLoans',
      label: 'Approved',
      width: '100px',
    },
    {
      key: 'totalAmount',
      label: 'Total Amount',
      width: '120px',
    },
    {
      key: 'commission',
      label: 'Commission',
      width: '120px',
    },
    {
      key: 'status',
      label: 'Status',
      width: '100px',
      render: (value: any) => <StatusBadge status={value} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '150px',
      render: (_: any, row: any) => (
        <ActionButtons onClick={(e) => e.stopPropagation()}>
          <Button size="sm" variant="outline" onClick={() => console.log('View:', row.id)}>
            <FiEye />
          </Button>
          <Button size="sm" variant="outline" onClick={() => console.log('Edit:', row.id)}>
            <FiEdit />
          </Button>
          <Button size="sm" variant="danger" onClick={() => console.log('Delete:', row.id)}>
            <FiTrash2 />
          </Button>
        </ActionButtons>
      ),
    },
  ];

  const filteredBrokers = mockBrokers.filter(broker =>
    broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    broker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    broker.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: mockBrokers.length,
    active: mockBrokers.filter(b => b.status === 'active').length,
    totalLoans: mockBrokers.reduce((sum, b) => sum + b.totalLoans, 0),
    totalCommission: mockBrokers.reduce((sum, b) => sum + parseFloat(b.commission.replace(/[$,]/g, '')), 0),
  };

  return (
    <DashboardLayout
      role="admin"
      pageTitle="Brokers"
      userName="Admin User"
      userRole="admin"
    >
      <Header>
        <Title>Broker Management</Title>
        <Actions>
          <SearchWrapper>
            <Input
              placeholder="Search brokers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchWrapper>
          <Button>
            <FiUserPlus /> Add Broker
          </Button>
        </Actions>
      </Header>

      <Stats>
        <StatCard>
          <StatLabel>Total Brokers</StatLabel>
          <StatValue>{stats.total}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Active Brokers</StatLabel>
          <StatValue>{stats.active}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Total Loans</StatLabel>
          <StatValue>{stats.totalLoans}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Total Commission</StatLabel>
          <StatValue>${(stats.totalCommission / 1000).toFixed(0)}K</StatValue>
        </StatCard>
      </Stats>

      <DataTable
        columns={columns}
        data={filteredBrokers}
        onRowClick={(row) => console.log('Clicked broker:', row)}
      />
    </DashboardLayout>
  );
}

