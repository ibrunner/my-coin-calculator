import usePortfolioCalcuations from '@/hooks/usePortfolioCalcuations';
import useFormStore from '@/lib/store';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
// import useBtcPrice from '@/hooks/useBtcPrice';

const ProjectionChart = () => {
  const { formData } = useFormStore();
  const { initialInvestment } = formData;

  const { calculatedPortfolioValue } = usePortfolioCalcuations();

  // const { btcPrice } = useBtcPrice();

  const data = [
    {
      name: 'Start',
      portfolioValue: initialInvestment,
      // btcValue: 78000,
    },
    {
      name: 'End',
      portfolioValue: calculatedPortfolioValue?.estimatedValue,
      // btcValue: 100000,
    },
  ];

  return (
    <div className="mb-2 h-[300px] w-full md:h-[500px]">
      <div className="text-secondary bg-secondary flex h-full w-full items-center justify-center">
        <ResponsiveContainer width="90%" height="80%">
          <AreaChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
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
