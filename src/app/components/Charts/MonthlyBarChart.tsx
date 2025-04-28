import { Transaction } from "@/types/TransactionsType";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from "recharts";

interface MonthlyBarChartProps {
  transactions: Transaction[];
}

export const MonthlyBarChart = ({ transactions }: MonthlyBarChartProps) => {
  const monthlyData: { [key: string]: number } = {};
  transactions.forEach((transaction) => {
    const date = new Date(transaction.date!);
    const month = date.toLocaleString("default", { month: "long", year: "numeric" });
    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }
    monthlyData[month] += transaction.amount!;
  });

  const data = Object.keys(monthlyData).map((key) => ({
    month: key,
    total: monthlyData[key],
  }));

  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4 text-blue-600 text-center">Monthly Bar Chart</h2>

      {/* Responsive Container */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#6bd1e3" />
            <XAxis dataKey="month">
              <Label value="Months" position="bottom" fontSize={12} fontWeight={600} offset={-5} />
            </XAxis>
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: "#f0f9ff", borderRadius: "8px" }} />
            <Legend />
            <Bar dataKey="total" fill="#278fd9" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
