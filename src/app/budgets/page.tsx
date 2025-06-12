"use client";
import { createContext, useState } from 'react';
import Budget from './budget';
import AddBudget from './add-budget';
import BudgetSummary from './budget-summary';
import { budgets, categories } from "@/utils/types";
import { categories as cat } from '@/utils/categories';
import { useData } from '../../utils/provider';

export const budgetsContext = createContext<{
    budgets: budgets,
    setBudgets: React.Dispatch<React.SetStateAction<budgets>>
    categories: categories
} | undefined>(undefined);

export default function Budgets() {
    const { budgets, setBudgets } = useData();
    const [budgetModal, setBudgetModal] = useState(false);

    const categories = cat.slice(1).map(category => {
        const match = budgets.filter(x => x.name == category.label)[0];
        if(match) return { ...category, used: true };
        else return category;
    });

    return (
        <budgetsContext.Provider value={{ budgets: budgets, setBudgets: setBudgets, categories: categories }}>
            <div className="w-full bg-light-2 px-16 py-14">
                <AddBudget
                budgetModal={budgetModal}
                setBudgetModal={setBudgetModal}
                categories={categories}
                initialBudgets={budgets}
                setInitialBudgets={setBudgets}
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
                    <BudgetSummary budgets={budgets} />
                    <div className="col-start-2 col-span-2 flex flex-col gap-y-7">
                        { budgets.map((budget, index) => (
                            <Budget key={index} budget={budget} index={index} />
                        )) }
                    </div>
                </div>
            </div>
        </budgetsContext.Provider>
    );
}
