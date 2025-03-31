// interface SummaryProps {
//   // Add your props here
// }

const Summary = () => {
  return (
    <>
      <div className="mb-2 rounded-lg bg-white p-4 shadow-md">
        <h2>Your Results</h2>
        <div className="grid grid-cols-2 gap-y-2">
          <div className="text-left text-gray-600">Total Invested:</div>
          <div className="text-right font-medium">$2,400</div>
          <div className="text-left text-gray-600">Estimated Value:</div>
          <div className="text-right font-medium">$3,750</div>
        </div>
      </div>
      <div className="rounded-lg bg-white p-4 shadow-md">
        If you invested $50 weekly for 24 months you could have $3,750!
      </div>
    </>
  );
};

export default Summary;
