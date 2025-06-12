import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useData } from "@/utils/provider";
import RightCaretIcon from '@/assets/icons/icon-caret-right.svg';

export default function Transactions() {
    const { transactions } = useData();
    const router = useRouter();

    return(
        <div className="bg-light rounded-xl px-6 py-5 col-start-1 col-span-6 row-start-2 row-span-2">
            <div className="flex items-center justify-between mb-4">
                <h1 className='font-semibold text-xl'>Transactions</h1>
                <button
                className='text-light-text cursor-pointer flex items-center gap-x-2'
                onClick={() => router.push('/transactions')}
                >
                    See Details
                    <RightCaretIcon />
                </button>
            </div>
            <div>
                { transactions.slice(0, 5).map((txn, index) => (
                    <div key={index} className={`w-full flex items-center justify-between py-4 mb-2 ${index < 4 ? 'border-b border-b-light-2' : ''}`}>
                        <div className="flex items-center gap-x-3">
                            <Image src={txn.avatar.slice(1)} alt={txn.name} width={35} height={35} className='rounded-[50%]' />
                            <h3>{txn.name}</h3>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className={txn.amount.toString()[0] == '-' ? 'text-dark font-semibold' : 'text-green font-semibold'}>{txn.amount.toString()[0] == '-' ? '-$' : '+$'}{txn.amount.toFixed(2).slice(1)}</p>
                            <p className='text-light-text text-sm'>{new Date(txn.date).toDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
      </div>
    )
}