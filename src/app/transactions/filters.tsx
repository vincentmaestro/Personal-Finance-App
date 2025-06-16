import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sortBy as sortOptions  } from '@/utils/transactions-logic';
import { categories } from '@/utils/categories';
import FilterIcon from '@/assets/icons/icon-filter-mobile.svg';
import SortIcon from '@/assets/icons/icon-sort-mobile.svg';

export default function TransactionFilters({
    search,
    performSearch,
    sortBy,
    setSortBy,
    category,
    filterCategory
}: {
    search: string,
    performSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    sortBy: string,
    setSortBy: React.Dispatch<React.SetStateAction<string>>,
    category: string,
    filterCategory: (v: string, e?: React.ChangeEvent<HTMLSelectElement>) => void
}) {
    return(
        <div className="flex items-center justify-between mb-8">
            <input
            type="text"
            placeholder="Search Transaction"
            value={search}
            className='bg-light px-3 py-1 border border-lighter-text focus:border-navy rounded-lg outline-none w-[35%] max-tablet:w-[45%]'
            onChange={performSearch}
            />
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className='max-tablet:hidden'>Sort by</span>
                    <select
                    value={sortBy}
                    className='border border-navy px-2 py-1 rounded-lg outline-none max-tablet:hidden'
                    onChange={e => setSortBy(e.target.value)}
                    >
                        { sortOptions.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        )) }
                    </select>
                    <div className="hidden max-tablet:block">
                        <Select value={sortBy} onValueChange={value => setSortBy(value)}>
                            <SelectTrigger>
                                <div className="hidden max-tablet:block">
                                    <SortIcon />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                { sortOptions.map((option, index) => (
                                    <SelectItem
                                    key={index}
                                    value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                )) }
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className='max-tablet:hidden'>Category</span>
                    <select
                    className='border border-navy px-2 py-1 rounded-lg outline-none max-tablet:hidden'
                    value={category}
                    onChange={e => filterCategory('', e)}
                    >
                        { categories.map((category, index) => (
                            <option key={index} value={category.label}>{category.label}</option>
                        )) }
                    </select>
                    <div className="hidden max-tablet:block">
                        <Select value={category} onValueChange={value => filterCategory(value)}>
                            <SelectTrigger>
                                <div className="hidden max-tablet:block">
                                    <FilterIcon />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                { categories.map((category, index) => (
                                    <SelectItem
                                    key={index}
                                    value={category.label}
                                    >
                                        {category.label}
                                    </SelectItem>
                                )) }
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}