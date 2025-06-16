import LeftCaretIcon from '@/assets/icons/icon-caret-left.svg';
import RightCaretIcon from '@/assets/icons/icon-caret-right.svg';
import { page } from '@/utils/types';

export default function Pagination({
    page,
    pageData,
    goToPage
}: {
    page: page,
    pageData: number[],
    goToPage: (pageNumber: string) => void
}) {
    return(
        <div className="mt-5 flex items-center justify-between">
            <button
            disabled={page.pageNumber == 1 ? true : false}
            className='flex items-center gap-4 px-3 py-1 shadow shadow-navy rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={() => goToPage('prev')}
            >
                <LeftCaretIcon />
                <span>Prev</span>
            </button>
            <ul className='flex items-center justify-center gap-x-4 flex-wrap max-mobile:gap-2'>
                { pageData.map((pageNumber, index) => (
                    <li key={index}>
                        <button
                        value={pageNumber}
                        onClick={() =>
                        goToPage(String(pageNumber))}
                        className={`px-3 py-1 shadow shadow-navy rounded-sm cursor-pointer
                        ${page.pageNumber == pageNumber ? 'bg-dark text-light' : 'initial'}
                        hover:bg-light-text hover:text-light`}
                        >
                            {pageNumber}
                        </button>
                    </li>
                )) }
            </ul>
            <button
            disabled={page.pageNumber == pageData.length ? true : false}
            className='flex items-center gap-4 px-3 py-1 shadow shadow-navy rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={() => goToPage('next')}
            >
                <span>Next</span>
                <RightCaretIcon />
            </button>
        </div>
    )
}