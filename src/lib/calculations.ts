import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { FormData, TimeSeriesPoint } from './types';

dayjs.extend(isSameOrBefore);

interface GenerateWeeklyDataPointsParams
  extends Omit<FormData, 'durationMonthsSlider'> {
  btcPrice: number;
  durationMonths: number;
}

export const generateWeeklyDataPoints = ({
  initialInvestment,
  regularInvestment,
  period,
  durationMonths,
  priceTarget,
  btcPrice,
}: GenerateWeeklyDataPointsParams): TimeSeriesPoint[] => {
  const currentDate = dayjs();

  const endDate = currentDate.add(durationMonths, 'month');
  const numWeeks = endDate.diff(currentDate, 'week');

  const dataPoints: TimeSeriesPoint[] = [];
  let currentIterationDate = currentDate;
  let lastPurchaseMonth = currentDate.month();
  let lastPurchaseYear = currentDate.year();

  while (currentIterationDate.isSameOrBefore(endDate)) {
    const currentMonth = currentIterationDate.month();
    const currentYear = currentIterationDate.year();

    // For monthly purchases, check if we're in a new month-year combination
    const isNewMonth =
      period === 'monthly' &&
      (currentMonth !== lastPurchaseMonth || currentYear !== lastPurchaseYear);

    // Regular purchases happen:
    // - For weekly: every week after the initial investment
    // - For monthly: first occurrence of each new month
    const isRegularPurchase =
      (period === 'weekly' && dataPoints.length > 0) ||
      (period === 'monthly' && isNewMonth);

    if (dataPoints.length === 0) {
      const initialBtcPurchased = initialInvestment / btcPrice;
      dataPoints.push({
        date: currentIterationDate.toDate(),
        btcPrice,
        portfolioValue: initialInvestment,
        totalInvested: initialInvestment,
        btcPurchased: initialBtcPurchased,
        isRegularPurchase: false,
        totalBtcAssets: initialBtcPurchased,
      });
    } else {
      const bitcoinPrice = getBtcPrice({
        numWeeks,
        weekIndex: dataPoints.length,
        priceTarget,
        btcPrice,
      });

      const prevDataPoint = dataPoints[dataPoints.length - 1];
      const newInvestment = isRegularPurchase ? regularInvestment : 0;
      const newBtcPurchased = newInvestment / bitcoinPrice;

      dataPoints.push({
        date: currentIterationDate.toDate(),
        btcPrice: bitcoinPrice,
        portfolioValue:
          prevDataPoint.totalBtcAssets * bitcoinPrice + newInvestment,
        totalInvested: prevDataPoint.totalInvested + newInvestment,
        btcPurchased: newBtcPurchased,
        isRegularPurchase,
        totalBtcAssets: prevDataPoint.totalBtcAssets + newBtcPurchased,
      });
    }

    if (isRegularPurchase && period === 'monthly') {
      lastPurchaseMonth = currentMonth;
      lastPurchaseYear = currentYear;
    }

    currentIterationDate = currentIterationDate.add(1, 'week');
  }

  return dataPoints;
};

const getBtcPrice = ({
  numWeeks,
  weekIndex,
  priceTarget,
  btcPrice,
}: {
  numWeeks: number;
  weekIndex: number;
  priceTarget: number;
  btcPrice: number;
}) => {
  if (numWeeks === 0) return btcPrice;
  const delta = priceTarget - btcPrice;
  const price = btcPrice + (delta * weekIndex) / numWeeks;
  return price;
};
