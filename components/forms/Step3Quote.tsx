'use client';

import styled from 'styled-components';
import { Button, Card } from '@/components/ui';
import { useLoanFormStore } from '@/stores/loanFormStore';
import { calculateLoanQuote, formatCurrency } from '@/lib/utils/loanCalculations';
import { motion } from 'framer-motion';
import { FiDollarSign, FiPercent, FiCheckCircle, FiClock, FiAward } from 'react-icons/fi';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

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

const HighlightCard = styled(motion.div)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}15 0%, ${props => props.theme.colors.primary}05 100%);
  padding: ${props => props.theme.spacing['2xl']};
  margin-bottom: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadiusLg};
  border: 2px solid ${props => props.theme.colors.primary};
  text-align: center;
`;

const HighlightTitle = styled.div`
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
`;

const HighlightValue = styled.div`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const ChartContainer = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  border: 1px solid ${props => props.theme.colors.border};
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 350px;
  }
`;

const LegendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius};
`;

const LegendColor = styled.div<{ $color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: ${props => props.$color};
  flex-shrink: 0;
`;

const LegendText = styled.div`
  flex: 1;
`;

const LegendLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 2px;
`;

const LegendValue = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const BenefitItem = styled(motion.li)`
  padding: ${props => props.theme.spacing.md} 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};

  &:last-child {
    border-bottom: none;
  }
  
  svg {
    color: ${props => props.theme.colors.success};
    flex-shrink: 0;
  }
`;

const CheckboxContainer = styled.div`
  background: ${props => props.theme.colors.primary}08;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius};
  border: 2px dashed ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.text};

  input[type="checkbox"] {
    margin-top: 4px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: ${props => props.theme.colors.primary};
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

const COLORS = ['#1A73E8', '#4CAF50', '#FF9800', '#9C27B0', '#F44336', '#00BCD4'];

export default function Step3Quote() {
  const { formData, setFormData, nextStep, prevStep } = useLoanFormStore();

  const loanAmount = parseFloat(formData.requestedAmount) || 0;
  const quote = calculateLoanQuote(loanAmount);

  // Prepare data for pie chart
  const chartData = [
    { name: 'Down Payment (20%)', value: quote.downPayment, color: COLORS[0] },
    { name: 'Monthly Interest (9% APR)', value: quote.monthlyInterest, color: COLORS[1] },
    { name: 'Processing Fee (1.5%)', value: quote.processingFee, color: COLORS[2] },
    { name: 'Closing Cost (3%)', value: quote.closingCost, color: COLORS[3] },
    { name: 'Lender Fee', value: quote.lenderFee, color: COLORS[4] },
    { name: 'Legal Fee', value: quote.legalFee, color: COLORS[5] },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptedTerms) {
      alert('Please accept the terms and conditions to continue.');
      return;
    }
    console.log('Step 3 Data:', formData);
    nextStep();
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'white',
          padding: '12px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>{payload[0].name}</p>
          <p style={{ margin: '4px 0 0 0', color: payload[0].payload.color, fontWeight: 'bold', fontSize: '16px' }}>
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <FormCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FormHeader>
        <FormTitle>
          <FiDollarSign size={28} />
          Your Pre-Approval Quote
        </FormTitle>
        <FormDescription>
          Great news! Based on your application, here's your personalized loan quote with competitive rates.
        </FormDescription>
      </FormHeader>
      
      <HighlightCard
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <HighlightTitle>
          <FiAward size={20} />
          Estimated Loan Amount
        </HighlightTitle>
        <HighlightValue>{formatCurrency(quote.estimatedAmount)}</HighlightValue>
      </HighlightCard>

      <SectionTitle>
        <FiPercent />
        Fees & Costs Breakdown
      </SectionTitle>

      <ChartContainer
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <LegendGrid>
          {chartData.map((item, index) => (
            <LegendItem key={index}>
              <LegendColor $color={item.color} />
              <LegendText>
                <LegendLabel>{item.name}</LegendLabel>
                <LegendValue>{formatCurrency(item.value)}</LegendValue>
              </LegendText>
            </LegendItem>
          ))}
        </LegendGrid>
      </ChartContainer>

      <SectionTitle>
        <FiCheckCircle />
        Loan Benefits & Features
      </SectionTitle>

      <BenefitsList>
        {[
          { icon: <FiClock size={18} />, text: `Loan term: ${formData.termMonths} months` },
          { icon: <FiPercent size={18} />, text: 'Competitive annual interest rate: 9%' },
          { icon: <FiCheckCircle size={18} />, text: 'No prepayment penalties - pay off early without fees' },
          { icon: <FiClock size={18} />, text: 'Fast approval process (typically 3-5 business days)' },
          { icon: <FiAward size={18} />, text: 'Dedicated loan officer assigned to your application' },
          { icon: <FiCheckCircle size={18} />, text: 'Flexible repayment options available' },
        ].map((benefit, index) => (
          <BenefitItem
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
          >
            {benefit.icon}
            <span>{benefit.text}</span>
          </BenefitItem>
        ))}
      </BenefitsList>

      <form onSubmit={handleSubmit}>
        <CheckboxContainer>
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={formData.acceptedTerms}
              onChange={(e) => setFormData({ acceptedTerms: e.target.checked })}
              required
            />
            <span>
              <strong>I understand and accept the loan terms.</strong> I acknowledge that this is a 
              pre-approval quote and final terms may vary based on underwriting review, property appraisal, 
              and final documentation.
            </span>
          </CheckboxLabel>
        </CheckboxContainer>

        <ButtonGroup>
          <Button type="button" variant="outline" size="lg" onClick={prevStep}>
            ← Back
          </Button>
          <Button type="submit" size="lg" disabled={!formData.acceptedTerms}>
            Continue to Registration →
          </Button>
        </ButtonGroup>
      </form>
    </FormCard>
  );
}
