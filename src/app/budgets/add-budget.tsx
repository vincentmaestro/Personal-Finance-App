import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CloseModalIcon from '@/assets/icons/icon-close-modal.svg';
import { categories, budgets } from '@/utils/types';
import { colors } from '@/utils/colors';
import { useState } from 'react';
import jsonData from '@/app/data.json';

export default function AddBudget({ budgetModal, setBudgetModal, categories, initialBudgets, setInitialBudgets }: {
    budgetModal: boolean,
    setBudgetModal: React.Dispatch<React.SetStateAction<boolean>>,
    categories: categories,
    initialBudgets: budgets,
    setInitialBudgets: React.Dispatch<React.SetStateAction<budgets>>
}) {
    const [data, setData] = useState({
        category: '',
        maxSpending: '',
        theme: ''
    });
    const [errorAt, setErrorAt] = useState(-1);

    function addBudget() {
        if(!data.category) setErrorAt(0);
        else if(!data.maxSpending) setErrorAt(1);
        else if(!data.theme) setErrorAt(2);
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

            setInitialBudgets([...initialBudgets, budget]);
            setBudgetModal(!budgetModal);
            setData({
                category: '',
                maxSpending: '',
                theme: ''
            });
        }
    }

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
                <button className='bg-dark text-light py-1.5 rounded-sm w-full text-center cursor-pointer mt-4 hover:bg-light-text' onClick={addBudget}>Add Budget</button>
            </div>
        </div>
    )
}