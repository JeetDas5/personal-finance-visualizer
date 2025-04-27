import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface MonthlyBarChartProps {
  transactions: any[];
}

export const MonthlyBarChart = ({ transactions }: MonthlyBarChartProps) => {
  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).getMonth();
    if (!acc[month]) acc[month] = 0;
    acc[month] += transaction.amount;
    return acc;
  }, {});

  const data = Object.keys(monthlyData).map((key) => ({
    month: key,
    total: monthlyData[key],
  }));

  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="total" fill="#8884d8" />
    </BarChart>
  );
};
