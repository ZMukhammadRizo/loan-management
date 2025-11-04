'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { StepIndicator, ProgressBar } from '@/components/ui';
import { useLoanFormStore } from '@/stores/loanFormStore';
import Step1DealBasics from '@/components/forms/Step1DealBasics';
import Step2BorrowingEntity from '@/components/forms/Step2BorrowingEntity';
import Step3Quote from '@/components/forms/Step3Quote';
import Step4Register from '@/components/forms/Step4Register';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}08 0%, ${props => props.theme.colors.secondary} 50%, ${props => props.theme.colors.primary}05 100%);
  padding: ${props => props.theme.spacing['2xl']} ${props => props.theme.spacing.lg};
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['3xl']};
  position: relative;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ProgressContainer = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadiusLg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.small};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
`;

const StepContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const steps = [
  { title: 'Deal Basics', description: 'Property details' },
  { title: 'Borrowing Entity', description: 'Company info' },
  { title: 'Quote', description: 'Review terms' },
  { title: 'Register', description: 'Create account' },
];

export const dynamic = 'force-dynamic';

export default function ApplyPage() {
  const searchParams = useSearchParams();
  const { formData, setReferralCode } = useLoanFormStore();
  const currentStep = formData.currentStep;

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setReferralCode(ref);
      console.log('Referral code captured:', ref);
    }
  }, [searchParams, setReferralCode]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1DealBasics />;
      case 2:
        return <Step2BorrowingEntity />;
      case 3:
        return <Step3Quote />;
      case 4:
        return <Step4Register />;
      default:
        return <Step1DealBasics />;
    }
  };

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <Suspense fallback={null}>
    <Container>
      <Content>
        <Header>
          <Title>🏦 Apply for Business Loan</Title>
          <Subtitle>Complete the application in 4 easy steps</Subtitle>
        </Header>

        <ProgressContainer>
          <ProgressLabel>
            <span>Application Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </ProgressLabel>
          <ProgressBar progress={progress} showLabel={false} height={12} />
        </ProgressContainer>

        <StepContainer>
          <StepIndicator steps={steps} currentStep={currentStep} />
        </StepContainer>

        {renderStep()}
      </Content>
    </Container>
    </Suspense>
  );
}

