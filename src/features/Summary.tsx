import usePortfolioCalcuations from '@/hooks/usePortfolioCalcuations';
import { generateWeeklyDataPoints } from '../lib/calculations';
import useFormStore from '../lib/store';
import { FormData, PeriodStep, TimeSeriesPoint, scenarios } from '../lib/types';
import { formatBtcAmount, formatCurrency } from '../lib/utils';

const periodHash: Record<PeriodStep, string> = {
  weekly: 'weekly',
  monthly: 'monthly',
} as const;

type SummaryProps = {
  timeSeriesData: TimeSeriesPoint[];
  formData?: FormData;
  profitFormatted?: string;
  durationMonths?: number;
};

const findTopBtcPriceWeek = (
  timeSeriesData: TimeSeriesPoint[]
): TimeSeriesPoint => {
  return timeSeriesData.reduce((maxWeek, currentWeek) => {
    return currentWeek.btcPrice > maxWeek.btcPrice ? currentWeek : maxWeek;
  }, timeSeriesData[0]);
};

const Summary = () => {
  const { durationMonths, formData } = useFormStore();
  const { whatIf } = formData;

  const result = usePortfolioCalcuations();
  const { totalInvestment, estimatedValue, profit } =
    result?.calculatedPortfolioValue || {};

  const timeSeriesData = result?.calculatedPortfolioValue?.timeSeriesData || [];
  if (!timeSeriesData[0]) return null;

  // Formatted values
  const totalInvestmetFormatted = formatCurrency(totalInvestment);
  const estimatedValueFormatted = formatCurrency(estimatedValue);
  const profitFormatted = formatCurrency(profit, 0);

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
        <CustomSummary
          formData={formData}
          profitFormatted={profitFormatted}
          durationMonths={durationMonths}
        />
      ) : null}
      {whatIf === 1 && profitFormatted ? (
        <BearSummary timeSeriesData={timeSeriesData} />
      ) : null}
      {whatIf === 2 && profitFormatted ? (
        <CrabSummary timeSeriesData={timeSeriesData} />
      ) : null}
      {whatIf === 3 && profitFormatted ? (
        <HodlSummary timeSeriesData={timeSeriesData} />
      ) : null}
      {whatIf === 4 && profitFormatted ? (
        <MoonSummary
          timeSeriesData={timeSeriesData}
          formData={formData}
          durationMonths={durationMonths}
        />
      ) : null}
    </>
  );
};

export default Summary;

const CustomSummary = ({
  formData,
  profitFormatted,
  durationMonths,
}: {
  formData: FormData;
  profitFormatted: string;
  durationMonths: number;
}) => {
  const { regularInvestment, period } = formData;
  const regularInvestmentFormatted = formatCurrency(regularInvestment, 0);
  return (
    <div className="bg-secondary rounded-lg p-4 shadow-md">
      If you invested {regularInvestmentFormatted} {periodHash[period]}{' '}
      for&nbsp;
      {durationMonths} months you could profit {profitFormatted}!
    </div>
  );
};

const BearSummary = ({
  timeSeriesData,
}: {
  timeSeriesData: TimeSeriesPoint[];
}) => {
  const averageCostPerBtc =
    timeSeriesData[timeSeriesData.length - 1]?.averageCostPerBtc;
  const initalAverageCostPerBtc = timeSeriesData[0]?.averageCostPerBtc;
  const averageCostPerBtcFormatted = formatCurrency(averageCostPerBtc, 0);
  const initalAverageCostPerBtcFormatted = formatCurrency(
    initalAverageCostPerBtc,
    0
  );
  return (
    <div className="bg-secondary rounded-lg p-4 shadow-md">
      🐻 {scenarios[1]} - despite long term downward movement, your average cost
      has lowered from {initalAverageCostPerBtcFormatted} to{' '}
      {averageCostPerBtcFormatted}. Consider it a sale, and buy more! 🫠
    </div>
  );
};

const CrabSummary = ({ timeSeriesData }: SummaryProps) => {
  const totalBtcAssets =
    timeSeriesData[timeSeriesData.length - 1]?.totalBtcAssets;
  const totalBtcAssetsFormatted = formatBtcAmount(totalBtcAssets);
  const topBtcPriceWeek = findTopBtcPriceWeek(timeSeriesData);
  const investmentAtTopBtcPrice =
    timeSeriesData[timeSeriesData.length - 1].totalInvested /
    topBtcPriceWeek.btcPrice;
  const investmentAtTopBtcPriceFormatted = formatBtcAmount(
    investmentAtTopBtcPrice
  );
  const crabDifference = (totalBtcAssets / investmentAtTopBtcPrice - 1) * 100;
  const crabDifferenceFormatted = Math.floor(crabDifference);

  return (
    <div className="bg-secondary rounded-lg p-4 shadow-md">
      🦀 {scenarios[2]} - even with years of sideways movement, you've
      accumulated {totalBtcAssetsFormatted} BTC. If you bought at the top in
      this period, you'd only have {investmentAtTopBtcPriceFormatted} BTC. A{' '}
      {crabDifferenceFormatted}% difference!
    </div>
  );
};

const HodlSummary = ({ timeSeriesData }: SummaryProps) => {
  const topBtcPriceWeek = findTopBtcPriceWeek(timeSeriesData);
  const totalBtcAssets =
    timeSeriesData[timeSeriesData.length - 1]?.totalBtcAssets;
  const totalBtcAssetsFormatted = formatBtcAmount(totalBtcAssets);
  const profitAtTopBtcPrice =
    topBtcPriceWeek.portfolioValue - topBtcPriceWeek.totalInvested;
  const profitAtTopBtcPriceFormatted = formatCurrency(profitAtTopBtcPrice, 0);

  return (
    <div className="bg-secondary rounded-lg p-4 shadow-md">
      💎🙌 {scenarios[3]} - you've weathered the storm and are now sitting on{' '}
      {totalBtcAssetsFormatted} BTC. If you sold at the high you would only have
      profited {profitAtTopBtcPriceFormatted} and you'd have zero BTC.
    </div>
  );
};

const MoonSummary = ({
  timeSeriesData,
  formData,
  durationMonths,
}: {
  timeSeriesData: TimeSeriesPoint[];
  formData: FormData;
  durationMonths: number;
}) => {
  const totalBtcAssets =
    timeSeriesData[timeSeriesData.length - 1]?.totalBtcAssets;
  const totalBtcAssetsFormatted = totalBtcAssets && totalBtcAssets.toFixed(3);
  // Moon values
  const fomoThreeYearsLater = timeSeriesData[156];

  if (!fomoThreeYearsLater) return null;
  const fomoTimeSeriesData = generateWeeklyDataPoints({
    ...formData,
    initialInvestment: fomoThreeYearsLater.totalInvested,
    btcPrice: fomoThreeYearsLater.btcPrice,
    durationMonths: durationMonths - 36,
  });
  const fomoBtcAssets =
    fomoTimeSeriesData[fomoTimeSeriesData.length - 1].totalBtcAssets;

  const fomoBtcAssetsFormatted = fomoBtcAssets.toFixed(3);
  return (
    <div className="bg-secondary rounded-lg p-4 shadow-md">
      🚀 {scenarios[4]} - By patiently buying, you've accumulated{' '}
      {totalBtcAssetsFormatted} btc. If you had saved your cash and FOMO'd three
      years later, you'd only have {fomoBtcAssetsFormatted} BTC
    </div>
  );
};
