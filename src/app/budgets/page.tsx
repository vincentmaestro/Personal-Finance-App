"use client";
import { createContext, useMemo, useState } from 'react';
import jsonData from '../data.json';
import BudgetCard from './budget-card';
import BudgetSummary from './budgetsummary';
import { budgets } from "@/utils/types";
import { categories as cat } from '@/utils/categories';
import AddBudget from '@/components/add-budget';

export const budgetsContext = createContext<{
    budgets: budgets,
    setBudgets: React.Dispatch<React.SetStateAction<budgets>>
} | undefined>(undefined);

export default function Budgets() {
    const [initialBudgets, setInitialBudgets] = useState([
        { name: 'Entertainment', value: 50, spent: 0, theme: '#277C78', transactions: jsonData.transactions.filter(entry => entry.category == 'Entertainment').slice(0, 3), date: jsonData.transactions.filter(entry => entry.category == 'Entertainment').slice(0, 3).map(entry => entry.date) },
        { name: 'Personal Care', value: 100, spent: 0, theme: '#626070', transactions: jsonData.transactions.filter(entry => entry.category == 'Personal Care').slice(0, 3), date: jsonData.transactions.filter(entry => entry.category == 'Personal Care').slice(0, 3).map(entry => entry.date) },
        { name: 'Dining Out', value: 75, spent: 0, theme: '#934F6F', transactions: jsonData.transactions.filter(entry => entry.category == 'Dining Out').slice(0, 3), date: jsonData.transactions.filter(entry => entry.category == 'Dining Out').slice(0, 3).map(entry => entry.date) },
        { name: 'Bills', value: 750, spent: 0, theme: '#82C9D7', transactions: jsonData.transactions.filter(entry => entry.category == 'Bills').slice(0, 3), date: jsonData.transactions.filter(entry => entry.category == 'Bills').slice(0, 3).map(entry => entry.date) },
    ]);
    const [budgetModal, setBudgetModal] = useState(false);

    const data = useMemo(() => {
        const spent = initialBudgets.map(b => b.transactions.reduce((accumulator, currentValue) => {
            const amt = accumulator + currentValue.amount;
            return amt
        }, 0) * -1);
        
        const budgets = initialBudgets.map((budget, index) => {
            return { ...budget, spent: spent[index] };
        });

        const categories = cat.slice(1).map(category => {
            const match = initialBudgets.filter(x => x.name == category.label)[0];
            if(match) return { ...category, used: true };
            else return category;
        });

        return { budgets, categories };
    }, [initialBudgets]);

    return (
        <budgetsContext.Provider value={{ budgets: initialBudgets, setBudgets:setInitialBudgets }}>
            <div className="w-full bg-light-2 px-16 py-14">
                <AddBudget
                budgetModal={budgetModal}
                setBudgetModal={setBudgetModal}
                categories={data.categories}
                initialBudgets={initialBudgets}
                setInitialBudgets={setInitialBudgets}
                />
                <div className="flex items-center justify-between mb-5">
                    <h1 className='text-2xl font-semibold'>Budgets</h1>
                    <button
                    className='bg-dark text-light px-4 py-2 rounded-lg cursor-pointer hover:bg-light-text'
                    onClick={() => setBudgetModal(!budgetModal)}
                    >+ Add New Budget
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-7">
                    <BudgetSummary budgets={data.budgets} />
                    <div className="col-start-2 col-span-2 flex flex-col gap-y-7">
                        { data.budgets.map((budget, index) => (
                            <BudgetCard key={index} budget={budget} index={index} />
                        )) }
                    </div>
                </div>
            </div>
        </budgetsContext.Provider>
    );
}
