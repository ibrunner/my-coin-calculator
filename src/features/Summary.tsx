import useFormStore from '../lib/store';
import { PeriodStep } from '../lib/types';
const Summary = () => {
  const { totalInvestment, estimatedValue, profit, durationMonths, formData } =
    useFormStore();
  const { regularInvestment, period } = formData;

  const totalInvestmetFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalInvestment);

  const estimatedValueFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(estimatedValue);

  const profitFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(profit);

  const regularInvestmentFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(regularInvestment);

  const periodHash: Record<PeriodStep, string> = {
    daily: 'daily',
    weekly: 'weekly',
    '2xMonthly': '2x monthly',
    monthly: 'monthly',
  };

  return (
    <>
      <div className="bg-secondary mb-2 rounded-lg p-4 shadow-md">
        <h2>Your Results</h2>
        <div className="grid grid-cols-2 gap-y-2">
          <div className="text-left">Total Invested:</div>
          <div className="text-right font-medium">
            {totalInvestmetFormatted}
          </div>
          <div className="text-left">Estimated Value:</div>
          <div className="text-right font-medium">
            {estimatedValueFormatted}
          </div>
        </div>
      </div>
      <div className="bg-secondary rounded-lg p-4 shadow-md">
        If you invested {regularInvestmentFormatted} {periodHash[period]}{' '}
        for&nbsp;
        {durationMonths} months you could profit {profitFormatted}!
      </div>
    </>
  );
};

export default Summary;
