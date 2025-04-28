/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect, useState } from "react";
import { Dashboard } from "../components/Global/Dashboard";
import axios from "axios";
import Loader from "../components/Global/Loader";
import Footer from "../components/Global/Footer";

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


    if (loading) return <>
        <div className="w-full h-screen">
            <Loader />
        </div>
    </>;

    return (
        <div className="overflow-x-hidden h-screen">
            <Dashboard transactions={transactions} refreshTransactions={refreshTransactions} />
            <Footer/>
        </div>
    );
};

export default HomePage;
