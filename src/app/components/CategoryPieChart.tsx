import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface CategoryPieChartProps {
  transactions: any[];
}

export const CategoryPieChart = ({ transactions }: CategoryPieChartProps) => {
  const categoryData = transactions.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) acc[category] = 0;
    acc[category] += transaction.amount;
    return acc;
  }, {});

  const data = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};
