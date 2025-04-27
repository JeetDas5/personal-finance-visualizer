import mongoose, { Schema, Document } from "mongoose";

export interface IBudget extends Document {
  amount: number;
  month: string;
  category: string;
}

const BudgetSchema: Schema = new Schema(
  {
    amount: { type: Number, required: true },
    month: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Budget || mongoose.model<IBudget>("Budget", BudgetSchema);
