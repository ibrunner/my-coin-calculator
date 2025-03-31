import CalculatorForm from '@/features/CalculatorForm';
import Chart from '@/features/ProjectionChart';
import Summary from '@/features/Summary';

interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = () => {
  return (
    <div className="min-h-screen bg-gray-500">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full bg-slate-800 p-4 text-white shadow-md">
        <h1>My Coin Calculator</h1>
      </header>
      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:gap-4">
          <div className="md:w-5/10 mb-6 w-full rounded-lg bg-white p-4 shadow-md md:mb-0">
            <CalculatorForm />
          </div>
          <div className="md:w-5/10 w-full rounded-lg bg-white p-4 shadow-md">
            <Chart />
            <Summary />
          </div>
        </div>
      </div>
      {/* Footer */}
    </div>
  );
};

export default AppLayout;
