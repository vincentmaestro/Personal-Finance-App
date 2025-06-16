import { useRouter } from 'next/navigation';
import { useData } from '@/utils/provider';
import PotIcon from '../assets/icons/icon-pot.fed0644d.svg';
import RightCaretIcon from '@/assets/icons/icon-caret-right.svg';

export default function Pots() {
    const router = useRouter();
    const { pots } = useData();
    const totalSaved = pots.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);

    return(
        <div
        className="bg-light pt-4 pb-6 px-4 col-start-1 col-span-6 flex flex-col gap-3.5 rounded-lg row-start-1 row-span-1
        max-desktop-sm:col-span-5
        max-tablet:col-span-10"
        >
            <div className="flex justify-between mb-1 max-mobile:mb-4">
                <h1 className='font-semibold text-xl'>Pots</h1>
                <button
                className='text-light-text cursor-pointer flex items-center gap-x-2'
                onClick={() => router.push('/pots')}
                >
                    See Details
                    <RightCaretIcon />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-x-6 max-desktop-sm:gap-x-3 max-mobile-lg:grid-cols-1 gap-y-8">
                <div className="flex bg-light-2 items-center justify-center gap-x-8 rounded-xl max-desktop-sm:gap-x-5 max-tablet:py-4">
                    <PotIcon />
                    <div className='max-mobile-lg:py-5'>
                        <h1 className="mb-1 text-light-text">Total Saved</h1>
                        <span className='text-4xl font-semibold max-desktop-sm:text-3xl'>${totalSaved}</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6 max-mobile-lg:pl-2">
                    { pots.slice(0, 4).map((pot, index) => (
                    <div key={index} className="flex gap-x-3">
                        <div className="w-1.5 h-12 rounded-2xl" style={{ backgroundColor: pot.theme }} />
                        <div className="flex flex-col justify-between max-desktop-sm:justify-normal">
                            <h1 className='text-light-text'>{pot.name}</h1>
                            <span className='font-semibold'>${pot.total.toFixed(2)}</span>
                        </div>
                    </div>
                    )) }
                </div>
            </div>
      </div>
    )
}