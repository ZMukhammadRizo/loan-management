'use client';

import styled from 'styled-components';
import { Button, Input, Select } from '@/components/ui';
import { useLoanFormStore } from '@/stores/loanFormStore';
import { creditScoreRanges } from '@/lib/constants/loanOptions';
import { motion } from 'framer-motion';
import { FiBriefcase, FiUser, FiUsers, FiTrendingUp } from 'react-icons/fi';

const FormCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadiusLg};
  padding: ${props => props.theme.spacing['2xl']};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const FormHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing['2xl']};
  padding-bottom: ${props => props.theme.spacing.lg};
  border-bottom: 2px solid ${props => props.theme.colors.secondary};
`;

const FormTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const FormDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
`;

const Section = styled.div`
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.lg};

  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

const HighlightBox = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}10 0%, ${props => props.theme.colors.primary}05 100%);
  border-left: 4px solid ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  p {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.text};
    margin: 0;
    line-height: 1.6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing['2xl']};
  padding-top: ${props => props.theme.spacing.xl};
  border-top: 2px solid ${props => props.theme.colors.secondary};
`;

export default function Step2BorrowingEntity() {
  const { formData, setFormData, nextStep, prevStep } = useLoanFormStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Step 2 Data:', formData);
    nextStep();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ [e.target.name]: e.target.value });
  };

  return (
    <FormCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FormHeader>
        <FormTitle>
          <FiBriefcase size={28} />
          Company & Owner Information
        </FormTitle>
        <FormDescription>
          Tell us about your company and ownership structure. This helps us understand your business better.
        </FormDescription>
      </FormHeader>
      
      <form onSubmit={handleSubmit}>
        <Section>
          <SectionTitle>
            <FiBriefcase size={20} />
            Company Details
          </SectionTitle>
          <FullWidth>
            <Input
              label="Company Name"
              name="companyName"
              placeholder="ABC Investments LLC"
              value={formData.companyName}
              onChange={handleInputChange}
              required
            />
          </FullWidth>
        </Section>

        <Section>
          <SectionTitle>
            <FiUser size={20} />
            Primary Owner
          </SectionTitle>
          <HighlightBox>
            <p>📝 <strong>Note:</strong> The primary owner should be the person with majority stake or decision-making authority.</p>
          </HighlightBox>
          <FormGrid>
            <Input
              label="First Name"
              name="ownerFirstName"
              placeholder="John"
              value={formData.ownerFirstName}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Last Name"
              name="ownerLastName"
              placeholder="Doe"
              value={formData.ownerLastName}
              onChange={handleInputChange}
              required
            />
          </FormGrid>
        </Section>

        <Section>
          <SectionTitle>
            <FiUsers size={20} />
            Co-Owner (Optional)
          </SectionTitle>
          <FormGrid>
            <Input
              label="First Name"
              name="coOwnerFirstName"
              placeholder="Jane"
              value={formData.coOwnerFirstName}
              onChange={handleInputChange}
            />

            <Input
              label="Last Name"
              name="coOwnerLastName"
              placeholder="Doe"
              value={formData.coOwnerLastName}
              onChange={handleInputChange}
            />
          </FormGrid>
        </Section>

        <Section>
          <SectionTitle>
            <FiTrendingUp size={20} />
            Experience & Credit Profile
          </SectionTitle>
          <HighlightBox>
            <p>💼 <strong>Experience Matters:</strong> Your real estate history and credit score help us offer better terms.</p>
          </HighlightBox>
          <FormGrid>
            <Input
              type="number"
              label="Number of Real Estate Deals Completed"
              name="realEstateDeals"
              placeholder="5"
              value={formData.realEstateDeals}
              onChange={handleInputChange}
              helperText="Total deals you've completed"
              required
            />

            <Select
              label="Credit Score Range"
              name="creditScore"
              placeholder="Select your credit score range"
              value={formData.creditScore}
              onChange={handleInputChange}
              options={creditScoreRanges}
              required
            />
          </FormGrid>
        </Section>

        <ButtonGroup>
          <Button type="button" variant="outline" size="lg" onClick={prevStep}>
            ← Back
          </Button>
          <Button type="submit" size="lg">
            Continue to Quote →
          </Button>
        </ButtonGroup>
      </form>
    </FormCard>
  );
}
