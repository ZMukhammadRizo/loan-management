export interface LoanQuoteResult {
  estimatedAmount: number;
  downPayment: number;
  monthlyInterest: number;
  processingFee: number;
  lenderFee: number;
  legalFee: number;
  closingCost: number;
  totalCost: number;
}

export function calculateLoanQuote(loanAmount: number): LoanQuoteResult {
  const annualRate = 9; // 9% annual interest rate
  const downPaymentPercent = 0.20; // 20%
  const processingFeePercent = 0.015; // 1.5%
  const closingCostPercent = 0.03; // 3%
  
  const downPayment = loanAmount * downPaymentPercent;
  const monthlyInterest = (loanAmount * (annualRate / 100)) / 12;
  const processingFee = loanAmount * processingFeePercent;
  const closingCost = loanAmount * closingCostPercent;
  const lenderFee = 1500; // flat fee
  const legalFee = 1000; // flat fee
  
  const totalCost = downPayment + processingFee + closingCost + lenderFee + legalFee;

  return {
    estimatedAmount: loanAmount,
    downPayment,
    monthlyInterest,
    processingFee,
    lenderFee,
    legalFee,
    closingCost,
    totalCost,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

