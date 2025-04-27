import { Transaction } from "@/types/TransactionsType";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from "recharts";

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
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Monthly Bar Chart</h2>
      <BarChart width={500} height={300} data={data} className="mx-auto mt-10" margin={{ top: 15, right: 30, left: 20, bottom: 5 }} >
        <CartesianGrid strokeDasharray="3 3" color="#6bd1e3" />
        <XAxis dataKey="month">
          <Label className="text-red-400" position="bottom" fontSize={12} fontWeight={600} offset={0} />
        </XAxis>
        <YAxis />
        <Tooltip labelClassName="text-cyan-400" />
        <Legend />
        <Bar dataKey="total" fill="#278fd9" />
      </BarChart>
    </div>
  );
};
