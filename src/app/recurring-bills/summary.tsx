import RecurringBillsIcon from '@/assets/icons/icon-recurring-bills.svg';
import { transactions } from '@/utils/types';

export default function Summary({ bills }: {
    bills: transactions
}) {
    const paid = bills.filter(bill => bill.isDueSoon == false);
    const isDueSoon = bills.filter(bill => bill.isDueSoon == true);
    const totalBills = bills.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) * -1;
    const totalPaid = paid.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) * -1;
    const totalDueSoon = isDueSoon.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) * -1;

    return(
        <div className="col-start-1 col-span-1 max-desktop-sm:col-span-4 max-desktop-sm:grid
        max-desktop-sm:grid-cols-2 max-desktop-sm:gap-6 max-mobile-lg:gap-x-3">
            <div className="bg-dark w-full rounded-2xl px-6 py-7 mb-7 max-mobile:row-start-1 max-mobile:col-span-full max-mobile:mb-0">
                <RecurringBillsIcon />
                <h2 className='text-lg mt-2 text-light'>Total Bills</h2>
                <p className='text-3xl text-light font-semibold'>${totalBills.toFixed(2)}</p>
            </div>
            <div className="bg-light w-full rounded-2xl px-6 py-5 self-start max-mobile:row-start-2 max-mobile:col-span-full">
                <h2 className='text-lg mb-3 font-semibold'>Summary</h2>
                <div className="">
                    <div className="w-full flex items-center justify-between mb-1">
                        <p className='text-sm font-semibold'>Paid Bills</p>
                        <p className='font-semibold'>{paid.length}(${totalPaid.toFixed(2)})</p>
                    </div>
                    <div className="w-full flex items-center justify-between mb-1">
                        <p className='text-sm font-semibold'>Total Upcoming</p>
                        <p className='font-semibold'>0($0.00)</p>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <p className='text-red text-sm font-semibold'>Due Soon</p>
                        <p className='font-semibold text-red'>{isDueSoon.length}(${totalDueSoon.toFixed(2)})</p>
                    </div>
                </div>
            </div>
        </div>
    )
}