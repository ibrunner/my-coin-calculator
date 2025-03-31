import CalculatorForm from "@/features/CalculatorForm";
import Chart from "@/features/ProjectionChart";
import Summary from "@/features/summary";

interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = () => {
  return (
    <div className="min-h-screen bg-gray-500">
      {/* Header */}
      <header className="w-full bg-slate-800 text-white p-4 sticky top-0 z-10 shadow-md">
        <h1>My Coin Calculator</h1>
      </header>
      {/* Main */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:gap-4">
          <div className="w-full md:w-5/10 mb-6 md:mb-0 bg-white rounded-lg p-4 shadow-md">
            <CalculatorForm />
          </div>
          <div className="w-full md:w-5/10 bg-white rounded-lg p-4 shadow-md">
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
