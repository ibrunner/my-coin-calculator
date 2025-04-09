import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { FormData, TimeSeriesPoint } from './types';
dayjs.extend(isSameOrBefore);

type GenerateWeeklyDataPointsParams = FormData;

export const generateWeeklyDataPoints = ({
  initialInvestment,
  regularInvestment,
  period,
  durationMonthsSlider: durationMonths,
  priceTarget,
  startPrice: btcPrice,
  //   volatility,
  //   whatIf,
}: GenerateWeeklyDataPointsParams): TimeSeriesPoint[] => {
  const currentDate = dayjs();
  const endDate = currentDate.add(durationMonths, 'month');
  const numWeeks = endDate.diff(currentDate, 'week');

  const dataPoints: TimeSeriesPoint[] = [];
  let currentIterationDate = currentDate;
  let initialMonth = currentDate.month();

  while (currentIterationDate.isSameOrBefore(endDate)) {
    const currentMonth = currentIterationDate.month();
    const isFirstWeekOfNewMonth =
      currentMonth !== initialMonth && currentIterationDate.date() <= 7;

    // Regular purchases happen:
    // - For weekly: every week after the initial investment
    // - For monthly: first week of each month after the initial month
    const isRegularPurchase =
      (period === 'weekly' && dataPoints.length > 0) ||
      (period === 'monthly' && isFirstWeekOfNewMonth);

    if (dataPoints.length === 0) {
      const initialBtcPurchased = initialInvestment / btcPrice;
      dataPoints.push({
        date: currentIterationDate.toDate(),
        btcPrice,
        portfolioValue: initialInvestment,
        investedAmount: initialInvestment,
        btcPurchased: initialBtcPurchased,
        isRegularPurchase: false, // Initial investment is not a regular purchase
        totalBtcPurchased: initialBtcPurchased,
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
          prevDataPoint.totalBtcPurchased * bitcoinPrice + newInvestment,
        investedAmount: prevDataPoint.investedAmount + newInvestment,
        btcPurchased: newBtcPurchased,
        isRegularPurchase,
        totalBtcPurchased: prevDataPoint.totalBtcPurchased + newBtcPurchased,
      });
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
