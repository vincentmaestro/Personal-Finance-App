import { useData } from "@/utils/provider"

export default function Balance() {
    const { balance } = useData();

    return(
        <div className="grid grid-cols-3 gap-x-4 mb-5 max-tablet:mb-8 max-mobile-lg:grid-cols-1 max-mobile-lg:gap-y-4">
            <div className="bg-dark pl-4 py-4 rounded-lg text-light max-tablet:py-8">
                <h1 className="max-mobile-lg:text-xl">Current Balance</h1>
                <span className="text-2xl font-semibold">${balance.current.toFixed(2)}</span>
            </div>
            <div className="bg-light pl-4 py-4 rounded-lg max-tablet:py-8">
                <h1 className="max-mobile-lg:text-xl">Income</h1>
                <span className="text-2xl font-semibold">${balance.income.toFixed(2)}</span>
            </div>
            <div className="bg-light pl-4 py-4 rounded-lg max-tablet:py-8">
                <h1 className="max-mobile-lg:text-xl">Expenses</h1>
                <span className="text-2xl font-semibold">${balance.expenses.toFixed(2)}</span>
            </div>
      </div>
    )
}