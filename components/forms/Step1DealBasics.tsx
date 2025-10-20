'use client';

import styled from 'styled-components';
import { Button, Input, Select, Card } from '@/components/ui';
import { useLoanFormStore } from '@/stores/loanFormStore';
import { dealTypes, propertyTypes, loanTypes, termMonths, usStates } from '@/lib/constants/loanOptions';
import { motion } from 'framer-motion';
import { FiHome, FiDollarSign, FiCalendar, FiMapPin } from 'react-icons/fi';

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
  justify-content: flex-end;
  margin-top: ${props => props.theme.spacing['2xl']};
  padding-top: ${props => props.theme.spacing.xl};
  border-top: 2px solid ${props => props.theme.colors.secondary};
`;

export default function Step1DealBasics() {
  const { formData, setFormData, nextStep } = useLoanFormStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Validate form data
    console.log('Step 1 Data:', formData);
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
          <FiHome size={28} />
          Property & Loan Details
        </FormTitle>
        <FormDescription>
          Let's start with the basics. Tell us about your property and the loan amount you need.
        </FormDescription>
      </FormHeader>
      
      <form onSubmit={handleSubmit}>
        <Section>
          <SectionTitle>
            <FiMapPin size={20} />
            Property Location
          </SectionTitle>
          <FormGrid>
            <FullWidth>
              <Input
                label="Property Address"
                name="propertyAddress"
                placeholder="123 Main Street"
                value={formData.propertyAddress}
                onChange={handleInputChange}
                required
              />
            </FullWidth>

            <Input
              label="City"
              name="city"
              placeholder="Los Angeles"
              value={formData.city}
              onChange={handleInputChange}
              required
            />

            <Select
              label="State"
              name="state"
              placeholder="Select state"
              value={formData.state}
              onChange={handleInputChange}
              options={usStates}
              required
            />

            <Input
              label="ZIP Code"
              name="zip"
              placeholder="90001"
              value={formData.zip}
              onChange={handleInputChange}
              required
            />
          </FormGrid>
        </Section>

        <Section>
          <SectionTitle>
            <FiHome size={20} />
            Property & Deal Information
          </SectionTitle>
          <FormGrid>
            <Select
              label="Deal Type"
              name="dealType"
              placeholder="Select deal type"
              value={formData.dealType}
              onChange={handleInputChange}
              options={dealTypes}
              required
            />

            <Select
              label="Property Type"
              name="propertyType"
              placeholder="Select property type"
              value={formData.propertyType}
              onChange={handleInputChange}
              options={propertyTypes}
              required
            />
          </FormGrid>
        </Section>

        <Section>
          <SectionTitle>
            <FiDollarSign size={20} />
            Loan Requirements
          </SectionTitle>
          
          <HighlightBox>
            <p>💡 <strong>Tip:</strong> Most lenders offer amounts from $100,000 to $5,000,000 with flexible terms.</p>
          </HighlightBox>
          
          <FormGrid>
            <Select
              label="Loan Type"
              name="loanType"
              placeholder="Select loan type"
              value={formData.loanType}
              onChange={handleInputChange}
              options={loanTypes}
              required
            />

            <Input
              type="number"
              label="Requested Loan Amount ($)"
              name="requestedAmount"
              placeholder="500000"
              value={formData.requestedAmount}
              onChange={handleInputChange}
              helperText="Enter amount in dollars"
              required
            />

            <Select
              label="Loan Term"
              name="termMonths"
              placeholder="Select term"
              value={formData.termMonths}
              onChange={handleInputChange}
              options={termMonths}
              required
            />
          </FormGrid>
        </Section>

        <Section>
          <SectionTitle>
            <FiCalendar size={20} />
            Monthly Property Costs (Optional)
          </SectionTitle>
          <FormGrid>
            <Input
              type="number"
              label="Monthly Property Tax ($)"
              name="monthlyPropertyTax"
              placeholder="500"
              value={formData.monthlyPropertyTax}
              onChange={handleInputChange}
            />

            <Input
              type="number"
              label="Monthly Insurance ($)"
              name="insurancePayment"
              placeholder="300"
              value={formData.insurancePayment}
              onChange={handleInputChange}
            />

            <Input
              type="number"
              label="Monthly Rental Income ($)"
              name="rentalIncome"
              placeholder="2500"
              value={formData.rentalIncome}
              onChange={handleInputChange}
              helperText="If applicable"
            />

            <Input
              type="number"
              label="Monthly HOA/Association Dues ($)"
              name="associationDues"
              placeholder="200"
              value={formData.associationDues}
              onChange={handleInputChange}
              helperText="If applicable"
            />
          </FormGrid>
        </Section>

        <ButtonGroup>
          <Button type="submit" size="lg" fullWidth>
            Continue to Company Information →
          </Button>
        </ButtonGroup>
      </form>
    </FormCard>
  );
}

