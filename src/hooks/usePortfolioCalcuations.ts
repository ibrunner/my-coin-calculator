import { useMemo } from 'react';
import { generateWeeklyDataPoints } from '../lib/calculations';
import useFormStore from '../lib/store';
import useBtcPrice from './useBtcPrice';

const usePortfolioCalcuations = () => {
  const { formData, durationMonths } = useFormStore();
  const { data: btcPrice, isLoading } = useBtcPrice();

  const calculatedPortfolioValue = useMemo(() => {
    if (!btcPrice) {
      return null;
    }
    const timeSeriesData = generateWeeklyDataPoints({
      ...formData,
      durationMonths,
      btcPrice,
    });
    return {
      timeSeriesData,
      totalInvestment: timeSeriesData[timeSeriesData.length - 1].totalInvested,
      estimatedValue: timeSeriesData[timeSeriesData.length - 1].portfolioValue,
      profit:
        timeSeriesData[timeSeriesData.length - 1].portfolioValue -
        timeSeriesData[0].totalInvested,
    };
  }, [btcPrice, formData]);

  return { calculatedPortfolioValue, isLoading };
};

export default usePortfolioCalcuations;
