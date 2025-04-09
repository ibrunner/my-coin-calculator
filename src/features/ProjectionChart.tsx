import usePortfolioCalcuations from '@/hooks/usePortfolioCalcuations';
import { TimeSeriesPoint } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import dayjs from 'dayjs';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const ProjectionChart = () => {
  const { calculatedPortfolioValue } = usePortfolioCalcuations();

  if (!calculatedPortfolioValue) {
    return null;
  }

  const { timeSeriesData } = calculatedPortfolioValue;

  return (
    <div className="mb-2 h-[300px] w-full md:h-[500px]">
      <div className="text-secondary bg-secondary flex h-full w-full items-center justify-center">
        <ResponsiveContainer width="90%" height="80%">
          <AreaChart
            data={timeSeriesData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="date"
              tickFormatter={(date) => formatXAxisDate(date, timeSeriesData)}
              interval="preserveStartEnd"
            />
            <YAxis dataKey="portfolioValue" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;

                const dataPoint = payload[0].payload;
                return <CustomTooltip dataPoint={dataPoint} />;
              }}
            />
            <Area
              type="monotone"
              dataKey="portfolioValue"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectionChart;

const CustomTooltip = ({ dataPoint }: { dataPoint: TimeSeriesPoint }) => {
  return (
    <div className="rounded border bg-white p-2 shadow">
      <div>Portfolio Value: {formatCurrency(dataPoint.portfolioValue)}</div>
      <div>Total Invested: {formatCurrency(dataPoint.totalInvested)}</div>
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
