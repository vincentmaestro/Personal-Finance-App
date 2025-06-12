"use client";
import { useMemo, useState } from "react";
import { useData } from "../../utils/provider";
import BillPaidIcon from '@/assets/icons/icon-bill-paid.svg';
import BillDueIcon from '@/assets/icons/icon-bill-due.svg';
import Image from "next/image";
import { sortBy as sortOptions, sortTransactions } from '@/utils/transactions-logic';
import Summary from "./summary";


export default function RecurringBills() {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    const { recurringBills } = useData();
    
    const sortedRecurringBills = useMemo(() => {
        const final = sortTransactions(sortBy, recurringBills)
            .filter(bill => bill.name.toLowerCase().includes(search.toLowerCase()));
            
        return final;
    }, [search, sortBy]);

    return(
        <div className="w-full bg-light-2 px-16 py-14">
            <div className="mb-6">
                <h1 className='text-2xl font-semibold'>Recurring Bills</h1>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <Summary bills={sortedRecurringBills} />
                <div className="col-start-2 col-span-2 bg-light rounded-xl py-4">
                    <div className="flex items-center justify-between px-4 mb-2">
                        <input type="text" placeholder="Search Bills" value={search} className='bg-light px-3 py-1 border border-lighter-text focus:border-navy rounded-lg outline-none w-[40%]' onChange={e => setSearch(e.target.value)} />
                        <div className="flex items-center gap-2">
                            <span>Sort by</span>
                            <select
                            className='border border-navy px-2 py-1 rounded-lg outline-none'
                            onChange={e => setSortBy(e.target.value)}
                            >
                                { sortOptions.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                )) }
                            </select>
                        </div>
                    </div>
                    <div>
                        <table className="recurring-bills-table w-[94%] mx-auto">
                            <thead>
                                <tr className="text-light-text text-sm">
                                    <th>Bill Title</th>
                                    <th>Due Date</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                { sortedRecurringBills.map((bill, index) => (
                                    <tr key={index} className="border-t border-t-light-2">
                                        <td className='flex items-center gap-4'>
                                            <Image src={bill.avatar.slice(1)} alt={bill.name} width={40} height={40} className='rounded-[50%]' />
                                            <h2>{bill.name}</h2>
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-center gap-x-1">
                                                <p>
                                                    Monthly - {new Date(bill.date).getDate()}
                                                    { new Date(bill.date).getDate() == 1 ? 'st' 
                                                    : new Date(bill.date).getDate() == 2 ? 'nd'
                                                    : new Date(bill.date).getDate() == 3 ? 'rd'
                                                    : 'th'
                                                    }
                                                </p>
                                                <div>
                                                    { bill.isDueSoon ? <BillDueIcon /> : <BillPaidIcon /> }
                                                </div>
                                            </div>
                                        </td>
                                        <td className={bill.isDueSoon ? 'text-red font-semibold' : 'font-semibold'}>${bill.amount.toFixed(2).slice(1)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}