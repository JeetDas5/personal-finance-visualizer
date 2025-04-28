"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

import { TransactionForm } from "../Transactions/TransactionForm";
import { TransactionList } from "../Transactions/TransactionList";
import BudgetForm from "../Budgets/BudgetForm";
import BudgetList from "../Budgets/BudgetList";
import BudgetVsActualChart from "../Charts/BudgetVsActualChart";
import { MonthlyBarChart } from "../Charts/MonthlyBarChart";
import { CategoryPieChart } from "../Charts/CategoryPieChart";
import SpendingInsights from "../Charts/SpendingInsights";
import { Budget } from "@/types/Budgets";
import { Transaction } from "@/types/TransactionsType";
import Hero from "../Hero/Hero";
import Navbar from "./Navbar";

interface DashboardProps {
  transactions: Transaction[];
  refreshTransactions?: () => void;
}

export const Dashboard = ({
  transactions,
  refreshTransactions,
}: DashboardProps) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [budgetTotal, setBudgetTotal] = useState<number>(0);
  const [actualTotal, setActualTotal] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("home");

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("/api/budgets");
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const fetchBudgetSummary = async () => {
    try {
      const response = await axios.get("/api/budgets/summary");
      setBudgetTotal(response.data.totalBudget);
    } catch (error) {
      console.error("Error fetching total budget:", error);
    }
  };

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
    <div className="h-full md:max-h-screen overflow-hidden">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="max-w-7xl mx-auto pt-8 px-5">
        {activeTab === "home" && (
          <Hero onGetStarted={() => setActiveTab("transactions")} />
        )}
        <main className="max-w-7xl mx-auto py-10 px-5 space-y-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {activeTab === "transactions" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TransactionForm
                    isEditing={!!selectedTransaction}
                    selectedTransaction={selectedTransaction}
                    refreshTransactions={handleRefresh}
                  />
                  <TransactionList
                    transactions={transactions}
                    onEdit={handleTransactionEdit}
                    onDelete={handleTransactionDelete}
                  />
                </div>
              )}

              {activeTab === "budgets" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
                  <BudgetForm
                    isEditing={!!selectedBudget}
                    selectedBudget={selectedBudget!}
                    refreshBudgets={handleRefresh}
                  />
                  <BudgetList
                    budgets={budgets}
                    onEdit={handleBudgetEdit}
                    onDelete={handleBudgetDelete}
                  />
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <MonthlyBarChart transactions={transactions} />
                  <CategoryPieChart transactions={transactions} />
                </div>
              )}

              {activeTab === "insights" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <BudgetVsActualChart
                    budget={budgetTotal}
                    actual={actualTotal}
                  />
                  <SpendingInsights budget={budgetTotal} actual={actualTotal} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
