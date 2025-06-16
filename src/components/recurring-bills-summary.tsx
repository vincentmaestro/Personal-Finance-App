import { useData } from '@/utils/provider';
import RightCaretIcon from '@/assets/icons/icon-caret-right.svg';
import { useRouter } from 'next/navigation';

export default function RecurringBills() {
    const router = useRouter();

    const { recurringBills } = useData();
    const paid = recurringBills.filter(bill => bill.isDueSoon == false);
    const isDueSoon = recurringBills.filter(bill => bill.isDueSoon == true);
    const totalPaid = paid.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) * -1;
    const totalDueSoon = isDueSoon.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) * -1;

    return(
        <div
        className="col-start-7 col-span-5 bg-light py-4 px-5 rounded-xl row-start-3
        max-desktop-sm:col-start-6 max-desktop-sm:col-span-6
        max-tablet:row-start-6 max-tablet:col-span-10"
        >
            <div className="flex justify-between mb-6">
                <h1 className='font-semibold text-xl'>Recurring Bills</h1>
                <button
                className='text-light-text cursor-pointer flex items-center gap-x-2'
                onClick={() => router.push('/recurring-bills')}
                >
                    See Details
                    <RightCaretIcon />
                </button>
            </div>
            <div>
                <div className="flex items-center justify-between p-6 mb-6 bg-light-2 rounded-xl border-l-6 border-l-green">
                    <p>Paid Bills</p>
                    <p className='font-semibold'>${totalPaid.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between p-6 mb-6 bg-light-2 rounded-xl border-l-6 border-l-gold">
                    <p>Total Upcoming</p>
                    <p className='font-semibold'>$0.00</p>
                </div>
                <div className="flex items-center justify-between p-6 mb-6 bg-light-2 rounded-xl border-l-6 border-l-cyan">
                    <p>Due Soon</p>
                    <p className='font-semibold'>${totalDueSoon.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}