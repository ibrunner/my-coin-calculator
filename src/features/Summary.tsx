import usePortfolioCalcuations from '@/hooks/usePortfolioCalcuations';
import useFormStore from '../lib/store';
import { PeriodStep } from '../lib/types';
import { formatCurrency } from '../lib/utils';
const periodHash: Record<PeriodStep, string> = {
  // daily: 'daily',
  weekly: 'weekly',
  // '2xMonthly': '2x monthly',
  monthly: 'monthly',
} as const;

const Summary = () => {
  const { durationMonths, formData } = useFormStore();
  const result = usePortfolioCalcuations();
  const { totalInvestment, estimatedValue, profit } =
    result?.calculatedPortfolioValue || {};
  const { regularInvestment, period, whatIf } = formData;

  const timeSeriesData = result?.calculatedPortfolioValue?.timeSeriesData || [];
  const averageCostPerBtc =
    timeSeriesData[timeSeriesData.length - 1].averageCostPerBtc;
  const initalAverageCostPerBtc = timeSeriesData[0].averageCostPerBtc;

  const totalInvestmetFormatted = formatCurrency(totalInvestment);
  const estimatedValueFormatted = formatCurrency(estimatedValue);
  const profitFormatted = formatCurrency(profit, 0);
  const regularInvestmentFormatted = formatCurrency(regularInvestment, 0);

  const averageCostPerBtcFormatted = formatCurrency(averageCostPerBtc, 0);
  const initalAverageCostPerBtcFormatted = formatCurrency(
    initalAverageCostPerBtc,
    0
  );

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

      {whatIf === 0 && profitFormatted ? (
        <div className="bg-secondary rounded-lg p-4 shadow-md">
          If you invested {regularInvestmentFormatted} {periodHash[period]}{' '}
          for&nbsp;
          {durationMonths} months you could profit {profitFormatted}!
        </div>
      ) : null}
      {whatIf === 1 && profitFormatted ? (
        <div className="bg-secondary rounded-lg p-4 shadow-md">
          Bear - despite long term downward movement, your average cost has
          lowered from {initalAverageCostPerBtcFormatted} to{' '}
          {averageCostPerBtcFormatted}. Consider it a sale, and buy more! 🫠
        </div>
      ) : null}
      {whatIf === 2 && profitFormatted ? (
        <div className="bg-secondary rounded-lg p-4 shadow-md">
          Crab - even with years of sideways movement, you've accumulated x BTC.
          If you bought at the high in this period, it would be worth $y
        </div>
      ) : null}
      {whatIf === 3 && profitFormatted ? (
        <div className="bg-secondary rounded-lg p-4 shadow-md">
          HODL - you've weathered the storm and are now sitting on x BTC. If you
          sold at the high you would only have profited $y and you'd have zero
          BTC.
        </div>
      ) : null}
      {whatIf === 4 && profitFormatted ? (
        <div className="bg-secondary rounded-lg p-4 shadow-md">
          Moon - By patiently buying, you've accumulated X btc. If you had saved
          your cash and FOMO'd a year later, you'd only have $y worth of BTC
        </div>
      ) : null}
    </>
  );
};

export default Summary;
