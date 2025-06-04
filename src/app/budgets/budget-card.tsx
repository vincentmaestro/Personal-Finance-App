"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { budget } from '@/utils/types';
import RightCaret from '../../assets/icons/icon-caret-right.svg';
import DeleteBudget from '@/components/delete-budget';

export default function BudgetCard({ budget, index }: {
    budget: budget,
    index: number
}) {
    const router = useRouter();
    const [currentBudget, setCurrentBudget] = useState({
        toggle: -1,
        edit: -1,
        delete: -1
    });

    onmousedown = function(e) {
        if(document.getElementById('budget-menu') && !document.getElementById('budget-menu')?.contains(e.target as HTMLElement)) {
            setCurrentBudget(currentBudget => {
                return { ...currentBudget, toggle: -1 }
            });
        }
    }
    function toggleMenu() {
        setCurrentBudget(currentBudget => {
            const { toggle } = currentBudget;
            if(toggle == index) return { ...currentBudget, toggle: -1 };
            else return { ...currentBudget, toggle: index };
        });
    }

    return(
        <div className='p-6 bg-light rounded-xl'>
            { currentBudget.delete == index &&
                <DeleteBudget budget={budget} currentBudget={currentBudget} setCurrentBudget={setCurrentBudget} />
            }
            <div className='relative'>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: budget.theme }} />
                        <h2 className='text-lg font-semibold'>{budget.name}</h2>
                    </div>
                    <button className='text-2xl font-semibold tracking-wide cursor-pointer' onClick={toggleMenu}>...</button>
                </div>
                { currentBudget.toggle == index &&
                    <div id='budget-menu' className="bg-light p-4 rounded-xl w-[26%] absolute top-10 right-0 shadow">
                        <button className='cursor-pointer w-full text-center'>Edit Budget</button>
                        <hr className='bg-dark my-4' />
                        <button
                        className='cursor-pointer text-red w-full text-center'
                        onClick={() => setCurrentBudget(currentBudget => {
                            return { ...currentBudget, toggle: -1, delete: index };
                        })}
                        >
                            Delete Budget
                        </button>
                    </div>
                }
            </div>
            <div>
                <div className="mt-3 mb-4">
                    <p className='text-light-text'>Maximum of ${budget.value.toFixed(2)}</p>
                    <progress data-color={budget.theme} max={budget.value} value={budget.spent} className='w-full h-3' />
                    <div className="flex items-center justify-between">
                        <p>Spent ${budget.spent}</p>
                        <p>Remaining ${(budget.value - budget.spent).toFixed(2)}</p>
                    </div>
                </div>
                <div className="bg-light-2 p-5 rounded-xl">
                    <div className="flex justify-between mb-3">
                        <h2>Latest Spending</h2>
                        <button
                        className='flex items-center gap-x-2 cursor-pointer'
                        onClick={() => router.push(`/transactions?page=1&category=${budget.name}`)}
                        >
                            <span>See All</span>
                            <RightCaret />
                        </button>
                    </div>
                    { budget.transactions.map((entry, index) => (
                        <div
                        key={index}
                        className={`flex items-center justify-between py-4 ${index < 2 ? 'border-b-2 border-lighter-text': ''}`}
                        >
                            <div className="flex gap-x-2 items-center">
                                <Image src={entry.avatar.slice(1)} alt={entry.name} width={35} height={35} className='rounded-[50%]' />
                                <p>{entry.name}</p>
                            </div>
                            <div className="flex flex-col gap-y-1 text-right">
                                <p>${entry.amount.toFixed(2)}</p>
                                <p>{new Date(budget.date[index]).toDateString()}</p>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        </div>
    )
}