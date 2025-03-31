import { create } from 'zustand';
import { FormData } from './types';

const DEFAULT_FORM_DATA: FormData = {
  initialInvestment: 1000,
  regularInvestment: 100,
  period: 'monthly',
  durationMonths: 24,
  priceTarget: 100000,
  startPrice: 60000,
  volatility: 0,
  whatIf: 0,
};

const calculatePorfolioValue = (
  formData: FormData
): { totalInvestment: number; estimatedValue: number; profit: number } => {
  console.log('calculatePorfolioValue', formData);
  const {
    initialInvestment,
    regularInvestment,
    durationMonths,
    priceTarget,
    startPrice,
    period,
  } = formData;

  let payPeriodsPerMonth = 1;
  switch (period) {
    case 'weekly':
      payPeriodsPerMonth = 4.333;
      break;
    case '2xMonthly':
      payPeriodsPerMonth = 2;
      break;
    case 'daily':
      payPeriodsPerMonth = 30.5;
      break;
    default:
      payPeriodsPerMonth = 1;
  }
  console.log('period', period);
  console.log('payPeriodsPerMonth', payPeriodsPerMonth);

  const totalInvestment =
    initialInvestment +
    regularInvestment * (durationMonths * payPeriodsPerMonth);

  let coinCount = initialInvestment / startPrice;
  let totalBuys = durationMonths * payPeriodsPerMonth;

  for (let i = 0; i < totalBuys; i++) {
    const priceAtBuy =
      startPrice + (priceTarget - startPrice) * (i / totalBuys);
    coinCount += regularInvestment / priceAtBuy;
  }

  const estimatedValue = coinCount * priceTarget;
  const profit = estimatedValue - totalInvestment;
  return { totalInvestment, estimatedValue, profit };
};

const DEFAULT_STORE_DATA: Omit<FormStore, 'updateFormData' | 'updateField'> = {
  formData: DEFAULT_FORM_DATA,
  ...calculatePorfolioValue(DEFAULT_FORM_DATA),
};

interface FormStore {
  formData: FormData;
  updateFormData: (formData: FormData) => void;
  totalInvestment: number;
  estimatedValue: number;
  profit: number;
}

const useFormStore = create<FormStore>((set) => ({
  ...DEFAULT_STORE_DATA,
  updateFormData: (formData: FormData) => {
    set({ formData, ...calculatePorfolioValue(formData) });
  },
}));

export default useFormStore;
