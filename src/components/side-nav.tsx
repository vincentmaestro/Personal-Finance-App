"use client";
import FinanceLogo from '../assets/icons/logo-large.svg';
import FinanceLogoSmall from '../assets/icons/logo-small.svg';
import HomeIcon from '../assets/icons/icon-nav-overview.svg';
import TransactionsIcon from '../assets/icons/icon-nav-transactions.svg';
import BudgetsIcon from '../assets/icons/icon-nav-budgets.svg';
import PotsIcon from '../assets/icons/icon-nav-pots.svg';
import RecurringBillsIcon from '../assets/icons/icon-nav-recurring-bills.svg';
import ExpandButtonIcon from '../assets/icons/icon-minimize-menu.svg';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SideNav() {
    const router = useRouter();
    const pathname = usePathname();
    const [isExpanded, setIsExpanded] = useState(true);

    return(
        <>
            <aside
            className={`sticky top-0 flex flex-col justify-between bg-dark h-screen py-12 rounded-r-2xl transition-all duration-300
            ${isExpanded ? 'w-80' : 'w-22'} max-desktop:w-22 max-mobile-lg:hidden`}
            >
                <div className="flex flex-col gap-y-10">
                    <div className={`${isExpanded ? 'ml-5' : 'mx-auto' } max-desktop:hidden`}>
                        { isExpanded ? <FinanceLogo /> : <FinanceLogoSmall /> }
                    </div>
                    <div className="hidden mx-auto max-desktop:block max-mobile-lg:hidden">
                        <FinanceLogoSmall />
                    </div>
                    <nav>
                        <div className="flex flex-col gap-y-3 pr-5">
                            <button 
                            className={`flex items-center gap-4 cursor-pointer rounded-r-xl p-4 hover:bg-light-text ${pathname == '/' ? 'bg-light-2 border-l-4 border-l-cyan text-dark' : 'text-light-2'}`}
                            onClick={() => router.push('/')}
                            >
                                <HomeIcon />
                                { isExpanded && <span className="font-semibold max-desktop:hidden">Overview</span> }
                            </button>
                            <button 
                            className={`flex items-center gap-4 cursor-pointer rounded-r-xl p-4 hover:bg-light-text ${pathname == '/transactions' ? 'bg-light-2 border-l-4 border-l-cyan text-dark' : 'text-light-2'}`}
                            onClick={() => router.push('/transactions')}
                            >
                                <TransactionsIcon />
                            { isExpanded && <span className="font-semibold max-desktop:hidden">Transactions</span> }
                            </button>
                            <button 
                            className={`flex items-center gap-4 cursor-pointer rounded-r-xl p-4 hover:bg-light-text ${pathname == '/budgets' ? 'bg-light-2 border-l-4 border-l-cyan text-dark' : 'text-light-2'}`}
                            onClick={() => router.push('/budgets')}
                            >
                                <BudgetsIcon />
                                { isExpanded && <span className="font-semibold max-desktop:hidden">Budgets</span> }
                            </button>
                            <button 
                            className={`flex items-center gap-4 cursor-pointer rounded-r-xl p-4 hover:bg-light-text ${pathname == '/pots' ? 'bg-light-2 border-l-4 border-l-cyan text-dark' : 'text-light-2'}`}
                            onClick={() => router.push('/pots')}
                            >
                                <PotsIcon />
                                { isExpanded && <span className="font-semibold max-desktop:hidden">Pots</span> }
                            </button>
                            <button 
                            className={`flex items-center gap-4 cursor-pointer rounded-r-xl p-4 hover:bg-light-text ${pathname == '/recurring-bills' ? 'bg-light-2 border-l-4 border-l-cyan text-dark' : 'text-light-2'}`}
                            onClick={() => router.push('/recurring-bills')}
                            >
                                <RecurringBillsIcon />
                                { isExpanded && <span className="font-semibold max-desktop:hidden">Recurring Bills</span> }
                            </button>
                        </div>
                    </nav>
                </div>
                <div className={`${isExpanded ? 'ml-5' : 'mx-auto -scale-x-100'} max-desktop:hidden`}>
                    <button
                    className="flex items-center gap-2 text-light-2 cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <ExpandButtonIcon />
                        { isExpanded && <span className="text-sm">Minimize Menu</span> }
                    </button>
                </div>
            </aside>

            <nav className='hidden bg-dark w-full fixed bottom-0 px-4 max-mobile-lg:block pt-2 rounded-t-lg z-[1]'>
                <div className="flex justify-between">
                    <button 
                    className={`flex items-center gap-4 cursor-pointer rounded-t-xl py-3 px-6 hover:bg-light-text ${pathname == '/' ? 'bg-light-2 border-b-5 border-b-cyan text-dark' : ''}`}
                    onClick={() => router.push('/')}
                    >
                        <HomeIcon />
                    </button>
                    <button 
                    className={`flex items-center gap-4 cursor-pointer rounded-t-xl py-3 px-6 hover:bg-light-text ${pathname == '/transactions' ? 'bg-light-2 border-b-5 border-b-cyan text-dark' : ''}`}
                    onClick={() => router.push('/transactions')}
                    >
                        <TransactionsIcon />
                    </button>
                    <button 
                    className={`flex items-center gap-4 cursor-pointer rounded-t-xl py-3 px-6 hover:bg-light-text ${pathname == '/budgets' ? 'bg-light-2 border-b-5 border-b-cyan text-dark' : ''}`}
                    onClick={() => router.push('/budgets')}
                    >
                        <BudgetsIcon />
                    </button>
                    <button 
                    className={`flex items-center gap-4 cursor-pointer rounded-t-xl py-3 px-6 hover:bg-light-text ${pathname == '/pots' ? 'bg-light-2 border-b-5 border-b-cyan text-dark' : ''}`}
                    onClick={() => router.push('/pots')}
                    >
                        <PotsIcon />
                    </button>
                    <button 
                    className={`flex items-center gap-4 cursor-pointer rounded-t-xl py-3 px-6 hover:bg-light-text ${pathname == '/recurring-bills' ? 'bg-light-2 border-b-5 border-b-cyan text-dark' : ''}`}
                    onClick={() => router.push('/recurring-bills')}
                    >
                        <RecurringBillsIcon />
                    </button>
                </div>
            </nav>
        </>
    )
}