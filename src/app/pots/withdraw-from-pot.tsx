import CloseModalIcon from '@/assets/icons/icon-close-modal.svg';
import { pot, modifiedPot } from '@/utils/types';
import { useContext, useState } from 'react';
import { potsContext } from '@/app/pots/page';

export default function WithdrawFromPot({ pot, index, setPotToBeModified }: {
    pot: pot,
    index: number
    setPotToBeModified: React.Dispatch<React.SetStateAction<modifiedPot>>
}) {
    const [visualWidth, setVisualWidth] = useState(pot.percent);
    const [currentPot, setCurrentPot] = useState(pot);
    const { pots, setPots } = useContext(potsContext)!;

    function effectVisualChange(e: React.ChangeEvent<HTMLInputElement>) {
        const maxRemove = pot.total;
        let amountToBeRemoved = e.target.value || '0';
        
        if(Number(amountToBeRemoved) > pot.total) {
            amountToBeRemoved = String(maxRemove);
            e.target.value = String(maxRemove);
        }

        const temp = { ...currentPot };
        const { target, total } = temp;
        const percentageDecrease = parseInt(amountToBeRemoved)/total * 100;
        setVisualWidth(String(Number(pot.percent) - percentageDecrease));
        const percent = (pot.total - Number(amountToBeRemoved))/target * 100;
        const newTotal = pot.total - Number(amountToBeRemoved);
        setCurrentPot(currentPot => {
            return { ...currentPot, percent: String(percent.toFixed(2)), total: newTotal };
        });
    }

    function withdrawFromPot() {
        const temp = [...pots];
        temp[index] = currentPot;
        setPots(temp);
        setPotToBeModified(pot => {
            return { ...pot, withdraw: -1 };
        });
    }

    return(
        <div className="fixed w-full h-screen left-0 top-0 z-[1] bg-[#00000080] flex items-center justify-center">
            <div className="w-2/6 bg-light rounded-xl px-7 pt-4 pb-6">
                <div className="flex justify-end">
                    <div className="cursor-pointer" onClick={() => setPotToBeModified(pot => ({ ...pot, withdraw: -1 }))}>
                        <CloseModalIcon />
                    </div>
                </div>
                <div className='mb-2'>
                    <h1 className='text-2xl font-semibold mb-1'>Withdraw From {pot.name}</h1>
                    <p className='text-sm text-light-text'>Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.</p>
                </div>
                <div className="mb-3">
                    <div className="flex justify-end text-2xl font-semibold mb-1">
                        ${currentPot.total}
                    </div>
                    <div className="flex items-center gap-x-0.5 w-full overflow-hidden mb-1">
                        <div style={{width: `${pot.percent}%`}}>
                            <progress className='w-full h-3 wfp' data-color={pot.theme} value={visualWidth} max={pot.percent} />
                        </div>
                        <div className='h-3 rounded-r-xl bg-[#d3d3d3]' style={{width: `${100 - Number(pot.percent)}%`}} />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-red">{currentPot.percent}%</span>
                        <span className="text-sm text-light-text">Target of ${pot.target}</span>
                    </div>
                </div>
                <div>
                    <h3 className='text-sm text-light-text mb-1'>Amount To Withdraw</h3>
                    <input
                    type="number"
                    autoFocus
                    min={1}
                    className={`w-full outline-none p-1 border border-lighter-text focus:border-navy rounded-sm`}
                    onChange={effectVisualChange}
                    />
                </div>
                <button className='bg-dark text-light py-1.5 rounded-sm w-full text-center cursor-pointer mt-2 hover:bg-light-text' onClick={withdrawFromPot}>Confirm Withdrawal</button>
            </div>
        </div>
    )
}