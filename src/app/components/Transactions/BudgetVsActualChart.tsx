// components/BudgetVsActualChart.tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

interface BudgetVsActualProps {
  budget: number;
  actual: number;
}

const BudgetVsActualChart: React.FC<BudgetVsActualProps> = ({ budget, actual }) => {
  const data = [
    { name: 'Budget', amount: budget },
    { name: 'Actual', amount: actual },
  ];

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetVsActualChart;
