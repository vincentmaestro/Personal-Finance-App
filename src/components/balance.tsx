import { useData } from "@/utils/provider"

export default function Balance() {
    const { balance } = useData();

    return(
        <div className="grid grid-cols-3 gap-x-4 mb-5">
            <div className="bg-dark pl-4 py-4 rounded-lg text-light">
            <h1>Current Balance</h1>
            <span className="text-2xl font-semibold">${balance.current.toFixed(2)}</span>
            </div>
            <div className="bg-light pl-4 py-4 rounded-lg">
            <h1>Income</h1>
            <span className="text-2xl font-semibold">${balance.income.toFixed(2)}</span>
            </div>
            <div className="bg-light pl-4 py-4 rounded-lg">
            <h1>Expenses</h1>
            <span className="text-2xl font-semibold">${balance.expenses.toFixed(2)}</span>
            </div>
      </div>
    )
}