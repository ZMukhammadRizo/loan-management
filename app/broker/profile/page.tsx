'use client';

import { DashboardLayout } from '@/components/layout';
import { Card, Input, Button } from '@/components/ui';
import styled from 'styled-components';
import { FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, FiSave, FiCamera } from 'react-icons/fi';
import { useState } from 'react';
import { useToast } from '@/components/ui';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ProfileCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadiusLg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.small};
  text-align: center;
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto ${props => props.theme.spacing.lg};
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const UploadButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.small};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primaryHover};
    transform: scale(1.1);
  }
`;

const BrokerName = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const BrokerRole = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
  padding-top: ${props => props.theme.spacing.xl};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FormCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadiusLg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.small};
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const FormGrid = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: flex-end;
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

export default function ProfilePage() {
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Broker',
    email: 'john.broker@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Prime Lending Solutions',
    address: '123 Finance Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update with Supabase
    showToast('Profile updated successfully!', 'success');
  };

  return (
    <DashboardLayout
      role="broker"
      pageTitle="Profile"
      userName="John Broker"
      userRole="broker"
    >
      <Grid>
        <div>
          <ProfileCard>
            <AvatarContainer>
              <Avatar>JB</Avatar>
              <UploadButton>
                <FiCamera />
              </UploadButton>
            </AvatarContainer>
            
            <BrokerName>John Broker</BrokerName>
            <BrokerRole>Certified Loan Broker</BrokerRole>
            
            <StatsGrid>
              <StatItem>
                <StatValue>28</StatValue>
                <StatLabel>Total Leads</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>16</StatValue>
                <StatLabel>Approved</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>$4.8K</StatValue>
                <StatLabel>Commission</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>57%</StatValue>
                <StatLabel>Success Rate</StatLabel>
              </StatItem>
            </StatsGrid>
          </ProfileCard>
        </div>

        <div>
          <FormCard>
            <form onSubmit={handleSubmit}>
              <SectionTitle>
                <FiUser /> Personal Information
              </SectionTitle>
              
              <FormGrid>
                <FormRow>
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </FormRow>
                
                <FormRow>
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </FormRow>
              </FormGrid>

              <SectionTitle>
                <FiBriefcase /> Business Information
              </SectionTitle>
              
              <FormGrid>
                <Input
                  label="Company Name"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </FormGrid>

              <SectionTitle>
                <FiMapPin /> Address
              </SectionTitle>
              
              <FormGrid>
                <Input
                  label="Street Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
                
                <FormRow>
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <Input
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </FormRow>
                
                <Input
                  label="ZIP Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </FormGrid>

              <ButtonGroup>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">
                  <FiSave /> Save Changes
                </Button>
              </ButtonGroup>
            </form>
          </FormCard>
        </div>
      </Grid>
    </DashboardLayout>
  );
}

