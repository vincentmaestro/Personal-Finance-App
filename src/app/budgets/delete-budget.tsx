import { budget, currentItem } from "@/utils/types";
import CloseModalIcon from '@/assets/icons/icon-close-modal.svg';
import { useContext } from 'react';
import { budgetsContext } from '@/app/budgets/budgets';

export default function DeleteBudget({ budget, setCurrentBudget }: {
    budget: budget,
    setCurrentBudget: React.Dispatch<React.SetStateAction<currentItem>>
}) {
    const {budgets, setBudgets} = useContext(budgetsContext)!;

    function deleteBudget() {
        const newBudgets = budgets.filter(b => b.name !== budget.name);
        setBudgets(newBudgets);
        setCurrentBudget(currentBudget => {
            return { ...currentBudget, delete: -1 };
        });
    }

    return(
        <div className="w-full h-screen fixed left-0 top-0 bg-[#00000080] z-[1] flex items-center justify-center">
            <div className="w-2/6 bg-light rounded-xl px-5 py-4">
                <div className="flex justify-end">
                    <div
                    className="cursor-pointer"
                    onClick={() => setCurrentBudget(currentBudget => {
                        return { ...currentBudget, delete: -1 };
                    })}
                    >
                        <CloseModalIcon />
                    </div>
                </div>
                <h1 className="text-2xl font-semibold">Delete {budget.name}?</h1>
                <p className="text-light-text my-3 w-[90%]">Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.</p>
                <div className="mt-5 flex flex-col items-center gap-y-2">
                    <button
                    className="w-full rounded-lg py-1.5 text-center cursor-pointer bg-red text-light"
                    onClick={deleteBudget}
                    >
                        Yes, Confirm Deletion
                    </button>
                    <button 
                    className="w-full rounded-lg py-1.5 text-center cursor-pointer text-light-text"
                    onClick={() => setCurrentBudget(currentBudget => {
                        return { ...currentBudget, delete: -1 };
                    })}
                    >
                        No, Go Back
                    </button>
                </div>
            </div>
        </div>
    )
}