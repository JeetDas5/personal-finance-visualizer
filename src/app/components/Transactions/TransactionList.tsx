/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";

import { Transaction } from "@/types/TransactionsType";
import React from "react";
import { TransactionListProps } from "@/types/TransactionsType";
import toast from "react-hot-toast";

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
  refreshTransactions,
}: TransactionListProps) => {
  const [updatedTansactions, setUpdatedTransactions] =
    useState<Transaction[]>(transactions);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/transactions");
      const data = await response.json();
      setUpdatedTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to fetch transactions.");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleRefresh = async () => {
    await fetchTransactions();
    if (refreshTransactions) {
      refreshTransactions();
    }
  };

  return (
    <div
      className="bg-white p-5 md:p-6 rounded-lg shadow-lg max-w-full md:w-[40vw] mx-4 md:mx-10 max-h-[50vh] md:max-h-[90vh] overflow-y-auto overflow-x-hidden 
      scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100"
    >
      <h2 className="text-2xl font-semibold mb-6 text-blue-600 text-center">
        Recent Transactions
      </h2>

      <ul className="space-y-4">
        {transactions.map((transaction) => (
          <li
            key={transaction._id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center
         border border-gray-300 p-4 rounded-lg hover:shadow-md transition duration-300 ease-in-out transform hover:scale-[1.03]"
          >
            <div className="space-y-1">
              <div className="text-lg font-semibold text-gray-800">
                Rs. {transaction.amount}
              </div>
              <div className="text-sm text-gray-500">
                {formatDate(transaction.date!)}
              </div>
              <div className="text-sm text-blue-500">
                {transaction.category}
              </div>
              <div className="text-xs text-gray-600">
                {transaction.description}
              </div>
            </div>

            <div className="flex space-x-3 mt-4 md:mt-0">
              <button
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 transition-colors duration-200 cursor-pointer border border-blue-600 rounded px-3 py-1"
                onClick={async () => {
                  onEdit(transaction);
                  await fetchTransactions();
                  handleRefresh();
                }}
              >
                Edit
              </button>

              <button
                className="text-red-600 hover:text-red-800 hover:bg-red-100 transition-colors duration-200 cursor-pointer border border-red-600 rounded px-3 py-1"
                onClick={async () => {
                  onDelete(transaction._id!);
                  await fetchTransactions();
                  handleRefresh();
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
