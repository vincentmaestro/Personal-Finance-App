import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { budgets } from '@/utils/types';

export default function BudgetSummary({ budgets }: {
    budgets: budgets
}) {
    return(
        <div className="bg-light sticky top-0 col-start-1 col-span-1 self-start flex flex-col items-center pb-4 rounded-2xl">
            <div className="relative">
                <PieChart width={300} height={300}>
                    <Pie data={budgets} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={110}>
                        {budgets.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={budgets[index].theme} />
                        ))}
                    </Pie>
                    <Tooltip wrapperStyle={{zIndex: 1}} />
                </PieChart>
                <div className="absolute left-1/2 top-1/2 -translate-1/2 flex flex-col items-center">
                    <p className='text-3xl font-semibold'>$
                        {budgets.reduce((accumulator, currentValue) => {
                            const used = accumulator.used + currentValue.spent;
                            const limit = accumulator.limit + currentValue.value;
                            return { used, limit };
                        }, { used: 0, limit: 0 }).used.toFixed(2)}
                    </p>
                    <p className='text-light-text'>of ${budgets.reduce((accumulator, currentValue) => {
                        const value = accumulator.value + currentValue.value;
                        const limit = accumulator.limit + currentValue.value;
                        return { value, limit };
                    }, { value: 0, limit: 0 }).limit.toFixed(2)} limit
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-y-3 w-full px-4">
                <h2 className='text-lg text-light-text font-semibold'>Spending Summary</h2>
                {
                    budgets.map((budget, index) => (
                        <div key={index} className="flex items-center gap-x-2">
                            <div className="w-2 h-8 rounded-2xl" style={{ backgroundColor: budget.theme }} />
                            <div className="w-full flex justify-between">
                                <h1 className='text-light-text'>{budget.name}</h1>
                                <p className='text-light-text'><span className='text-dark font-semibold'>${budget.spent}</span>{` `}of ${budget.value}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}