import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import Transaction from "@/models/Transactions";
import { runCors } from "@/lib/cors";

//Get the summary of transactions
export async function GET() {
  await runCors({}, {});
  try {
    await dbConnect();
    const transaction = await Transaction.find({}).sort({ date: -1 });
    if (!transaction || transaction.length === 0) {
      return NextResponse.json(
        { message: "No transactions found" },
        { status: 404 }
      );
    }
    const totalExpenses = transaction.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    const categoryBreakdown: { [key: string]: number } = {};
    transaction.forEach((transaction) => {
      if (categoryBreakdown[transaction.category]) {
        categoryBreakdown[transaction.category] += transaction.amount;
      } else {
        categoryBreakdown[transaction.category] = transaction.amount;
      }
    });
    const recentTransactions = transaction.slice(0, 5);
    return NextResponse.json({
      totalExpenses,
      categoryBreakdown,
      recentTransactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { message: "Error fetching transactions" },
      { status: 500 }
    );
  }
}
