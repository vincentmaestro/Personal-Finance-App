import { useRouter } from 'next/navigation';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useData } from '@/utils/provider';
import RightCaretIcon from '@/assets/icons/icon-caret-right.svg';


export default function Budgets() {
    const router = useRouter();
    const { budgets } = useData();

    return(
        <div
        className="col-start-7 col-span-5 bg-light p-4 rounded-lg row-start-1 row-span-2
        max-desktop-sm:col-start-6 max-desktop-sm:col-span-6
        max-tablet:row-start-2 max-tablet:col-start-1 max-tablet:col-span-10 max-tablet:px-5"
        >
            <div className="flex items-center justify-between">
                <h1 className='font-semibold text-xl'>Budgets</h1>
                <button
                className='text-light-text cursor-pointer flex items-center gap-x-2'
                onClick={() => router.push('/budgets')}
                >
                    See Details
                    <RightCaretIcon />
                </button>
            </div>
            <div className='mt-7 flex justify-between max-mobile:flex-col'>
                <div className="relative flex justify-center">
                    <PieChart width={250} height={250}>
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
                <div className='max-mobile:grid max-mobile:grid-cols-2 max-mobile:gap-4 max-mobile:mt-4'>
                    { budgets.slice(0, 4).map((budget, index) => (
                    <div key={index} className="flex items-center gap-x-3 mb-3">
                        <div className="w-1.5 h-12 rounded-2xl" style={{ backgroundColor: budget.theme }} />
                        <div className="flex flex-col gap-y-0.5">
                        <h3 className='text-light-text'>{budget.name}</h3>
                        <p className='font-semibold'>${budget.value}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
      </div>
    )
}