import usePortfolioCalcuations from '@/hooks/usePortfolioCalcuations';
import { TimeSeriesPoint } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const ProjectionChart = () => {
  const { calculatedPortfolioValue } = usePortfolioCalcuations();
  const timeSeriesData = calculatedPortfolioValue?.timeSeriesData || [];

  const btcPriceDomain = useMemo(() => {
    if (!timeSeriesData.length) return [0, 0];
    const btcPrices = timeSeriesData.map((d) => d.btcPrice);
    const startBtcPrice = btcPrices[0];
    const endBtcPrice = btcPrices[btcPrices.length - 1];
    const minBtcPrice = Math.min(startBtcPrice, endBtcPrice);
    const maxBtcPrice = Math.max(startBtcPrice, endBtcPrice);
    return [minBtcPrice * 0.5, maxBtcPrice * 1.5];
  }, [timeSeriesData]);

  const memoizedFormatXAxisDate = useMemo(() => {
    return (date: Date) => formatXAxisDate(date, timeSeriesData);
  }, [timeSeriesData]);

  if (!calculatedPortfolioValue) {
    return null;
  }

  return (
    <div className="mb-2 h-[300px] w-full md:h-[500px]">
      <div className="text-secondary bg-secondary flex h-full w-full items-center justify-center">
        <ResponsiveContainer width="90%" height="80%">
          <ComposedChart
            data={timeSeriesData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="date"
              tickFormatter={memoizedFormatXAxisDate}
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="left"
              dataKey="portfolioValue"
              orientation="left"
              stroke="#8884d8"
            />
            <YAxis
              yAxisId="right"
              dataKey="btcPrice"
              orientation="right"
              stroke="#82ca9d"
              domain={btcPriceDomain}
              tickFormatter={(value: number) => formatCurrency(value) || '$0'}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;

                const dataPoint = payload[0].payload;
                return <CustomTooltip dataPoint={dataPoint} />;
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Area
              type="monotone"
              dataKey="portfolioValue"
              stroke="#8884d8"
              fill="#8884d8"
              yAxisId="left"
              name="Portfolio Value"
            />
            <Area
              type="monotone"
              dataKey={(data) => data.portfolioValue - data.totalInvested}
              stroke="#4CAF50"
              fill="#4CAF50"
              fillOpacity={0.3}
              yAxisId="left"
              name="Profits"
            />
            <Line
              type="monotone"
              dataKey="btcPrice"
              stroke="#82ca9d"
              yAxisId="right"
              name="Bitcoin Price"
              dot={false}
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectionChart;

const CustomTooltip = ({ dataPoint }: { dataPoint: TimeSeriesPoint }) => {
  const profits = useMemo(
    () => dataPoint.portfolioValue - dataPoint.totalInvested,
    [dataPoint]
  );
  return (
    <div className="rounded border bg-white p-2 shadow">
      <div>Portfolio Value: {formatCurrency(dataPoint.portfolioValue)}</div>
      <div>Total Invested: {formatCurrency(dataPoint.totalInvested)}</div>
      <div>Profits: {formatCurrency(profits)}</div>
      <div>Bitcoin Price: {formatCurrency(dataPoint.btcPrice)}</div>
    </div>
  );
};

const formatXAxisDate = (date: Date, timeSeriesData: TimeSeriesPoint[]) => {
  const firstDate = timeSeriesData[0].date;
  const lastDate = timeSeriesData[timeSeriesData.length - 1].date;
  const monthsDiff = dayjs(lastDate).diff(dayjs(firstDate), 'month');

  const d = new Date(date);

  if (monthsDiff <= 6) {
    // Monthly: "Jan", "Feb", etc.
    return dayjs(d).format('MMM');
  } else if (monthsDiff <= 24) {
    // Quarterly: "Q1 '23", etc.
    const quarter = Math.floor(d.getMonth() / 3) + 1;
    const year = d.getFullYear().toString().slice(-2);
    return `Q${quarter}'${year}`;
  } else {
    // Yearly: "'23", "'24", etc.
    return "'" + d.getFullYear().toString().slice(-2);
  }
};
