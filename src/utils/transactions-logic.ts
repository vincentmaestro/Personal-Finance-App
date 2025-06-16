import jsonData from '../app/data.json';
import { page, transactions } from '@/utils/types';

export function paginationReducer(page: page, action: { type: string, value: string }) {
    switch(action.type) {
        case 'next': {
            const currentPage = page.pageNumber + 1;
            const skip = (currentPage - 1) * 10;
            return {
                pageNumber: currentPage,
                skip: skip
            }
        }
        case 'prev': {
            const currentPage = page.pageNumber - 1;
            const skip = (currentPage - 1) * 10;
            return {
                pageNumber: currentPage,
                skip: skip
            }
        }
        case 'page': {
            const currentPage = parseInt(action.value);
            const skip = (currentPage - 1) * 10;
            return {
                pageNumber: currentPage,
                skip: skip
            }
        }

        default: return page;
    }
}

export const sortBy = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'a-z', label: 'A to Z' },
    { value: 'z-a', label: 'Z to A' },
    { value: 'highest', label: 'Highest' },
    { value: 'lowest', label: 'Lowest' },
];

export function pageReducer(search: string, category: string, page: page) {
    let t = jsonData.transactions.filter(txn => txn.name.toLowerCase().includes(search.toLocaleLowerCase()))
    .filter(txn => {
        if(category == 'All Transactions') return txn;
        else return txn.category == category;
    });

    const p = [];
    for(let i = 1; i <= Math.ceil(t.length / 10); i++) {
        p.push(i);
    }

    t = t.slice(page.skip, page.pageNumber * 10);

    return { t, p };
}

export function sortTransactions(keyWord: string, data: transactions) {
    switch(keyWord) {
        case 'newest':
            return data.sort((a, b) => new Date(b.date).getUTCDate() - new Date(a.date).getUTCDate());

        case 'oldest':
            return data.sort((a, b) => new Date(a.date).getUTCDate() - new Date(b.date).getUTCDate());

        case 'a-z':
            return data.sort((a, b) => a.name.localeCompare(b.name));

        case 'z-a':
            return data.sort((a, b) => b.name.localeCompare(a.name));

        case 'highest':
            return data.sort((a, b) => a.amount - b.amount);

        case 'lowest':
            return data.sort((a, b) => b.amount - a.amount);

        default: return data;
    }
}