import React, { useState } from "react";
import { MonthlyBarChart } from "./MonthlyBarChart";
import { CategoryPieChart } from "./CategoryPieChart";
import { TransactionForm } from "./TransactionForm";
import axios from "axios";
import { Transaction } from "@/types/TransactionsType";
import { Budget } from "@/types/Budgets";
import toast from "react-hot-toast";
import { TransactionList } from "./TransactionList";

interface DashboardProps {
  transactions: Transaction[];
  budgets: Budget[];
  refreshTransactions?: () => void;
}

export const Dashboard = ({ transactions,refreshTransactions }: DashboardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>({});


  const handleEdit = (transaction: Transaction) => {
    setIsEditing(true);
    setSelectedTransaction(transaction);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/transactions/${id}`);
      toast.success("Transaction deleted!");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <h1 className="text-3xl font-semibold text-white mb-5 text-center">Personal Finance Visualizer</h1>

      <TransactionForm isEditing={isEditing} selectedTransaction={selectedTransaction} refreshTransactions={refreshTransactions}/>

      <TransactionList
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        refreshTransactions={refreshTransactions}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div className="col-span-1">
          <MonthlyBarChart transactions={transactions} />
        </div>
        <div className="col-span-1">
          <CategoryPieChart transactions={transactions} />
        </div>
      </div>
    </div>
  );
};
