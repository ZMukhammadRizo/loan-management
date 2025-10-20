'use client';

import { DashboardLayout } from '@/components/layout';
import { DataTable, StatusBadge } from '@/components/dashboard';
import { Button, Input } from '@/components/ui';
import styled from 'styled-components';
import { FiSearch, FiCheck, FiX, FiArchive, FiEye, FiDollarSign } from 'react-icons/fi';
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

const Tabs = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.lg};
  border-bottom: 2px solid ${props => props.theme.colors.border};
`;

const Tab = styled.button<{ $isActive: boolean }>`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.$isActive ? props.theme.colors.primary : props.theme.colors.textLight};
  background: transparent;
  border: none;
  border-bottom: 3px solid ${props => props.$isActive ? props.theme.colors.primary : 'transparent'};
  margin-bottom: -2px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
`;

const AmountBadge = styled.span<{ $amount: number }>`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => {
    if (props.$amount >= 500000) return '#4CAF50';
    if (props.$amount >= 250000) return '#1A73E8';
    return '#FF9800';
  }};
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadiusLg};
  padding: ${props => props.theme.spacing.xl};
  max-width: 500px;
  width: 90%;
  box-shadow: ${props => props.theme.shadows.large};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ModalTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${props => props.theme.fontSizes.xl};
  cursor: pointer;
  color: ${props => props.theme.colors.textLight};
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px 16px;
  font-size: ${props => props.theme.fontSizes.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${props => props.theme.spacing.lg};
`;

const BorrowerInfo = styled.div`
  background: ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.xs} 0;
  font-size: ${props => props.theme.fontSizes.sm};
`;

const InfoLabel = styled.span`
  color: ${props => props.theme.colors.textLight};
`;

const InfoValue = styled.span`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
`;

const DetailSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled.h4`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  background: ${props => props.theme.colors.secondary};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius};
`;

const DetailLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const DetailValue = styled.div`
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
`;

const StatusBadgeStyled = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  background: ${props => {
    if (props.$status === 'pending_confirmation') return '#FFF3E0';
    if (props.$status === 'active') return '#E8F5E9';
    return '#F5F5F5';
  }};
  color: ${props => {
    if (props.$status === 'pending_confirmation') return '#F57C00';
    if (props.$status === 'active') return '#2E7D32';
    return '#757575';
  }};
`;

type TabType = 'pending' | 'active' | 'archived';

interface Borrower {
  id: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  requestedAmount: number;
  approvedAmount: number;
  loanType: string;
  status: 'pending_confirmation' | 'active' | 'archived';
  approvedDate: string;
  confirmedDate?: string;
  archiveReason?: string;
  estimatedCommission: string;
}

export default function BorrowersPage() {
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedBorrower, setSelectedBorrower] = useState<Borrower | null>(null);
  const [archiveReason, setArchiveReason] = useState('');

  // Mock data - will be replaced with real data from Supabase
  const mockBorrowers: Borrower[] = [
    {
      id: 'BR001',
      businessName: 'Tech Innovations Ltd',
      contactPerson: 'Michael Chen',
      email: 'michael@techinnovations.com',
      phone: '+1 (555) 111-2222',
      requestedAmount: 250000,
      approvedAmount: 250000,
      loanType: 'Equipment Financing',
      status: 'pending_confirmation',
      approvedDate: '2024-01-15',
      estimatedCommission: '$3,750',
    },
    {
      id: 'BR002',
      businessName: 'Green Energy Solutions',
      contactPerson: 'Lisa Anderson',
      email: 'lisa@greenenergy.com',
      phone: '+1 (555) 222-3333',
      requestedAmount: 500000,
      approvedAmount: 480000,
      loanType: 'Working Capital',
      status: 'active',
      approvedDate: '2024-01-10',
      confirmedDate: '2024-01-18',
      estimatedCommission: '$7,200',
    },
    {
      id: 'BR003',
      businessName: 'Urban Restaurant Group',
      contactPerson: 'David Martinez',
      email: 'david@urbanrestaurants.com',
      phone: '+1 (555) 333-4444',
      requestedAmount: 150000,
      approvedAmount: 150000,
      loanType: 'Business Acquisition',
      status: 'archived',
      approvedDate: '2024-01-12',
      archiveReason: 'Borrower decided not to proceed with the loan after reviewing terms. They mentioned finding alternative financing through a family member.',
      estimatedCommission: '$0',
    },
    {
      id: 'BR004',
      businessName: 'Fitness Pro Centers',
      contactPerson: 'Robert Taylor',
      email: 'robert@fitnesspro.com',
      phone: '+1 (555) 555-6666',
      requestedAmount: 300000,
      approvedAmount: 300000,
      loanType: 'Real Estate',
      status: 'pending_confirmation',
      approvedDate: '2024-01-20',
      estimatedCommission: '$4,500',
    },
    {
      id: 'BR005',
      businessName: 'Digital Media Co',
      contactPerson: 'Sarah Williams',
      email: 'sarah@digitalmedia.com',
      phone: '+1 (555) 666-7777',
      requestedAmount: 200000,
      approvedAmount: 200000,
      loanType: 'Working Capital',
      status: 'active',
      approvedDate: '2024-01-08',
      confirmedDate: '2024-01-16',
      estimatedCommission: '$3,000',
    },
  ];

  const pendingBorrowers = mockBorrowers.filter(b => b.status === 'pending_confirmation');
  const activeBorrowers = mockBorrowers.filter(b => b.status === 'active');
  const archivedBorrowers = mockBorrowers.filter(b => b.status === 'archived');

  const getCurrentData = () => {
    let data: Borrower[] = [];
    if (activeTab === 'pending') data = pendingBorrowers;
    else if (activeTab === 'active') data = activeBorrowers;
    else data = archivedBorrowers;

    return data.filter(b =>
      b.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleViewBorrower = (borrower: Borrower) => {
    setSelectedBorrower(borrower);
    setIsViewModalOpen(true);
  };

  const handleConfirmLoan = (borrower: Borrower) => {
    console.log('Confirming loan for:', borrower.id);
    // TODO: Update status to 'active' in Supabase
    alert(`Confirmed: ${borrower.businessName} received their loan!`);
    setIsViewModalOpen(false);
  };

  const handleOpenArchive = (borrower: Borrower) => {
    if (isViewModalOpen) {
      setIsViewModalOpen(false);
    }
    setSelectedBorrower(borrower);
    setArchiveReason('');
    setIsArchiveModalOpen(true);
  };

  const handleArchive = () => {
    if (!archiveReason.trim()) {
      alert('Please provide a reason for archiving');
      return;
    }
    console.log('Archiving borrower:', selectedBorrower?.id, 'Reason:', archiveReason);
    // TODO: Update status to 'archived' with reason in Supabase
    setIsArchiveModalOpen(false);
    setSelectedBorrower(null);
    setArchiveReason('');
    alert('Borrower archived successfully');
  };

  const pendingColumns = [
    {
      key: 'id',
      label: 'ID',
      width: '100px',
    },
    {
      key: 'businessName',
      label: 'Business Name',
    },
    {
      key: 'contactPerson',
      label: 'Contact',
    },
    {
      key: 'approvedAmount',
      label: 'Approved Amount',
      width: '140px',
      render: (value: number) => (
        <AmountBadge $amount={value}>
          ${(value / 1000).toFixed(0)}K
        </AmountBadge>
      ),
    },
    {
      key: 'loanType',
      label: 'Type',
    },
    {
      key: 'approvedDate',
      label: 'Approved',
      width: '120px',
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '180px',
      render: (_: any, row: Borrower) => (
        <ActionButtons onClick={(e) => e.stopPropagation()}>
          <Button 
            size="sm" 
            variant="primary"
            onClick={() => handleConfirmLoan(row)}
          >
            <FiCheck /> Confirm
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleOpenArchive(row)}
          >
            <FiX /> Decline
          </Button>
        </ActionButtons>
      ),
    },
  ];

  const activeColumns = [
    {
      key: 'id',
      label: 'ID',
      width: '100px',
    },
    {
      key: 'businessName',
      label: 'Business Name',
    },
    {
      key: 'contactPerson',
      label: 'Contact',
    },
    {
      key: 'approvedAmount',
      label: 'Loan Amount',
      width: '130px',
      render: (value: number) => (
        <AmountBadge $amount={value}>
          ${(value / 1000).toFixed(0)}K
        </AmountBadge>
      ),
    },
    {
      key: 'estimatedCommission',
      label: 'Commission',
      width: '120px',
    },
    {
      key: 'confirmedDate',
      label: 'Confirmed',
      width: '120px',
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '120px',
      render: (_: any, row: Borrower) => (
        <ActionButtons onClick={(e) => e.stopPropagation()}>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleViewBorrower(row)}
          >
            <FiEye /> View
          </Button>
        </ActionButtons>
      ),
    },
  ];

  const archivedColumns = [
    {
      key: 'id',
      label: 'ID',
      width: '100px',
    },
    {
      key: 'businessName',
      label: 'Business Name',
    },
    {
      key: 'contactPerson',
      label: 'Contact',
    },
    {
      key: 'requestedAmount',
      label: 'Requested',
      width: '120px',
      render: (value: number) => `$${(value / 1000).toFixed(0)}K`,
    },
    {
      key: 'approvedDate',
      label: 'Date',
      width: '120px',
    },
    {
      key: 'archiveReason',
      label: 'Reason',
      render: (value: string) => (
        <span title={value}>
          {value?.substring(0, 50)}{value?.length > 50 ? '...' : ''}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '120px',
      render: (_: any, row: Borrower) => (
        <ActionButtons onClick={(e) => e.stopPropagation()}>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleViewBorrower(row)}
          >
            <FiEye /> View
          </Button>
        </ActionButtons>
      ),
    },
  ];

  const getColumnsForTab = () => {
    if (activeTab === 'pending') return pendingColumns;
    if (activeTab === 'active') return activeColumns;
    return archivedColumns;
  };

  const stats = {
    pending: pendingBorrowers.length,
    active: activeBorrowers.length,
    archived: archivedBorrowers.length,
    totalCommission: activeBorrowers
      .reduce((sum, b) => sum + parseFloat(b.estimatedCommission.replace(/[$,]/g, '')), 0),
  };

  return (
    <DashboardLayout
      role="broker"
      pageTitle="Borrowers"
      userName="John Broker"
      userRole="broker"
    >
      <Header>
        <Title>Borrowers Management</Title>
        <SearchWrapper>
          <Input
            placeholder="Search borrowers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>
      </Header>

      <Stats>
        <StatCard>
          <StatLabel>Pending Confirmation</StatLabel>
          <StatValue>{stats.pending}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Active Borrowers</StatLabel>
          <StatValue>{stats.active}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Archived</StatLabel>
          <StatValue>{stats.archived}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Total Commission</StatLabel>
          <StatValue>${(stats.totalCommission / 1000).toFixed(1)}K</StatValue>
        </StatCard>
      </Stats>

      <Tabs>
        <Tab 
          $isActive={activeTab === 'pending'}
          onClick={() => setActiveTab('pending')}
        >
          Pending Confirmation ({stats.pending})
        </Tab>
        <Tab 
          $isActive={activeTab === 'active'}
          onClick={() => setActiveTab('active')}
        >
          Active Borrowers ({stats.active})
        </Tab>
        <Tab 
          $isActive={activeTab === 'archived'}
          onClick={() => setActiveTab('archived')}
        >
          Archived ({stats.archived})
        </Tab>
      </Tabs>

      <DataTable
        columns={getColumnsForTab()}
        data={getCurrentData()}
        onRowClick={(row) => handleViewBorrower(row)}
      />

      {/* View Borrower Details Modal */}
      <Modal $isOpen={isViewModalOpen}>
        <ModalContent style={{ maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto' }}>
          <ModalHeader style={{ paddingBottom: '16px', borderBottom: `2px solid #E5E7EB` }}>
            <ModalTitle>Borrower Details</ModalTitle>
            <CloseButton onClick={() => setIsViewModalOpen(false)}>
              <FiX />
            </CloseButton>
          </ModalHeader>

          {selectedBorrower && (
            <>
              <DetailSection>
                <SectionTitle>Business Information</SectionTitle>
                <DetailGrid>
                  <DetailItem>
                    <DetailLabel>Borrower ID</DetailLabel>
                    <DetailValue>{selectedBorrower.id}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Business Name</DetailLabel>
                    <DetailValue>{selectedBorrower.businessName}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Contact Person</DetailLabel>
                    <DetailValue>{selectedBorrower.contactPerson}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Loan Type</DetailLabel>
                    <DetailValue>{selectedBorrower.loanType}</DetailValue>
                  </DetailItem>
                </DetailGrid>
              </DetailSection>

              <DetailSection>
                <SectionTitle>Contact Information</SectionTitle>
                <DetailGrid>
                  <DetailItem>
                    <DetailLabel>Email</DetailLabel>
                    <DetailValue>{selectedBorrower.email}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Phone</DetailLabel>
                    <DetailValue>{selectedBorrower.phone}</DetailValue>
                  </DetailItem>
                </DetailGrid>
              </DetailSection>

              <DetailSection>
                <SectionTitle>Loan Details</SectionTitle>
                <DetailGrid>
                  <DetailItem>
                    <DetailLabel>Requested Amount</DetailLabel>
                    <DetailValue>
                      <AmountBadge $amount={selectedBorrower.requestedAmount}>
                        ${selectedBorrower.requestedAmount.toLocaleString()}
                      </AmountBadge>
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Approved Amount</DetailLabel>
                    <DetailValue>
                      <AmountBadge $amount={selectedBorrower.approvedAmount}>
                        ${selectedBorrower.approvedAmount.toLocaleString()}
                      </AmountBadge>
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Estimated Commission</DetailLabel>
                    <DetailValue>{selectedBorrower.estimatedCommission}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Status</DetailLabel>
                    <DetailValue>
                      <StatusBadgeStyled $status={selectedBorrower.status}>
                        {selectedBorrower.status === 'pending_confirmation' && 'Pending Confirmation'}
                        {selectedBorrower.status === 'active' && 'Active'}
                        {selectedBorrower.status === 'archived' && 'Archived'}
                      </StatusBadgeStyled>
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Approved Date</DetailLabel>
                    <DetailValue>{selectedBorrower.approvedDate}</DetailValue>
                  </DetailItem>
                  {selectedBorrower.confirmedDate && (
                    <DetailItem>
                      <DetailLabel>Confirmed Date</DetailLabel>
                      <DetailValue>{selectedBorrower.confirmedDate}</DetailValue>
                    </DetailItem>
                  )}
                </DetailGrid>
              </DetailSection>

              {selectedBorrower.archiveReason && (
                <DetailSection>
                  <SectionTitle>Archive Information</SectionTitle>
                  <DetailItem>
                    <DetailLabel>Archive Reason</DetailLabel>
                    <DetailValue style={{ whiteSpace: 'pre-wrap', marginTop: '8px' }}>
                      {selectedBorrower.archiveReason}
                    </DetailValue>
                  </DetailItem>
                </DetailSection>
              )}

              {selectedBorrower.status === 'pending_confirmation' && (
                <ModalActions style={{ marginTop: '24px', paddingTop: '20px', borderTop: '2px solid #E5E7EB' }}>
                  <Button 
                    variant="outline"
                    onClick={() => handleOpenArchive(selectedBorrower)}
                  >
                    <FiX /> Decline & Archive
                  </Button>
                  <Button 
                    variant="primary"
                    onClick={() => handleConfirmLoan(selectedBorrower)}
                  >
                    <FiCheck /> Confirm Loan Received
                  </Button>
                </ModalActions>
              )}
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Archive Modal */}
      <Modal $isOpen={isArchiveModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Archive Borrower</ModalTitle>
            <CloseButton onClick={() => setIsArchiveModalOpen(false)}>
              ×
            </CloseButton>
          </ModalHeader>

          {selectedBorrower && (
            <BorrowerInfo>
              <InfoRow>
                <InfoLabel>Business:</InfoLabel>
                <InfoValue>{selectedBorrower.businessName}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Contact:</InfoLabel>
                <InfoValue>{selectedBorrower.contactPerson}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Approved Amount:</InfoLabel>
                <InfoValue>${selectedBorrower.approvedAmount.toLocaleString()}</InfoValue>
              </InfoRow>
            </BorrowerInfo>
          )}

          <label>
            <StatLabel style={{ marginBottom: '8px', display: 'block' }}>
              Reason for Archiving (Required)
            </StatLabel>
            <TextArea
              placeholder="Please provide a detailed reason why this borrower is being archived. For example: borrower found alternative financing, decided not to proceed, etc."
              value={archiveReason}
              onChange={(e) => setArchiveReason(e.target.value)}
            />
          </label>

          <ModalActions>
            <Button 
              variant="outline"
              onClick={() => setIsArchiveModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="primary"
              onClick={handleArchive}
            >
              <FiArchive /> Archive
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}

