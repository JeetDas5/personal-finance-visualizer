import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import Budget from "@/models/Budget";
import Categories from "@/types/Categories";

//Create a new budget
export async function POST(request: Request) {
  try {
    await dbConnect();
    const { category, amount, month } = await request.json();

    if (!category || !amount || !month) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!Categories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 403 });
    }
    if (amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be greater than 0" },
        { status: 400 }
      );
    }
    if (month < 1 || month > 12) {
      return NextResponse.json(
        { error: "Month must be between 1 and 12" },
        { status: 400 }
      );
    }
    const existingBudget = await Budget.findOne({ month, category });
    if (existingBudget) {
      return NextResponse.json(
        { error: "Budget already exists for this month and category" },
        { status: 409 }
      );
    }

    const newBudget = await Budget.create({
      category,
      amount,
      month,
    });
    return NextResponse.json(newBudget, { status: 201 });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json(
      { error: "Failed to fetch budgets" },
      { status: 500 }
    );
  }
}

//Get all budgets
export async function GET() {
  try {
    await dbConnect();
    const budgets = await Budget.find({});
    return NextResponse.json(budgets, { status: 200 });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json(
      { error: "Failed to fetch budgets" },
      { status: 500 }
    );
  }
}
