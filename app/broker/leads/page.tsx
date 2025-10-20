'use client';

import { DashboardLayout } from '@/components/layout';
import { DataTable } from '@/components/dashboard';
import { Button, Input } from '@/components/ui';
import styled from 'styled-components';
import { FiSearch, FiEye, FiX, FiCheckCircle, FiArchive } from 'react-icons/fi';
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
  max-width: 700px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${props => props.theme.shadows.large};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 2px solid ${props => props.theme.colors.border};
`;

const ModalTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${props => props.theme.fontSizes['2xl']};
  cursor: pointer;
  color: ${props => props.theme.colors.textLight};
  transition: color 0.2s ease;
  padding: ${props => props.theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.colors.text};
  }
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

const ModalActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${props => props.theme.spacing.xl};
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 2px solid ${props => props.theme.colors.border};
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

const LeadInfo = styled.div`
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

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [archiveReason, setArchiveReason] = useState('');

  // Mock data - will be replaced with real data from Supabase
  const mockLeads = [
    {
      id: 'LD001',
      businessName: 'Tech Innovations Ltd',
      contactPerson: 'Michael Chen',
      email: 'michael@techinnovations.com',
      phone: '+1 (555) 111-2222',
      requestedAmount: 250000,
      loanType: 'Equipment Financing',
      status: 'approved' as const,
      submittedDate: '2024-01-15',
      estimatedCommission: '$3,750',
    },
    {
      id: 'LD002',
      businessName: 'Green Energy Solutions',
      contactPerson: 'Lisa Anderson',
      email: 'lisa@greenenergy.com',
      phone: '+1 (555) 222-3333',
      requestedAmount: 500000,
      loanType: 'Working Capital',
      status: 'under_review' as const,
      submittedDate: '2024-01-18',
      estimatedCommission: '$7,500',
    },
    {
      id: 'LD003',
      businessName: 'Urban Restaurant Group',
      contactPerson: 'David Martinez',
      email: 'david@urbanrestaurants.com',
      phone: '+1 (555) 333-4444',
      requestedAmount: 150000,
      loanType: 'Business Acquisition',
      status: 'pending' as const,
      submittedDate: '2024-01-20',
      estimatedCommission: '$2,250',
    },
    {
      id: 'LD004',
      businessName: 'Digital Marketing Hub',
      contactPerson: 'Jennifer Wong',
      email: 'jennifer@dmhub.com',
      phone: '+1 (555) 444-5555',
      requestedAmount: 100000,
      loanType: 'Working Capital',
      status: 'rejected' as const,
      submittedDate: '2024-01-10',
      estimatedCommission: '$0',
    },
    {
      id: 'LD005',
      businessName: 'Fitness Pro Centers',
      contactPerson: 'Robert Taylor',
      email: 'robert@fitnesspro.com',
      phone: '+1 (555) 555-6666',
      requestedAmount: 300000,
      loanType: 'Real Estate',
      status: 'pending' as const,
      submittedDate: '2024-01-22',
      estimatedCommission: '$4,500',
    },
  ];

  const handleViewLead = (lead: any) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleMoveToBorrowers = () => {
    if (!selectedLead) return;
    console.log('Moving lead to borrowers:', selectedLead.id);
    // TODO: Update lead status to 'pending_confirmation' in borrowers table
    alert(`${selectedLead.businessName} has been moved to Borrowers page (Pending Confirmation)`);
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const handleOpenArchiveFromLead = () => {
    setIsModalOpen(false);
    setArchiveReason('');
    setIsArchiveModalOpen(true);
  };

  const handleArchiveLead = () => {
    if (!archiveReason.trim()) {
      alert('Please provide a reason for archiving');
      return;
    }
    console.log('Archiving lead:', selectedLead?.id, 'Reason:', archiveReason);
    // TODO: Update lead status to 'archived' with reason in Supabase
    setIsArchiveModalOpen(false);
    setSelectedLead(null);
    setArchiveReason('');
    alert('Lead archived successfully');
  };

  const columns = [
    {
      key: 'id',
      label: 'Lead ID',
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
      label: 'Amount',
      width: '120px',
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
      key: 'estimatedCommission',
      label: 'Est. Commission',
      width: '150px',
    },
    {
      key: 'submittedDate',
      label: 'Submitted',
      width: '120px',
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '100px',
      render: (_: any, row: any) => (
        <ActionButtons onClick={(e) => e.stopPropagation()}>
          <Button size="sm" variant="outline" onClick={() => handleViewLead(row)}>
            <FiEye /> View
          </Button>
        </ActionButtons>
      ),
    },
  ];

  const filteredLeads = mockLeads.filter(lead =>
    lead.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: mockLeads.length,
    pending: mockLeads.filter(l => l.status === 'pending').length,
    approved: mockLeads.filter(l => l.status === 'approved').length,
    totalCommission: mockLeads
      .filter(l => l.status === 'approved')
      .reduce((sum, l) => sum + parseFloat(l.estimatedCommission.replace(/[$,]/g, '')), 0),
  };

  return (
    <DashboardLayout
      role="broker"
      pageTitle="My Leads"
      userName="John Broker"
      userRole="broker"
    >
      <Header>
        <Title>My Leads</Title>
        <SearchWrapper>
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>
      </Header>

      <Stats>
        <StatCard>
          <StatLabel>Total Leads</StatLabel>
          <StatValue>{stats.total}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Pending</StatLabel>
          <StatValue>{stats.pending}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Approved</StatLabel>
          <StatValue>{stats.approved}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Total Commission</StatLabel>
          <StatValue>${(stats.totalCommission / 1000).toFixed(1)}K</StatValue>
        </StatCard>
      </Stats>

      <DataTable
        columns={columns}
        data={filteredLeads}
        onRowClick={(row) => handleViewLead(row)}
      />

      {/* Lead Details Modal */}
      <Modal $isOpen={isModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Lead Details</ModalTitle>
            <CloseButton onClick={() => setIsModalOpen(false)}>
              <FiX />
            </CloseButton>
          </ModalHeader>

          {selectedLead && (
            <>
              <DetailSection>
                <SectionTitle>Business Information</SectionTitle>
                <DetailGrid>
                  <DetailItem>
                    <DetailLabel>Lead ID</DetailLabel>
                    <DetailValue>{selectedLead.id}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Business Name</DetailLabel>
                    <DetailValue>{selectedLead.businessName}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Contact Person</DetailLabel>
                    <DetailValue>{selectedLead.contactPerson}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Loan Type</DetailLabel>
                    <DetailValue>{selectedLead.loanType}</DetailValue>
                  </DetailItem>
                </DetailGrid>
              </DetailSection>

              <DetailSection>
                <SectionTitle>Contact Information</SectionTitle>
                <DetailGrid>
                  <DetailItem>
                    <DetailLabel>Email</DetailLabel>
                    <DetailValue>{selectedLead.email}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Phone</DetailLabel>
                    <DetailValue>{selectedLead.phone}</DetailValue>
                  </DetailItem>
                </DetailGrid>
              </DetailSection>

              <DetailSection>
                <SectionTitle>Loan Details</SectionTitle>
                <DetailGrid>
                  <DetailItem>
                    <DetailLabel>Requested Amount</DetailLabel>
                    <DetailValue>
                      <AmountBadge $amount={selectedLead.requestedAmount}>
                        ${selectedLead.requestedAmount.toLocaleString()}
                      </AmountBadge>
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Estimated Commission</DetailLabel>
                    <DetailValue>{selectedLead.estimatedCommission}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Status</DetailLabel>
                    <DetailValue style={{ textTransform: 'capitalize' }}>
                      {selectedLead.status.replace('_', ' ')}
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Submitted Date</DetailLabel>
                    <DetailValue>{selectedLead.submittedDate}</DetailValue>
                  </DetailItem>
                </DetailGrid>
              </DetailSection>

              <ModalActions>
                <Button 
                  variant="outline"
                  onClick={handleOpenArchiveFromLead}
                >
                  <FiArchive /> Archive Lead
                </Button>
                <Button 
                  variant="primary"
                  onClick={handleMoveToBorrowers}
                >
                  <FiCheckCircle /> Loan Approved - Move to Borrowers
                </Button>
              </ModalActions>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Archive Lead Modal */}
      <Modal $isOpen={isArchiveModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Archive Lead</ModalTitle>
            <CloseButton onClick={() => setIsArchiveModalOpen(false)}>
              <FiX />
            </CloseButton>
          </ModalHeader>

          {selectedLead && (
            <LeadInfo>
              <InfoRow>
                <InfoLabel>Business:</InfoLabel>
                <InfoValue>{selectedLead.businessName}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Contact:</InfoLabel>
                <InfoValue>{selectedLead.contactPerson}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Requested Amount:</InfoLabel>
                <InfoValue>${selectedLead.requestedAmount.toLocaleString()}</InfoValue>
              </InfoRow>
            </LeadInfo>
          )}

          <label>
            <StatLabel style={{ marginBottom: '8px', display: 'block' }}>
              Reason for Archiving (Required)
            </StatLabel>
            <TextArea
              placeholder="Please provide a detailed reason why this lead is being archived. For example: borrower found alternative financing, decided not to proceed, unresponsive, etc."
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
              onClick={handleArchiveLead}
            >
              <FiArchive /> Archive Lead
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}

