import connectDB from "../../../../lib/db";
import Transactions from "@/models/Transactions";
import { NextResponse } from "next/server";
import {Transaction} from "@/types/TransactionsType";
import Categories from "@/types/Categories";
import { runCors } from "@/lib/cors";

//Update a transaction
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  // await runCors(request, {});
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await request.json();
    if (!id) {
      return new Response("Transaction ID is required", { status: 400 });
    }
    const updatedTransaction: Transaction = {};
    if (body.description) {
      updatedTransaction.description = body.title;
    }
    if (body.amount) {
      updatedTransaction.amount = body.amount;
    }
    if (body.date) {
      updatedTransaction.date = body.date;
    }
    if (body.category) {
      if (!Categories.includes(body.category)) {
        return new Response("Invalid category", { status: 403 });
      }
      updatedTransaction.category = body.category;
    }
    if (Object.keys(updatedTransaction).length === 0) {
      return new Response("No fields to update", { status: 400 });
    }
    const transaction = await Transactions.findByIdAndUpdate(
      id,
      updatedTransaction,
      { new: true }
    );
    if (!updatedTransaction) {
      return new Response("Transaction not found", { status: 404 });
    }
    return NextResponse.json(transaction, { status: 200 });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return new Response("Failed to update transaction", { status: 500 });
  }
}

//Delete a transaction
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  await runCors(request, {});
  try {
    await connectDB();
    const { params } = await context;
    const { id } = await params;
    const deletedTransaction = await Transactions.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return new Response("Transaction not found", { status: 404 });
    }
    return new Response("Transaction deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return new Response("Failed to delete transaction", { status: 500 });
  }
}
