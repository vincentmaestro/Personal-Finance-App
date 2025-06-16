"use client";
import Balance from '@/components/balance';
import Pots from '@/components/pots';
import Budgets from '@/components/budgets';
import Transactions from '@/components/transactions';
import RecurringBills from '@/components/recurring-bills-summary';

export default function Home() {

  return (
      <div className="w-full bg-light-2 p-8 max-mobile:px-5">
        <h1 className="text-2xl mb-5 font-semibold max-tablet:text-3xl">Overview</h1>
        <Balance />
        <div className="grid grid-cols-10 gap-6 max-tablet:gap-x-0 max-tablet:gap-y-8">
          <Pots />
          <Budgets />
          <Transactions />
          <RecurringBills />
        </div>
      </div>
  );
}
