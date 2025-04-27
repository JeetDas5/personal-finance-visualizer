import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  date: Date;
  amount: number;
  description: string;
  category: string;
}

const TransactionSchema: Schema = new Schema(
  {
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Food",
        "Shopping",
        "Transportation",
        "Utilities",
        "Entertainment",
        "Others",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);
