"use client";
import { useMemo, useReducer, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { sortBy, categories, paginationReducer, pageReducer } from './pageLogic';
import Image from 'next/image';
import LeftCaret from '../../assets/icons/icon-caret-left.svg';
import RightCaret from '../../assets/icons/icon-caret-right.svg';

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

    const pageData = useMemo(() => {
        const x = pageReducer(search, category, page);
        return x;
    }, [page.pageNumber, category, search]);

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
    function filterCategory(e: React.ChangeEvent<HTMLSelectElement>) {
        setCategory(e.target.value);
        dispatch({ type: 'page', value: '1' });
        params.set('page', '1');
        params.set('category', e.target.value);
        router.push(`?${params.toString()}`);
    }
    function performSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
        params.set('page', '1');
        router.push(`?${params.toString()}`);
    }
    
    return(
        <div className="w-full bg-light-2 px-16 py-14">
            <h1 className="text-2xl font-semibold mb-5">Transactions</h1>
            <div className="flex items-center justify-between mb-8">
                <input type="text" placeholder="Search Transaction" value={search} className='bg-light px-3 py-1 border border-transparent focus:border-ash-like rounded-lg outline-none w-[35%]' onChange={performSearch} />
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span>Sort by</span>
                        <select className='border border-ash-like px-2 py-1 rounded-lg outline-none'>
                            { sortBy.map((option, index) => (
                                <option key={index} value={option.value}>{option.label}</option>
                            )) }
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Category</span>
                        <select className='border border-ash-like px-2 py-1 rounded-lg outline-none' value={category} onChange={filterCategory}>
                            { categories.map((category, index) => (
                                <option key={index} value={category.label}>{category.label}</option>
                            )) }
                        </select>
                    </div>
                </div>
            </div>
            <div>
                <table className='transactions-table bg-light w-full rounded-xl'>
                    <thead>
                        <tr>
                            <th>Recipient / Sender</th>
                            <th>Category</th>
                            <th>Transaction Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pageData.t.map((txn, index) => (
                                <tr key={index} className='text-light-text'>
                                    <td className='flex items-center gap-4'>
                                        <Image src={txn.avatar.slice(1)} alt={txn.name} width={40} height={40} className='rounded-[50%]' />
                                        <h2>{txn.name}</h2>
                                    </td>
                                    <td>{txn.category}</td>
                                    <td>{new Date(txn.date).toDateString()}</td>
                                    <td className={txn.amount.toString()[0] == '-' ? 'text-dark font-semibold' : 'text-green font-semibold'}>{txn.amount.toString()[0] == '-' ? '$' : '$+'}{txn.amount.toFixed(2)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="mt-5 flex items-center justify-between">
                    <button disabled={page.pageNumber == 1 ? true : false} className='flex items-center gap-4 px-3 py-1 shadow shadow-ash-like rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' onClick={() => goToPage('prev')}>
                        <LeftCaret />
                        <span>Prev</span>
                    </button>
                    <ul className='flex items-center gap-x-4'>
                        { pageData.p.map((pageNumber, index) => (
                            <li key={index}>
                                <button value={pageNumber} onClick={() => goToPage(String(pageNumber))} className={`px-3 py-1 shadow shadow-ash-like rounded-sm cursor-pointer ${page.pageNumber == pageNumber ? 'bg-dark text-light' : 'initial'} hover:bg-light-text hover:text-light`}>{pageNumber}</button>
                            </li>
                        )) }
                    </ul>
                    <button disabled={page.pageNumber == pageData.p.length ? true : false} className='flex items-center gap-4 px-3 py-1 shadow shadow-ash-like rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' onClick={() => goToPage('next')}>
                        <span>Next</span>
                        <RightCaret />
                    </button>
                </div>
            </div>
        </div>
    )
}