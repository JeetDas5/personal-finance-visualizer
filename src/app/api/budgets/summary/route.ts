
import dbConnect from "@/lib/db";
import Budget from "@/models/Budget";
import Transactions from "@/models/Transactions";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const budgets = await Budget.find({});
    const transactions = await Transactions.find({});

    const actualSpending: { [key: string]: { [key: string]: number } } = {};

    transactions.forEach((transaction) => {
      const month = transaction.date.toISOString().slice(0, 7); // YYYY-MM format
      if (!actualSpending[month]) {
        actualSpending[month] = {};
      }
      if (!actualSpending[month][transaction.category]) {
        actualSpending[month][transaction.category] = 0;
      }
      actualSpending[month][transaction.category] += transaction.amount;
    });

    const budgetComparision = budgets.map((budget) => {
        const actual = actualSpending[budget.month]?.[budget.category] || 0;
      return {
        month: budget.month,
        category: budget.category,
        budgeted: budget.amount,
        spent: actual,
        remaining: budget.amount - actual,
      };
    });

    //Total Budget
    const totalBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0);

    return NextResponse.json(
      {
        message: "Budget summary fetched successfully",
        totalBudget,
        budgetComparision,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching budget summary:", error);
    return NextResponse.json(
      { message: "Error fetching budget summary" },
      { status: 500 }
    );
  }
}
