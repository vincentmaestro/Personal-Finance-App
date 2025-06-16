"use client";
import { useMemo, useReducer, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { paginationReducer, pageReducer, sortTransactions } from '@/utils/transactions-logic';
import Image from 'next/image';
import TransactionFilters from './filters';
import Pagination from './pagination';

export default function Transactions() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const firstPage = params.get('page') || '1';
    const [page, dispatch] = useReducer(paginationReducer, {
        pageNumber: parseInt(firstPage),
        skip: (parseInt(firstPage) - 1) * 10   
    });
    const firstCategory = params.get('category') || 'All Transactions';
    const[category, setCategory] = useState(firstCategory);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    const pageData = useMemo(() => {
        const x = pageReducer(search, category, page);
        sortTransactions(sortBy, x.t);
        
        return x;
    }, [page.pageNumber, category, search, sortBy]);

    function goToPage(pageNumber: string) {
        if(pageNumber == 'prev') {
            dispatch({ type: 'prev', value: '' });
            params.set('page', `${page.pageNumber - 1}`)
            router.push(`?${params.toString()}`);
        } else if(pageNumber == 'next') {
            dispatch({ type: 'next', value: '' });
            params.set('page', `${page.pageNumber + 1}`)
            router.push(`?${params.toString()}`);
        } else {
            dispatch({ type: 'page', value: pageNumber });
            params.set('page', pageNumber);
            router.push(`?${params.toString()}`);
        }
    }
    function filterCategory(v: string, e?: React.ChangeEvent<HTMLSelectElement>) {
        const value = e?.target.value || v;
        setCategory(value);
        dispatch({ type: 'page', value: '1' });
        params.set('page', '1');
        params.set('category', value);
        router.push(`?${params.toString()}`);
    }
    function performSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
        dispatch({ type: 'page', value: '1' });
        params.set('page', '1');
        router.push(`?${params.toString()}`);
    }
    
    return(
        <div className="w-full bg-light-2 px-16 py-14 max-desktop-sm:px-8 max-mobile:px-5">
            <h1 className="text-2xl font-semibold mb-5">Transactions</h1>
            
            <TransactionFilters
            search={search}
            performSearch={performSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
            category={category}
            filterCategory={filterCategory}
            />

            <div>
                <table className='transactions-table bg-light w-full rounded-xl'>
                    <thead>
                        <tr className='text-light-text text-sm'>
                            <th>Recipient / Sender</th>
                            <th className='max-tablet:hidden'>Category</th>
                            <th className='max-tablet:hidden'>Transaction Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pageData.t.map((txn, index) => (
                                <tr key={index} className='text-light-text border-t border-t-light-2'>
                                    <td className='flex items-center gap-4'>
                                        <Image src={txn.avatar.slice(1)} alt={txn.name} width={40} height={40} className='rounded-[50%]' />
                                        <h2 className='font-semibold'>{txn.name}</h2>
                                    </td>
                                    <td className='max-tablet:hidden'>{txn.category}</td>
                                    <td className='max-tablet:hidden'>{new Date(txn.date).toDateString()}</td>
                                    <td className={txn.amount.toString()[0] == '-' ? 'text-dark font-semibold' : 'text-green font-semibold'}>
                                        {txn.amount.toString()[0] == '-' ? '-$' : '+$'}{txn.amount.toFixed(2).slice(1)}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <Pagination
            page={page}
            pageData={pageData.p}
            goToPage={goToPage}
            />
        </div>
    )
}