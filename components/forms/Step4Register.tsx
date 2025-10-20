'use client';

import styled from 'styled-components';
import { Button, Input } from '@/components/ui';
import { useLoanFormStore } from '@/stores/loanFormStore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiMail, FiPhone, FiLock, FiShield, FiClock, FiUserCheck } from 'react-icons/fi';
import { useState } from 'react';

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

const SuccessBanner = styled(motion.div)`
  background: linear-gradient(135deg, ${props => props.theme.colors.success}15 0%, ${props => props.theme.colors.success}05 100%);
  border: 2px solid ${props => props.theme.colors.success};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
`;

const SuccessIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.theme.colors.success};
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const SuccessContent = styled.div`
  flex: 1;
`;

const SuccessTitle = styled.div`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const SuccessText = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  line-height: 1.5;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SecurityNote = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.primary}08;
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const WhatHappensNext = styled.div`
  background: ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
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

const TimelineList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TimelineItem = styled(motion.li)`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md} 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const TimelineIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary}15;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineTitle = styled.div`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 4px;
  font-size: ${props => props.theme.fontSizes.sm};
`;

const TimelineDescription = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.textLight};
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing['2xl']};
  padding-top: ${props => props.theme.spacing.xl};
  border-top: 2px solid ${props => props.theme.colors.secondary};
`;

export default function Step4Register() {
  const router = useRouter();
  const { showToast } = useToast();
  const { formData, setFormData, prevStep, resetForm } = useLoanFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Mock submission
    console.log('Final Form Data:', formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    showToast('🎉 Application submitted successfully!', 'success');
    
    // Redirect to success page or dashboard
    setTimeout(() => {
      resetForm();
      router.push('/');
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          <FiUserCheck size={28} />
          Complete Your Application
        </FormTitle>
        <FormDescription>
          You're almost there! Create your account to submit your loan application and track its progress.
        </FormDescription>
      </FormHeader>
      
      <SuccessBanner
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        <SuccessIcon>
          <FiCheckCircle size={24} />
        </SuccessIcon>
        <SuccessContent>
          <SuccessTitle>🎉 You've completed all required information!</SuccessTitle>
          <SuccessText>
            Create your account below to submit your pre-approval application for {formatCurrency(parseFloat(formData.requestedAmount))}.
            You'll receive instant confirmation and can track your application status in real-time.
          </SuccessText>
        </SuccessContent>
      </SuccessBanner>

      <form onSubmit={handleSubmit}>
        <SectionTitle>
          <FiMail />
          Create Your Account
        </SectionTitle>
        
        <FormGrid>
          <Input
            type="email"
            label="Email Address"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleInputChange}
            helperText="We'll send application updates to this email"
            required
          />

          <Input
            type="tel"
            label="Phone Number"
            name="phone"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={handleInputChange}
            helperText="For verification and status updates"
            required
          />

          <Input
            type="password"
            label="Create Password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            helperText="At least 8 characters with numbers and letters"
            required
          />
        </FormGrid>

        <SecurityNote>
          <FiShield size={16} />
          <span>Your information is encrypted and secure. We never share your data with third parties.</span>
        </SecurityNote>

        <WhatHappensNext>
          <SectionTitle>
            <FiClock />
            What Happens Next?
          </SectionTitle>
          
          <TimelineList>
            {[
              {
                icon: <FiCheckCircle />,
                title: 'Instant Confirmation',
                description: 'You\'ll receive an email confirmation immediately after submission.'
              },
              {
                icon: <FiClock />,
                title: 'Application Review (1-2 days)',
                description: 'Our loan officers will review your application and contact you if additional information is needed.'
              },
              {
                icon: <FiUserCheck />,
                title: 'Underwriting (2-3 days)',
                description: 'Your application will be submitted to underwriting for final approval.'
              },
              {
                icon: <FiCheckCircle />,
                title: 'Final Approval & Funding',
                description: 'Once approved, we\'ll finalize paperwork and fund your loan typically within 5-7 business days.'
              }
            ].map((item, index) => (
              <TimelineItem
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <TimelineIcon>{item.icon}</TimelineIcon>
                <TimelineContent>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineDescription>{item.description}</TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            ))}
          </TimelineList>
        </WhatHappensNext>

        <ButtonGroup>
          <Button type="button" variant="outline" size="lg" onClick={prevStep} disabled={isSubmitting}>
            ← Back
          </Button>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{ display: 'inline-block' }}
                >
                  ⏳
                </motion.div>
                Submitting...
              </>
            ) : (
              <>
                <FiCheckCircle />
                Submit Application
              </>
            )}
          </Button>
        </ButtonGroup>
      </form>
    </FormCard>
  );
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
