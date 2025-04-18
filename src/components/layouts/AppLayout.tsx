import logo from '@/assets/logo-small.png';
import BitcoinPrice from '@/features/BitcoinPrice';
import CalculatorForm from '@/features/CalculatorForm';
import Chart from '@/features/ProjectionChart';
import Summary from '@/features/Summary';

const AppLayout = () => {
  return (
    <div className="bg-tertiary text-primary h-full min-h-screen">
      {/* Header */}
      <header className="bg-secondary sticky top-0 z-10 w-full p-4 text-white shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Calculator Coin" className="h-16 w-16" />
            <h1 className="text-2xl font-bold">My Coin Calculator</h1>
          </div>
          <BitcoinPrice />
        </div>
      </header>
      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:gap-4">
          <div className="md:w-5/10 mb-2 w-full md:mb-0">
            <CalculatorForm />
          </div>
          <div className="md:w-5/10 w-full">
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
