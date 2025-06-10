'use client';
import RecurringBillsIcon from '@/assets/icons/icon-recurring-bills.svg';
import { useBillsContext } from './bills';

export default function Summary() {
    const x = useBillsContext()
    console.log(x);
    
    return(
        <div className="col-start-1 col-span-1">
            <div className="bg-dark w-full rounded-2xl px-6 py-7 mb-7">
                <RecurringBillsIcon />
                <h2 className='text-lg mt-2 text-light'>Total Bills</h2>
                <p className='text-3xl text-light font-semibold'>$384.98</p>
            </div>
            <div className="bg-light w-full rounded-2xl px-6 py-5">
                <h2 className='text-lg mb-3 font-semibold'>Summary</h2>
                <div className="">
                    <div className="w-full flex items-center justify-between mb-1">
                        <p className='text-sm font-semibold'>Paid Bills</p>
                        <p className='font-semibold'>3($180.00)</p>
                    </div>
                    <div className="w-full flex items-center justify-between mb-1">
                        <p className='text-sm font-semibold'>Total Upcoming</p>
                        <p className='font-semibold'>5($204.98)</p>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <p className='text-red text-sm font-semibold'>Due Soon</p>
                        <p className='font-semibold text-red'>1($10.00)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}