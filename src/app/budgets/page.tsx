"use client";
import { useMemo, useState } from 'react';
import jsonData from '../data.json';
import BudgetCard from './budgetcard';
import BudgetSummary from './budgetsummary';

export default function Budgets() {
    const [init, setInit] = useState([
        { name: 'Entertainment', value: 50, used: 0, theme: '#277C78', data: jsonData.transactions.filter(entry => entry.category == 'Entertainment').slice(0, 3), date: jsonData.transactions.filter(entry => entry.category == 'Entertainment').slice(0, 3).map(entry => entry.date) },
        { name: 'Personal Care', value: 100, used: 0, theme: '#626070', data: jsonData.transactions.filter(entry => entry.category == 'Personal Care').slice(0, 3), date: jsonData.transactions.filter(entry => entry.category == 'Personal Care').slice(0, 3).map(entry => entry.date) },
        { name: 'Dining Out', value: 75, used: 0, theme: '#F2CDAC', data: jsonData.transactions.filter(entry => entry.category == 'Dining Out').slice(0, 3), date: jsonData.transactions.filter(entry => entry.category == 'Dinig Out').slice(0, 3).map(entry => entry.date) },
        { name: 'Bills', value: 750, used: 0, theme: '#82C9D7', data: jsonData.transactions.filter(entry => entry.category == 'Bills').slice(0, 3), date: jsonData.transactions.filter(entry => entry.category == 'Bills').slice(0, 3).map(entry => entry.date) },
    ]);

    const budgets = useMemo(() => {
        const spent = init.map(b => b.data.reduce((accumulator, currentValue) => {
            const amt = accumulator + currentValue.amount;
            return amt
        }, 0) * -1);
        
        const b = init.map((budget, index) => {
            return { ...budget, used: spent[index] };
        });

        return b;
    }, [init]);

    return (
        <div className="w-full bg-light-2 px-16 py-14">
            <div className="flex items-center justify-between mb-5">
                <h1 className='text-2xl font-semibold'>Budgets</h1>
                <button className='bg-dark text-light px-4 py-2 rounded-lg cursor-pointer hover:bg-light-text'>+ Add New Budget</button>
            </div>
            <div className="grid grid-cols-3 gap-7">
                <BudgetSummary budgets={budgets} />
                <div className="col-start-2 col-span-2 flex flex-col gap-y-7">
                    { budgets.map((budget, index) => (
                        <BudgetCard key={index} budget={budget} />
                    )) }
                </div>
            </div>
        </div>
    );
}
