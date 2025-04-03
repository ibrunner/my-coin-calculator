import usePortfolioCalcuations from '@/hooks/usePortfolioCalcuations';
import useFormStore from '../lib/store';
import { PeriodStep } from '../lib/types';
import { formatCurrency } from '../lib/utils';

const periodHash: Record<PeriodStep, string> = {
  daily: 'daily',
  weekly: 'weekly',
  '2xMonthly': '2x monthly',
  monthly: 'monthly',
} as const;

const Summary = () => {
  const { durationMonths, formData } = useFormStore();
  const result = usePortfolioCalcuations();
  const { totalInvestment, estimatedValue, profit } =
    result?.calculatedPortfolioValue || {};
  const { regularInvestment, period } = formData;

  const totalInvestmetFormatted = formatCurrency(totalInvestment);
  const estimatedValueFormatted = formatCurrency(estimatedValue);
  const profitFormatted = formatCurrency(profit, 0);
  const regularInvestmentFormatted = formatCurrency(regularInvestment, 0);

  return (
    <>
      <div className="bg-secondary mb-2 rounded-lg p-4 shadow-md">
        <h2>Your Results</h2>
        <div className="grid grid-cols-2 gap-y-2">
          <div className="text-left">Total Invested:</div>
          <div className="text-right font-medium">
            {totalInvestmetFormatted || 'Calculating...'}
          </div>
          <div className="text-left">Estimated Value:</div>
          <div className="text-right font-medium">
            {estimatedValueFormatted || 'Calculating...'}
          </div>
        </div>
      </div>
      {profitFormatted && (
        <div className="bg-secondary rounded-lg p-4 shadow-md">
          If you invested {regularInvestmentFormatted} {periodHash[period]}{' '}
          for&nbsp;
          {durationMonths} months you could profit {profitFormatted}!
        </div>
      )}
    </>
  );
};

export default Summary;
