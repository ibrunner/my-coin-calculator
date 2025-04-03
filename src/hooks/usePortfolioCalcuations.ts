import { useMemo } from 'react';
import useFormStore from '../lib/store';
import { durationSteps, FormData } from '../lib/types';
import useBtcPrice from './useBtcPrice';

const calculatePorfolioValue = (
  formData: FormData,
  btcPrice: number
): { totalInvestment: number; estimatedValue: number; profit: number } => {
  const {
    initialInvestment,
    regularInvestment,
    durationMonthsSlider,
    priceTarget,
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

  const durationMonths = durationSteps[durationMonthsSlider];

  const totalInvestment =
    initialInvestment +
    regularInvestment * (durationMonths * payPeriodsPerMonth);

  let coinCount = initialInvestment / btcPrice;
  let totalBuys = durationMonths * payPeriodsPerMonth;

  for (let i = 0; i < totalBuys; i++) {
    const priceAtBuy = btcPrice + (priceTarget - btcPrice) * (i / totalBuys);
    coinCount += regularInvestment / priceAtBuy;
  }

  const estimatedValue = coinCount * priceTarget;
  const profit = estimatedValue - totalInvestment;
  return { totalInvestment, estimatedValue, profit };
};

const usePortfolioCalcuations = () => {
  const { formData } = useFormStore();
  const { data: btcPrice, isLoading } = useBtcPrice();

  const calculatedPortfolioValue = useMemo(() => {
    if (!btcPrice) {
      return null;
    }
    return calculatePorfolioValue(formData, btcPrice);
  }, [btcPrice, formData]);

  return { calculatedPortfolioValue, isLoading };
};

export default usePortfolioCalcuations;
