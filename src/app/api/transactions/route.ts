import connectDB from "../../../lib/db";
import Transactions from "@/models/Transactions";
import { NextResponse } from "next/server";
import Categories from "@/types/Categories";
import { runCors } from "@/lib/cors";

//Create a new transaction
export async function POST(request: Request) {
  await runCors(request, {});
  try {
    await connectDB();
    const body = await request.json();
    const { amount, date, description, category } = body;
    if (!amount || !date || !description || !category) {
      return new Response("Missing required fields", { status: 400 });
    }
    if (!Categories.includes(category)) {
      return new Response("Invalid category", { status: 403 });
    }
    const newTransaction = await Transactions.create({
      amount,
      date,
      description,
      category,
    });
    return new NextResponse(newTransaction, { status: 201 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return new Response("Failed to create transaction", { status: 500 });
  }
}

//Get all transactions
export async function GET() {
  try {
    await connectDB();
    const transactions = await Transactions.find({}).sort({ date: -1 });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return new Response("Failed to fetch transactions", { status: 500 });
  }
}


