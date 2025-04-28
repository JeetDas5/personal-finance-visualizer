// components/BudgetForm.tsx
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Categories from "@/types/Categories";
import Loader from "../Global/Loader";
import { Budget } from "@/types/Budgets";

interface BudgetFormProps {
  isEditing: boolean;
  selectedBudget?: Budget;
  refreshBudgets: () => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({
  isEditing,
  selectedBudget,
  refreshBudgets,
}) => {
  const [formState, setFormState] = useState({
    category: "",
    amount: "",
    month: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && selectedBudget) {
      setFormState({
        category: selectedBudget.category,
        amount: selectedBudget.amount.toString(),
        month: selectedBudget.month,
      });
    }
  }, [isEditing, selectedBudget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && selectedBudget?._id) {
        await axios.put(`/api/budgets/${selectedBudget._id}`, formState);
        toast.success("Budget updated!");
      } else {
        await axios.post("/api/budgets", formState);
        toast.success("Budget added!");
      }
      setFormState({ category: "", amount: "", month: "" });
      refreshBudgets();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.error("Budget for this month already exists.");
      } else {
        console.error(error);
        toast.error("Failed to submit budget.");
      }
    }
    setLoading(false);
  };
  return (
    <>
      {loading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-lg shadow-md w-full md:w-[40vw] text-center md:text-start flex flex-col gap-4"
      >
        <h2 className="text-2xl text-center font-semibold mb-5 text-blue-600">
          {isEditing ? "Edit" : "Add"} Budget
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            className="w-full px-4 py-2 border rounded-lg cursor-pointer"
            value={formState.category}
            onChange={(e) =>
              setFormState({ ...formState, category: e.target.value })
            }
            required
          >
            <option value="">Select a category</option>
            {Categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg"
            value={formState.amount}
            onChange={(e) =>
              setFormState({ ...formState, amount: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Month</label>
          <input
            type="month"
            className="w-full px-4 py-2 border rounded-lg cursor-pointer"
            value={formState.month}
            onChange={(e) =>
              setFormState({ ...formState, month: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg cursor-pointer"
        >
          {isEditing ? "Update Budget" : "Add Budget"}
        </button>
      </form>
    </>
  );
};

export default BudgetForm;
