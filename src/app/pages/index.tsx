'use client'

import React, { useEffect, useState } from "react";
import { Dashboard } from "../components/Dashboard";
import axios from "axios";
import Loader from "../components/Loader";

const HomePage = () => {
    const [transactions, setTransactions] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshTransactions = async () => {
        const fetchData = async () => {
            try {
                const transactionResponse = await axios.get("/api/transactions");
                const budgetResponse = await axios.get("/api/budgets");
                setTransactions(transactionResponse.data);
                setBudgets(budgetResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }

    useEffect(() => {
        refreshTransactions();
    }, []);


    if (loading) return <Loader />;

    return (
        <div>
            <Dashboard transactions={transactions} budgets={budgets} refreshTransactions={refreshTransactions} />
        </div>
    );
};

export default HomePage;
