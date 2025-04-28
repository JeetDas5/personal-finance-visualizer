import { Transaction } from "@/types/TransactionsType";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface CategoryPieChartProps {
  transactions: Transaction[];
}

const colors = [
  "#8884d8",
  "#82ca9d",
  "#ff7300",
  "#d0ed57",
  "#ffc658",
  "#a4de6c",
  "#8dd1e1",
];

const getCellColor = (index: number) => {
  return colors[index % colors.length];
};

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
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        label
      >
        {data.map((_entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={getCellColor(index)}
            className="hover:cursor-pointer hover:opacity-80 transition-transform duration-200"
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};
