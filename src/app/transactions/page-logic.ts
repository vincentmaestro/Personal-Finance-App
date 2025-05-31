import jsonData from '../data.json';

type page = {
    pageNumber: number,
    skip: number
}

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

    let p = [];
    for(let i = 1; i <= Math.ceil(t.length / 10); i++) {
        p.push(i);
    }

    t = t.slice(page.skip, page.pageNumber * 10);

    return { t, p };
}