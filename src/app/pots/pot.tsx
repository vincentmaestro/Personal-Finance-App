import { pot } from '@/utils/types';
import { useEffect, useState } from 'react';
import EditPot from './edit-pot';
import DeletePot from './delete-pot';
import AddToPot from './add-to-pot';
import WithdrawFromPot from './withdraw-from-pot';

export default function Pot({ pot, index }: {
    pot: pot,
    index: number,
}) {
    const [currentPot, setCurrentPot] = useState({
        toggle: -1,
        edit: -1,
        delete: -1
    });
    const [potToBeModified, setPotToBeModified] = useState({
        add: -1,
        withdraw: -1
    });

    useEffect(() => {
        onmousedown = function(e) {
            if(document.getElementById('pot-menu') && !document.getElementById('pot-menu')?.contains(e.target as HTMLElement)) {
                setCurrentPot(currentPot => {
                    return { ...currentPot, toggle: -1 }
                });
            }
        }
    }, [currentPot]);

    function toggleMenu() {
        setCurrentPot(currentBudget => {
            const { toggle } = currentPot;
            if(toggle == index) return { ...currentPot, toggle: -1 };
            else return { ...currentBudget, toggle: index };
        });
    }
    
    return(
        <div className="p-6 bg-light rounded-xl flex flex-col gap-y-3.5 shadow max-tablet:py-8 max-mobile-sm:px-4">
            { currentPot.edit == index &&
                <EditPot pot={pot} index={index} setCurrentPot={setCurrentPot} />
            }
            { currentPot.delete == index &&
                <DeletePot pot={pot} index={currentPot.delete} setCurrentPot={setCurrentPot}  />
            }
            { potToBeModified.add == index && 
                <AddToPot pot={pot} index={index} setPotToBeModified={setPotToBeModified} />
            }
            { potToBeModified.withdraw == index && 
                <WithdrawFromPot pot={pot} index={index} setPotToBeModified={setPotToBeModified} />
            }
            <div className="flex items-center justify-between relative">
                <div className="flex items-center gap-x-2">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: pot.theme}} />
                    <h2 className='text-lg font-semibold'>{pot.name}</h2>
                </div>
                <button className='text-2xl font-semibold tracking-wide cursor-pointer' onClick={toggleMenu}>...</button>
                { currentPot.toggle == index &&
                    <div id='pot-menu' className="bg-light p-3 rounded-xl w-[38%] absolute top-10 right-0 shadow max-mobile-lg:w-[45%] max-mobile:w-[50%]">
                        <button
                        className='cursor-pointer w-full text-center'
                        onClick={() => setCurrentPot(currentPot => {
                            return { ...currentPot, toggle: -1, edit: index };
                        })}
                        >
                            Edit Pot
                        </button>
                        <hr className='bg-dark my-4' />
                        <button
                        className='cursor-pointer text-red w-full text-center'
                        onClick={() => setCurrentPot(currentPot => {
                            return { ...currentPot, toggle: -1, delete: index };
                        })}
                        >
                            Delete Pot
                        </button>
                    </div>
                }
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <h3>Total Saved</h3>
                    <span className="text-xl font-semibold">${pot.total}</span>
                </div>
                <progress data-color={pot.theme} value={pot.total} max={pot.target} className="w-full h-3" />
                <div className="flex items-center justify-between">
                    <span className="text-sm text-light-text">{pot.percent}%</span>
                    <span className="text-sm text-light-text">Target of ${pot.target}</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 max-mobile-sm:grid-cols-1 max-mobile-sm:mt-4">
                <button
                className='bg-light-2 px-4 py-2.5 rounded-lg cursor-pointer shadow border border-transparent
                transition-colors duration-300 hover:border hover:border-light-text'
                onClick={() => setPotToBeModified(pot => ({ ...pot, add: index }))}
                >
                    + Add Money
                </button>
                <button
                className='bg-light-2 px-4 py-2.5 rounded-lg cursor-pointer shadow border border-transparent transition-colors duration-300 hover:border hover:border-light-text'
                onClick={() => setPotToBeModified(pot => ({ ...pot, withdraw: index }))}
                >
                    - Withdraw
                </button>
            </div>
        </div>
    )
}