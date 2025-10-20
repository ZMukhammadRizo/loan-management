import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LoanFormData {
  // Step 1: Deal Basics
  propertyAddress: string;
  city: string;
  state: string;
  zip: string;
  dealType: string;
  propertyType: string;
  loanType: string;
  requestedAmount: string;
  termMonths: string;
  monthlyPropertyTax: string;
  insurancePayment: string;
  rentalIncome: string;
  associationDues: string;

  // Step 2: Borrowing Entity
  companyName: string;
  ownerFirstName: string;
  ownerLastName: string;
  coOwnerFirstName: string;
  coOwnerLastName: string;
  realEstateDeals: string;
  creditScore: string;

  // Step 3: Quote
  acceptedTerms: boolean;

  // Step 4: Registration
  email: string;
  phone: string;
  password: string;

  // Meta
  referralCode: string | null;
  currentStep: number;
}

interface LoanFormStore {
  formData: LoanFormData;
  setFormData: (data: Partial<LoanFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  setReferralCode: (code: string) => void;
  resetForm: () => void;
}

const initialFormData: LoanFormData = {
  propertyAddress: '',
  city: '',
  state: '',
  zip: '',
  dealType: '',
  propertyType: '',
  loanType: '',
  requestedAmount: '',
  termMonths: '',
  monthlyPropertyTax: '',
  insurancePayment: '',
  rentalIncome: '',
  associationDues: '',
  companyName: '',
  ownerFirstName: '',
  ownerLastName: '',
  coOwnerFirstName: '',
  coOwnerLastName: '',
  realEstateDeals: '',
  creditScore: '',
  acceptedTerms: false,
  email: '',
  phone: '',
  password: '',
  referralCode: null,
  currentStep: 1,
};

export const useLoanFormStore = create<LoanFormStore>()(
  persist(
    (set) => ({
      formData: initialFormData,
      
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      
      nextStep: () =>
        set((state) => ({
          formData: {
            ...state.formData,
            currentStep: Math.min(state.formData.currentStep + 1, 4),
          },
        })),
      
      prevStep: () =>
        set((state) => ({
          formData: {
            ...state.formData,
            currentStep: Math.max(state.formData.currentStep - 1, 1),
          },
        })),
      
      goToStep: (step) =>
        set((state) => ({
          formData: {
            ...state.formData,
            currentStep: Math.max(1, Math.min(step, 4)),
          },
        })),
      
      setReferralCode: (code) =>
        set((state) => ({
          formData: { ...state.formData, referralCode: code },
        })),
      
      resetForm: () => set({ formData: initialFormData }),
    }),
    {
      name: 'loan-form-storage',
    }
  )
);

