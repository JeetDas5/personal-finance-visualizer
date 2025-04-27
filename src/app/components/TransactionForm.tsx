'use client'

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { TransactionFormProps, TransactionFormState } from "../../types/TransactionsType";
import Categories from "@/types/Categories";
import Loader from "./Loader";

export const TransactionForm: React.FC<TransactionFormProps> = ({ isEditing, selectedTransaction ,refreshTransactions}: TransactionFormProps) => {
  const [formState, setFormState] = useState<TransactionFormState>({
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && selectedTransaction) {
      const formattedDate = new Date(selectedTransaction.date!).toISOString().slice(0, 10);
      setFormState({
        amount: selectedTransaction.amount!.toString(),
        date: formattedDate,
        category: selectedTransaction.category!,
        description: selectedTransaction.description!,
      });
    }
  }, [isEditing, selectedTransaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate amount is positive
    if (parseInt(formState.amount) <= 0) {
      toast.error("Amount should be a positive value");
      return;
    }

    try {
      setLoading(true);

      if (isEditing) {
        await axios.put(`/api/transactions/${selectedTransaction!._id}`, {
          amount: formState.amount,
          date: formState.date,
          category: formState.category,
          description: formState.description,
        });
        toast.success("Transaction updated!");
      } else {
        await axios.post("/api/transactions", {
          amount: formState.amount,
          date: formState.date,
          category: formState.category,
          description: formState.description,
        });
        toast.success("Transaction added!");
      }

      // Clear form
      setFormState({
        amount: "",
        date: "",
        category: "",
        description: "",
      });
     if (refreshTransactions) {
       refreshTransactions();
     }
    } catch (error) {
      console.error("Error submitting transaction:", error);
      toast.error("Failed to submit transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-md max-w-3xl mb-4 mx-auto">
        <h2 className="text-xl font-semibold mb-5 text-blue-600">{isEditing ? "Edit" : "Add"} Transaction</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg"
            value={formState.amount}
            onChange={(e) => setFormState({ ...formState, amount: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            className="w-full px-4 py-2 border rounded-lg cursor-pointer"
            value={formState.date}
            onChange={(e) => setFormState({ ...formState, date: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            className="w-full px-4 py-2 border rounded-lg cursor-pointer"
            value={formState.category}
            onChange={(e) => setFormState({ ...formState, category: e.target.value })}
            required
          >
            <option value="">Select a category</option>
            {Categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg cursor-pointer"
            value={formState.description}
            onChange={(e) => setFormState({ ...formState, description: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer"
        >
          {isEditing ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>
    </>
  );
};
