import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CloseModalIcon from '@/assets/icons/icon-close-modal.svg';
import { budget, currentItem } from '@/utils/types';
import { colors } from '@/utils/colors';
import { useContext, useState } from 'react';
import { budgetsContext } from '@/app/budgets/budgets';
import jsonData from '@/app/data.json';


export default function EditBudget({ budget, index, setCurrentBudget }: {
    budget: budget,
    index: number,
    setCurrentBudget: React.Dispatch<React.SetStateAction<currentItem>>
}) {
    const [data, setData] = useState({
        category: budget.name,
        maxSpending: String(budget.value),
        theme: budget.theme
    });
    const [errorAt, setErrorAt] = useState(-1);
    const { budgets, setBudgets, categories } = useContext(budgetsContext)!;

    function editBudget() {
        if(!data.category) setErrorAt(0);
        else if(!data.maxSpending) setErrorAt(1);
        else if(!data.theme) setErrorAt(1);
        else {
            const transactions = jsonData.transactions.filter(transaction => transaction.category == data.category).slice(0, 3);
            const spent = transactions.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) * -1;
            const date = transactions.map(transaction => transaction.date);
            const budget = {
                name: data.category,
                value: parseInt(data.maxSpending),
                spent: spent,
                theme: data.theme,
                transactions: transactions,
                date: date
            };

            const temp = [...budgets];
            temp[index] = budget;
            setBudgets(temp);
            setCurrentBudget(currentBudget => {
                return { ...currentBudget, edit: -1 };
            });
            setData({
                category: '',
                maxSpending: '',
                theme: ''
            });
        }
    }

    return(
        <div className="w-full h-screen fixed left-0 top-0 flex justify-center items-center bg-[#00000080] z-[1]">
            <div className="w-2/6 bg-light rounded-xl p-7 max-desktop:w-2/5 max-desktop-sm:w-[45%] max-tablet:w-7/12
            max-tablet:p-6 max-mobile-lg:w-4/5 max-mobile:w-[90%] max-mobile:p-5">
                <div className="flex justify-end">
                    <div className="cursor-pointer" onClick={() => setCurrentBudget(currentBudget => {
                        return { ...currentBudget, edit: -1 };
                    })}>
                        <CloseModalIcon />
                    </div>
                </div>
                <div className='mb-5'>
                    <h1 className='text-2xl font-semibold mb-1'>Edit Budget</h1>
                    <p className='text-sm text-light-text font-semibold'>As your budgets changes, feel free to update your spending limits.</p>
                </div>
                <div className='mb-4'>
                    <h3 className='text-sm text-light-text font-semibold mb-0.5'>Budget Category</h3>
                    <Select value={data.category} onValueChange={value => {setData({ ...data, category: value }); setErrorAt(-1)}}>
                        <SelectTrigger className={`w-full ${errorAt == 0 ? 'border border-red-400' : ''}`}>
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            { categories.map((category, index) => (
                                    <SelectItem
                                    key={index}
                                    disabled={category.used ? true : false}
                                    value={category.label}
                                    >
                                        {category.label}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div className="mb-4">
                    <h3 className='text-sm text-light-text font-semibold mb-0.5'>Maximum Spending</h3>
                    <input
                    type="number"
                    min={1}
                    className={`w-full outline-none p-1 border border-lighter-text focus:border-navy rounded-sm ${errorAt == 1 ? 'border border-red-400' : ''}`}
                    value={data.maxSpending}
                    onChange={e => {setData({ ...data, maxSpending: e.target.value }); setErrorAt(-1)}}
                    />
                </div>
                <div className='mb-4'>
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
                <button className='bg-dark text-light py-1.5 rounded-sm w-full text-center cursor-pointer mt-4 hover:bg-light-text' onClick={editBudget}>Update Budget</button>
            </div>
        </div>
    )
}