"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import RightCaret from '../../assets/icons/icon-caret-right.svg';

export default function BudgetCard({ budget }: {
    budget: {
        name: string,
        value: number,
        used: number,
        theme: string,
        data: any[],
        date: string[]
    }
}) {
    const router = useRouter();
    function seeAll() {
        router.push(`/transactions?page=1&category=${budget.name}`);
    }

    return(
        <div className='p-6 bg-light rounded-xl'>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: budget.theme }} />
                    <h2 className='text-lg font-semibold'>{budget.name}</h2>
                </div>
                <button className='text-2xl font-semibold tracking-wide cursor-pointer'>...</button>
            </div>
            <div>
                <div className="mt-3 mb-4">
                    <p className='text-light-text'>Maximum of ${budget.value.toFixed(2)}</p>
                    <progress data-color={budget.theme} max={budget.value} value={budget.used} className='w-full h-3' />
                    <div className="flex items-center justify-between">
                        <p>Spent ${budget.used}</p>
                        <p>Remaining ${budget.value - budget.used}</p>
                    </div>
                </div>
                <div className="bg-light-2 p-5 rounded-xl">
                    <div className="flex justify-between mb-3">
                        <h2>Latest Spending</h2>
                        <button className='flex items-center gap-x-2 cursor-pointer' onClick={seeAll}>
                            <span>See All</span>
                            <RightCaret />
                        </button>
                    </div>
                    { budget.data.map((entry, index) => (
                        <div key={index} className={`flex items-center justify-between py-4 ${index < 2 ? 'border-b-2 border-lighter-text': ''}`}>
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