"use client";
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { sortBy as sortOptions, sortTransactions } from '@/utils/transactions-logic';
import { useMemo, useState } from "react";
import { useData } from "../../utils/provider";
import Image from "next/image";
import Summary from "./summary";
import BillPaidIcon from '@/assets/icons/icon-bill-paid.svg';
import BillDueIcon from '@/assets/icons/icon-bill-due.svg';
import SortIcon from '@/assets/icons/icon-sort-mobile.svg';

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
        <div className="w-full bg-light-2 px-16 py-14 max-tablet:px-8 max-mobile-lg:px-6 max-mobile:px-4">
            <div className="mb-6 max-desktop-sm:mb-8">
                <h1 className='text-2xl font-semibold'>Recurring Bills</h1>
            </div>
            <div className="grid grid-cols-3 gap-6 max-desktop-sm:gap-y-2 max-mobile:gap-y-8">
                <Summary bills={sortedRecurringBills} />
                <div className="col-start-2 col-span-2 bg-light rounded-xl py-4 max-desktop-sm:col-start-1 max-desktop-sm:col-span-4">
                    <div className="flex items-center justify-between px-4 mb-2 max-tablet:mb-6">
                        <input
                        type="text"
                        placeholder="Search Bills"
                        value={search}
                        className='bg-light px-3 py-1 border border-lighter-text focus:border-navy rounded-lg outline-none w-[40%]
                        max-tablet:w-[50%]'
                        onChange={e => setSearch(e.target.value)}
                        />
                        <div className="flex items-center gap-2">
                            <span className='max-tablet:hidden'>Sort by</span>
                            <select
                            value={sortBy}
                            className='border border-navy px-2 py-1 rounded-lg outline-none max-tablet:hidden'
                            onChange={e => setSortBy(e.target.value)}
                            >
                                { sortOptions.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                )) }
                            </select>
                            <div className="hidden max-tablet:block">
                                <Select value={sortBy} onValueChange={value => setSortBy(value)}>
                                    <SelectTrigger>
                                        <div className="hidden max-tablet:block">
                                            <SortIcon />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        { sortOptions.map((option, index) => (
                                            <SelectItem
                                            key={index}
                                            value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        )) }
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <table className="recurring-bills-table w-[94%] mx-auto">
                            <thead className='max-tablet:hidden'>
                                <tr className="text-light-text text-sm">
                                    <th>Bill Title</th>
                                    <th>Due Date</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                { sortedRecurringBills.map((bill, index) => (
                                    <tr key={index} className="border-t border-t-light-2">
                                        <td>
                                            <div className="flex items-center gap-4 mb-3 max-mobile:gap-2">
                                                <Image src={bill.avatar.slice(1)} alt={bill.name} width={40} height={40} className='rounded-[50%]' />
                                                <h2 className='font-semibold'>{bill.name}</h2>
                                            </div>
                                            <div className="hidden items-center gap-x-1 max-tablet:flex">
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
                                        <td className='max-tablet:hidden'>
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
                                        <td
                                        className={bill.isDueSoon ? 'text-red font-semibold' : 'font-semibold'}
                                        >
                                            ${bill.amount.toFixed(2).slice(1)}
                                        </td>
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