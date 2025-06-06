"use client";
import FinanceLogo from '../assets/icons/logo-large.svg';
import HomeIcon from '../assets/icons/icon-nav-overview.svg';
import TransactionsIcon from '../assets/icons/icon-nav-transactions.svg';
import BudgetsIcon from '../assets/icons/icon-nav-budgets.svg';
import PotsIcon from '../assets/icons/icon-nav-pots.svg';
import RecurringBillsIcon from '../assets/icons/icon-nav-recurring-bills.svg';
import ExpandButtonIcon from '../assets/icons/icon-minimize-menu.svg';
import { useRouter } from 'next/navigation';

export default function SideNav() {
    const router = useRouter();

    return(
        <aside className="sticky top-0 flex flex-col justify-between bg-dark w-80 h-screen py-12 rounded-r-2xl">
            <div className="flex flex-col gap-y-10">
            <div className="ml-4">
                <FinanceLogo />
            </div>
            <nav>
                <div className="flex flex-col gap-y-3 pr-5">
                    <button 
                    className="flex items-center gap-4 cursor-pointer text-dark bg-light-2 rounded-r-xl w-full p-3 hover:bg-light-text border-l-4 border-cyan"
                    onClick={() => router.push('/')}
                    >
                        <HomeIcon />
                        <span className="font-semibold">Overview</span>
                    </button>
                    <button 
                    className="flex items-center gap-4 cursor-pointer text-light-2 rounded-r-xl w-full p-3 hover:bg-light-text"
                    onClick={() => router.push('/transactions')}
                    >
                        <TransactionsIcon />
                        <span className="font-semibold">Transactions</span>
                    </button>
                    <button 
                    className="flex items-center gap-4 cursor-pointer text-light-2 rounded-r-xl w-full p-3 hover:bg-light-text"
                    onClick={() => router.push('/budgets')}
                    >
                        <BudgetsIcon />
                        <span className="font-semibold">Budgets</span>
                    </button>
                    <button 
                    className="flex items-center gap-4 cursor-pointer text-light-2 rounded-r-xl w-full p-3 hover:bg-light-text"
                    onClick={() => router.push('/pots')}
                    >
                        <PotsIcon />
                        <span className="font-semibold">Pots</span>
                    </button>
                    <button 
                    className="flex items-center gap-4 cursor-pointer text-light-2 rounded-r-xl w-full p-3 hover:bg-light-text"
                    onClick={() => router.push('/recurring-bills')}
                    >
                        <RecurringBillsIcon />
                        <span className="font-semibold">Recurring Bills</span>
                    </button>
                </div>
            </nav>
            </div>
            <div className="ml-[8%]">
            <button className="flex items-center gap-2 text-light-2 cursor-pointer">
                <ExpandButtonIcon />
                <span className="text-sm">Minimize Menu</span>
            </button>
            </div>
        </aside>
    )
}