import CloseModalIcon from '@/assets/icons/icon-close-modal.svg';
import { pot, modifiedPot } from '@/utils/types';
import { useContext, useState } from 'react';
import { potsContext } from '@/app/pots/pots';
import { useData } from '../../utils/provider';

export default function AddToPot({ pot, index, setPotToBeModified }: {
    pot: pot,
    index: number
    setPotToBeModified: React.Dispatch<React.SetStateAction<modifiedPot>>
}) {
    const [visualWidth, setVisualWidth] = useState('0');
    const [currentPot, setCurrentPot] = useState(pot);
    const { pots, setPots } = useContext(potsContext)!;
    const { balance, setBalance } = useData();
    const [amountAdded, setAmountAdded] = useState(0);

    function effectVisualChange(e: React.ChangeEvent<HTMLInputElement>) {
        const maxAdd = pot.target - pot.total;
        let amountToBeAdded = e.target.value || '0';
        
        if(Number(amountToBeAdded) > maxAdd) {
            amountToBeAdded = String(maxAdd);
            e.target.value = String(maxAdd);
        }

        setAmountAdded(parseInt(amountToBeAdded));
        
        const temp = { ...currentPot };
        const { target } = temp;
        const percentageIncrease = parseInt(amountToBeAdded)/target * 100;
        setVisualWidth(String(percentageIncrease));
        const percent = Number(pot.percent) + percentageIncrease;
        const total = pot.total + Number(amountToBeAdded);
        setCurrentPot(currentPot => {
            return { ...currentPot, percent: String(percent.toFixed(2)), total: total };
        });
    }

    function addToPot() {  
        const { current, expenses } = balance;
        const currentBalance = current - amountAdded;
        const currentExpenses = expenses + amountAdded;
        setBalance({ ...balance, current: currentBalance, expenses: currentExpenses });

        const temp = [...pots];
        temp[index] = currentPot;
        setPots(temp);
        setPotToBeModified(pot => {
            return { ...pot, add: -1 };
        });
    }

    return(
        <div className="fixed w-full h-screen left-0 top-0 z-[1] bg-[#00000080] flex items-center justify-center">
            <div className="w-2/6 bg-light rounded-xl px-7 pt-4 pb-6 max-desktop:w-2/5 max-desktop-sm:w-[45%] max-tablet:w-7/12
            max-tablet:p-6 max-mobile-lg:w-4/5 max-mobile:w-[90%] max-mobile:p-5">
                <div className="flex justify-end">
                    <div className="cursor-pointer" onClick={() => setPotToBeModified(pot => ({ ...pot, add: -1 }))}>
                        <CloseModalIcon />
                    </div>
                </div>
                <div className='mb-2 max-tablet:mb-4'>
                    <h1 className='text-2xl font-semibold mb-1 max-desktop-sm:mb-2'>Add To {pot.name}</h1>
                    <p className='text-sm text-light-text max-tablet:text-base'>Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.</p>
                </div>
                <div className="mb-3">
                    <div className="flex justify-end text-2xl font-semibold mb-1">
                        ${currentPot.total}
                    </div>
                    <div className="flex items-center gap-x-0.5 w-full overflow-hidden mb-1">
                        <div className='h-3 rounded-l-xl' style={{width: `${pot.percent}%`, backgroundColor: pot.theme}} />
                        <div style={{width: `${100 - Number(pot.percent)}%`}}>
                            <progress className='w-full h-3 atp' data-color={pot.theme} value={visualWidth} max={100 - Number(pot.percent)} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-green">{currentPot.percent}%</span>
                        <span className="text-sm text-light-text">Target of ${pot.target}</span>
                    </div>
                </div>
                <div>
                    <h3 className='text-sm text-light-text mb-1'>Amount To Add</h3>
                    <input
                    type="number"
                    autoFocus
                    min={1}
                    className={`w-full outline-none p-1 border border-lighter-text focus:border-navy rounded-sm`}
                    onChange={effectVisualChange}
                    />
                </div>
                <button className='bg-dark text-light py-1.5 rounded-sm w-full text-center cursor-pointer mt-2 hover:bg-light-text' onClick={addToPot}>Confirm Addition</button>
            </div>
        </div>
    )
}