"use client";
import { createContext, useState } from 'react';
import Pot from './pot';
import AddPot from './add-pot';
import { pots } from '@/utils/types';
import { useData } from '../../utils/provider';

export const potsContext = createContext<{
    pots: pots,
    setPots: React.Dispatch<React.SetStateAction<pots>>
} | undefined>(undefined);

export default function Pots() {
    const { pots, setPots } = useData();
    const [potModal, setPotModal] = useState(false);

    return (
        <potsContext.Provider value={{ pots: pots, setPots: setPots }}>
            <div className="w-full bg-light-2 px-16 py-14 max-mobile-lg:px-8 max-mobile:px-4">
                <AddPot
                potModal={potModal}
                setPotModal={setPotModal}
                pots={pots}
                setPots={setPots}
                />
                <div className="flex items-center justify-between mb-5 max-tablet:mb-8">
                    <h1 className='text-2xl font-semibold max-tablet:text-3xl'>Pots</h1>
                    <button
                    className='bg-dark text-light px-4 py-2 rounded-lg cursor-pointer hover:bg-light-text'
                    onClick={() => setPotModal(!potModal)}
                    >+ Add New Pot
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-6 max-tablet:grid-cols-1 max-tablet:gap-8">
                    { pots.map((pot, index) => (
                        <Pot
                        key={index}
                        pot={pot}
                        index={index}
                        />
                    )) }
                </div>
            </div>
        </potsContext.Provider>
    )
}