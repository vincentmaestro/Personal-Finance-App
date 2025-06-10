"use client";
import { createContext, useMemo, useState } from 'react';
import jsonData from '@/app/data.json';
import Pot from './pot';
import AddPot from './add-pot';
import { pots } from '@/utils/types';


export const potsContext = createContext<{
    pots: pots
    setPots: React.Dispatch<React.SetStateAction<pots>>
} | undefined>(undefined);

export default function Pots() {
    const [initialPots, setInitialPots] = useState(jsonData.pots);
    const [potModal, setPotModal] = useState(false);

    const data = useMemo(() => {
        const percentSaved = initialPots.map(pot => ((pot.total/pot.target) * 100).toFixed(2));
        const pots = initialPots.map((pot, index) => ({ ...pot, percent: percentSaved[index] }));

        return { pots };
    }, [initialPots]);

    return (
        <potsContext.Provider value={{ pots: data.pots, setPots: setInitialPots }}>
            <div className="w-full bg-light-2 px-16 py-14">
                <AddPot
                potModal={potModal}
                setPotModal={setPotModal}
                pots={data.pots}
                setPots={setInitialPots}
                />
                <div className="flex items-center justify-between mb-5">
                    <h1 className='text-2xl font-semibold'>Pots</h1>
                    <button
                    className='bg-dark text-light px-4 py-2 rounded-lg cursor-pointer hover:bg-light-text'
                    onClick={() => setPotModal(!potModal)}
                    >+ Add New Pot
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    { data.pots.map((pot, index) => (
                        <Pot key={index} pot={pot} index={index} />
                    )) }
                </div>
            </div>
        </potsContext.Provider>
    )
}