import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CloseModalIcon from '@/assets/icons/icon-close-modal.svg';
import { pots } from '@/utils/types';
import { colors } from '@/utils/colors';
import React, { useState } from 'react';

export default function AddPot({ potModal, setPotModal, pots, setPots }: {
    potModal: boolean,
    setPotModal: React.Dispatch<React.SetStateAction<boolean>>,
    pots: pots,
    setPots: React.Dispatch<React.SetStateAction<pots>>
}) {
    const [data, setData] = useState({
        potName: '',
        targetAmount: '',
        theme: ''
    });
    const [errorAt, setErrorAt] = useState(-1);

    function addPot() {
        if(!data.potName) setErrorAt(0);
        else if(!data.targetAmount) setErrorAt(1);
        else if(!data.theme) setErrorAt(2);
        else {
            const pot = {
                name: data.potName,
                target: parseInt(data.targetAmount),
                total: 0,
                theme: data.theme,
                percent: ''
            };

            setPots([...pots, pot]);
            setPotModal(!potModal);
            setData({
                potName: '',
                targetAmount: '',
                theme: ''
            });
        }
    }

    if(potModal)
    return(
        <div className="w-full h-screen fixed left-0 top-0 flex justify-center items-center bg-[#00000080] z-[1]">
            <div className="w-2/6 bg-light rounded-xl px-7 pt-4 pb-6 max-desktop:w-2/5 max-desktop-sm:w-[45%] max-tablet:w-7/12
            max-tablet:p-6 max-mobile-lg:w-4/5 max-mobile:w-[90%] max-mobile:p-5">
                <div className="flex justify-end">
                    <div className="cursor-pointer" onClick={() => setPotModal(!potModal)}>
                        <CloseModalIcon />
                    </div>
                </div>
                <div className='mb-6 max-tablet:mb-4'>
                    <h1 className='text-2xl font-semibold'>Add New Pot</h1>
                </div>
                <div className="mb-3">
                    <h3 className='text-sm text-light-text font-semibold mb-0.5'>Pot Name</h3>
                    <input
                    type="text"
                    autoFocus
                    className={`w-full outline-none p-1 border border-lighter-text focus:border-navy rounded-sm ${errorAt == 0 ? 'border border-red-400' : ''}`}
                    value={data.potName}
                    onChange={e => {setData({ ...data, potName: e.target.value }); setErrorAt(-1)}}
                    />
                </div>
                <div className="mb-3">
                    <h3 className='text-sm text-light-text font-semibold mb-0.5'>Target Amount</h3>
                    <input
                    type="number"
                    min={1}
                    className={`w-full outline-none p-1 border border-lighter-text focus:border-navy rounded-sm ${errorAt == 1 ? 'border border-red-400' : ''}`}
                    value={data.targetAmount}
                    onChange={e => {setData({ ...data, targetAmount: e.target.value }); setErrorAt(-1)}}
                    />
                </div>
                <div className='mb-3'>
                    <h3 className='text-sm text-light-text font-semibold mb-0.5'>Theme</h3>
                    <Select value={data.theme} onValueChange={value => {setData({ ...data, theme: value }); setErrorAt(-1)}}>
                        <SelectTrigger className={`w-full ${errorAt == 2 ? 'border border-red-400' : ''}`}>
                            <SelectValue placeholder="Select Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            { colors.map((color, index) => (
                                <SelectItem
                                key={index}
                                value={color.value}
                                >
                                    <div className="w-3 h-3 rounded-[50%]" style={{backgroundColor: color.value}} />
                                    {color.label}
                                </SelectItem>
                            )) }
                        </SelectContent>
                    </Select>
                </div>
                <button className='bg-dark text-light py-1.5 rounded-sm w-full text-center cursor-pointer mt-4 hover:bg-light-text' onClick={addPot}>Add Pot</button>
            </div>
        </div>
    )
}