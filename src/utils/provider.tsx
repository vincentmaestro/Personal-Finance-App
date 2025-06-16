"use client";
import React, { createContext, useContext, useState } from "react";
import jsonData from '@/app/data.json';
import { balance, budgets, pots, transactions } from '@/utils/types';

const dataContext = createContext<{
    balance: balance,
    setBalance: React.Dispatch<React.SetStateAction<balance>>,
    transactions: transactions,
    budgets: budgets,
    setBudgets: React.Dispatch<React.SetStateAction<budgets>>,
    pots: pots,
    setPots: React.Dispatch<React.SetStateAction<pots>>,
    recurringBills: transactions
} | undefined>(undefined);

export default function DataProvider({ children }: {
    children: React.ReactNode
}) {
    const [balance, setBalance] = useState(jsonData.balance);
    const [initialBudgets, setInitialBudgets] = useState([
        {
            name: 'Entertainment',
            value: 50,
            spent: 0,
            theme: '#277C78',
            transactions: jsonData.transactions.filter(entry => entry.category == 'Entertainment').slice(0, 3),
            date: jsonData.transactions.filter(entry => entry.category == 'Entertainment').slice(0, 3).map(entry => entry.date)
        },
        {
            name: 'Personal Care',
            value: 100,
            spent: 0,
            theme: '#626070',
            transactions: jsonData.transactions.filter(entry => entry.category == 'Personal Care').slice(0, 3),
            date: jsonData.transactions.filter(entry => entry.category == 'Personal Care').slice(0, 3).map(entry => entry.date)
        },
        {
            name: 'Dining Out',
            value: 75,
            spent: 0,
            theme: '#934F6F',
            transactions: jsonData.transactions.filter(entry => entry.category == 'Dining Out').slice(0, 3),
            date: jsonData.transactions.filter(entry => entry.category == 'Dining Out').slice(0, 3).map(entry => entry.date)
        },
        {
            name: 'Bills',
            value: 750,
            spent: 0,
            theme: '#82C9D7',
            transactions: jsonData.transactions.filter(entry => entry.category == 'Bills').slice(0, 3),
            date: jsonData.transactions.filter(entry => entry.category == 'Bills').slice(0, 3).map(entry => entry.date)
        }
    ]);

    const spent = initialBudgets.map(b => b.transactions.reduce((accumulator, currentValue) => {
        const amt = accumulator + currentValue.amount;
        return amt
    }, 0) * -1);
      
    const budgets = initialBudgets.map((budget, index) => {
        return { ...budget, spent: spent[index] };
    });

    //Obtain percentage completed for each pot and append to original pot data before setting as default/initial state

    const percentSaved = jsonData.pots.map(pot => ((pot.total/pot.target) * 100).toFixed(2));
    const p = jsonData.pots.map((pot, index) => ({ ...pot, percent: percentSaved[index] }));
    const [initialPots, setInitialPots] = useState(p);

    //this initial state is used to initialize pots value in the context provider below


    // Obtain transactions that are reccuring and filter out repeated transactions,
    // obtain their due dates which will be used to initialize recurring bills default/initial state

    const withoutRepetition = jsonData.transactions
        .filter(bill => bill.recurring == true)
        .reduce((accumulator: transactions, currentValue) => {
            if(!accumulator.some(t => t.name == currentValue.name)) accumulator.push(currentValue);
            return accumulator;
    }, []);
    
    const referenceDate = new Date('2024-08-19T14:23:11Z').getUTCDate();
    const dueDatesObtained = withoutRepetition.map(bill => {
        const datePaid = new Date(bill.date).getUTCDate();

        if(datePaid < referenceDate || datePaid > referenceDate + 5) return { ...bill, isDueSoon: false };
        else return { ...bill, isDueSoon: true };
    });

    // dueDatesObtained is then used to initialize recurringBills default state in the context provider below

    return (
        <dataContext.Provider value={{
            balance: balance,
            setBalance: setBalance,
            transactions: jsonData.transactions,
            budgets: budgets,
            setBudgets: setInitialBudgets,
            pots: initialPots,
            setPots: setInitialPots,
            recurringBills: dueDatesObtained
        }}>
            { children }
        </dataContext.Provider>
    )
}

export function useData() {
    const context = useContext(dataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
}