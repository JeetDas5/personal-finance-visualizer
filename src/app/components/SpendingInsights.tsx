import React from 'react';
interface SpendingInsightsProps {
  budget: number;
  actual: number;
}

const SpendingInsights: React.FC<SpendingInsightsProps> = ({ budget, actual }) => {
  const difference = budget - actual;
  const isOver = difference < 0;

  return (
    <div className="bg-white p-5 rounded-lg shadow-md text-center max-w-lg ">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Spending Insights</h2>
      {isOver ? (
        <p className="text-red-600 font-semibold">
          You are <span className="font-bold">${Math.abs(difference).toFixed(2)}</span> over your budget!
        </p>
      ) : (
        <p className="text-green-600 font-semibold">
          Great! You are <span className="font-bold">${difference.toFixed(2)}</span> under your budget.
        </p>
      )}
    </div>
  );
};

export default SpendingInsights;
