import Summary from "./summary";
import Bills from "./bills";

export default function RecurringBills() {
    
    return(
        <div className="w-full bg-light-2 px-16 py-14">
            <div className="mb-6">
                <h1 className='text-2xl font-semibold'>Recurring Bills</h1>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <Summary />
                <Bills />
            </div>
        </div>
    )
}