import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CloseModalIcon from '@/assets/icons/icon-close-modal.svg';
import { colors } from '@/utils/colors';

export default function AddBudget({ budgetModal, setBudgetModal }: {
    budgetModal: boolean,
    setBudgetModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
    if(budgetModal)
    return(
        <div className="w-full h-screen fixed left-0 top-0 flex justify-center items-center bg-[#00000080] z-[1]">
            <div className="w-2/6 bg-light rounded-xl p-7">
                <div className="flex justify-end">
                    <div className="cursor-pointer" onClick={() => setBudgetModal(!budgetModal)}>
                        <CloseModalIcon />
                    </div>
                </div>
                <div className='mb-5'>
                    <h1 className='text-2xl font-semibold mb-1'>Add New Budget</h1>
                    <p className='text-sm text-light-text font-semibold w-[90%]'>Choose a category to set a spending budget. These categories can help you monitor spending.</p>
                </div>
                <div className='mb-4'>
                    <h3 className='text-sm text-light-text font-semibold mb-0.5'>Budget Category</h3>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mb-4">
                    <h3 className='text-sm text-light-text font-semibold mb-0.5'>Maximum Spending</h3>
                    <input type="text" className='w-full outline-none p-1 border border-lighter-text focus:border-ash-like rounded-sm ' />
                </div>
                <div className='mb-4'>
                    <h3 className='text-sm text-light-text font-semibold mb-0.5'>Theme</h3>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <button className='bg-dark text-light py-1.5 rounded-sm w-full text-center cursor-pointer mt-4 hover:bg-light-text'>Add Budget</button>
            </div>
        </div>
    )
}