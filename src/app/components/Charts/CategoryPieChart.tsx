import { Transaction } from "@/types/TransactionsType";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface CategoryPieChartProps {
  transactions: Transaction[];
}

export const CategoryPieChart = ({ transactions }: CategoryPieChartProps) => {
  const categoryData: { [key: string]: number } = {};
  transactions.forEach((transaction) => {
    const category = transaction.category || "Uncategorized";
    if (!categoryData[category]) {
      categoryData[category] = 0;
    }
    categoryData[category] += transaction.amount!;
  });

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
