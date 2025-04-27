'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { MonthlyBarChart } from "../MonthlyBarChart";
import { CategoryPieChart } from "../CategoryPieChart";
import { TransactionForm } from "../Transactions/TransactionForm";
import { TransactionList } from "../Transactions/TransactionList";
import BudgetForm from "../Budgets/BudgetForm";
import BudgetList from "../Budgets/BudgetList";
import SpendingInsights from "../SpendingInsights";
import BudgetVsActualChart from "../Transactions/BudgetVsActualChart";
import { Budget } from "@/types/Budgets";
import { Transaction } from "@/types/TransactionsType";

interface DashboardProps {
  transactions: Transaction[];
  refreshTransactions?: () => void;
}

export const Dashboard = ({ transactions, refreshTransactions }: DashboardProps) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [budgetTotal, setBudgetTotal] = useState<number>(0);
  const [actualTotal, setActualTotal] = useState<number>(0);

  // Fetch budgets
  const fetchBudgets = async () => {
    try {
      const response = await axios.get("/api/budgets");
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  // Fetch total budget
  const fetchBudgetSummary = async () => {
    try {
      const response = await axios.get("/api/budgets/summary");
      setBudgetTotal(response.data.totalBudget);
    } catch (error) {
      console.error("Error fetching total budget:", error);
    }
  };

  // Fetch total actual expenses
  const fetchTransactionSummary = async () => {
    try {
      const response = await axios.get("/api/transactions/summary");
      setActualTotal(response.data.totalExpenses);
    } catch (error) {
      console.error("Error fetching total expenses:", error);
    }
  };

  useEffect(() => {
    fetchBudgets();
    fetchBudgetSummary();
    fetchTransactionSummary();
  }, []);

  const handleTransactionEdit = async (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleTransactionDelete = async (id: string) => {
    try {
      await axios.delete(`/api/transactions/${id}`);
      toast.success("Transaction deleted!");
      refreshTransactions?.();
      fetchTransactionSummary();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction.");
    }
  };

  const handleBudgetEdit = async (budget: Budget) => {
    setSelectedBudget(budget);
  };

  const handleBudgetDelete = async (id: string) => {
    try {
      await axios.delete(`/api/budgets/${id}`);
      toast.success("Budget deleted!");
      fetchBudgets();
      fetchBudgetSummary();
    } catch (error) {
      console.error("Error deleting budget:", error);
      toast.error("Failed to delete budget.");
    }
  };

  const handleRefresh = () => {
    fetchBudgets();
    fetchBudgetSummary();
    fetchTransactionSummary();
    setSelectedTransaction(null);
    setSelectedBudget(null);
  };


  return (
    <div className="max-w-7xl mx-auto py-10 px-5 space-y-10">
      <h1 className="text-3xl font-bold text-center text-blue-600">Personal Finance Dashboard</h1>

      {/* Forms Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TransactionForm
          isEditing={!!selectedTransaction}
          selectedTransaction={selectedTransaction}
          refreshTransactions={handleRefresh}
        />
        <BudgetForm
          isEditing={!!selectedBudget}
          selectedBudget={selectedBudget!}
          refreshBudgets={handleRefresh}
        />
      </div>

      {/* Lists Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TransactionList
          transactions={transactions}
          onEdit={handleTransactionEdit}
          onDelete={handleTransactionDelete}
        />
        <BudgetList
          budgets={budgets}
          onEdit={handleBudgetEdit}
          onDelete={handleBudgetDelete}
        />
      </div>


      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <MonthlyBarChart transactions={transactions} />
        <CategoryPieChart transactions={transactions} />
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <BudgetVsActualChart budget={budgetTotal} actual={actualTotal} />
        <SpendingInsights budget={budgetTotal} actual={actualTotal} />
      </div>
    </div>
  );
};
