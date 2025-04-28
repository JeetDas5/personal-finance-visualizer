import { runCors } from "@/lib/cors";
import dbConnect from "@/lib/db";
import Budget from "@/models/Budget";
import { NextResponse } from "next/server";

//Edit a budget
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await runCors(request, {});
    await dbConnect();
    const { id: budgetId } = await context.params;
    const body = await request.json();
    const updateData: any = {};

    if (body.amount !== undefined) updateData.amount = body.amount;
    if (body.month !== undefined) updateData.month = body.month;
    if (body.category !== undefined) updateData.category = body.category;

    const updatedBudget = await Budget.findByIdAndUpdate(
      budgetId,
      updateData,
      { new: true }
    );

    if (!updatedBudget) {
      return NextResponse.json(
        { message: "Budget not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedBudget, { status: 200 });
  } catch (error) {
    console.error("Error updating budget:", error);
    return NextResponse.json(
      { message: "Error updating budget" },
      { status: 500 }
    );
  }
}

//Delete a budget
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await runCors(request, {});
    await dbConnect();
    const { id: budgetId } = await context.params;

    const deletedBudget = await Budget.findByIdAndDelete(budgetId);

    if (!deletedBudget) {
      return NextResponse.json(
        { message: "Budget not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Budget deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting budget:", error);
    return NextResponse.json(
      { message: "Error deleting budget" },
      { status: 500 }
    );
  }
}
