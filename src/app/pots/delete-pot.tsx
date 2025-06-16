import { pot, currentItem } from "@/utils/types";
import CloseModalIcon from '@/assets/icons/icon-close-modal.svg';
import { useContext } from 'react';
import { potsContext } from "@/app/pots/pots";

export default function DeletePot({ pot, index, setCurrentPot }: {
    pot: pot,
    index: number,
    setCurrentPot: React.Dispatch<React.SetStateAction<currentItem>>
}) {
    const {pots, setPots} = useContext(potsContext)!;

    function deletePot() {
        let newPots = [...pots];
        newPots.splice(index, 1);
        setPots(newPots);
        setCurrentPot(currentPot => ({ ...currentPot, delete: -1 }));
    }

    return(
        <div className="w-full h-screen fixed left-0 top-0 bg-[#00000080] z-[1] flex items-center justify-center">
            <div className="w-2/6 bg-light rounded-xl px-5 py-4">
                <div className="flex justify-end">
                    <div
                    className="cursor-pointer"
                    onClick={() => setCurrentPot(currentPot => ({ ...currentPot, delete: -1 }))}
                    >
                        <CloseModalIcon />
                    </div>
                </div>
                <h1 className="text-2xl font-semibold">Delete {pot.name}?</h1>
                <p className="text-light-text text-sm my-3">Are you sure you want to delete this pot? This action cannot be reversed</p>
                <div className="mt-5 flex flex-col items-center gap-y-2">
                    <button
                    className="w-full rounded-lg py-1.5 text-center cursor-pointer bg-red text-light"
                    onClick={deletePot}
                    >
                        Yes, Confirm Deletion
                    </button>
                    <button
                    className="w-full rounded-lg py-1.5 text-center cursor-pointer text-light-text"
                    onClick={() => setCurrentPot(currentPot => ({ ...currentPot, delete: -1 }))}
                    >
                        No, Go Back
                    </button>
                </div>
            </div>
        </div>
    )
}