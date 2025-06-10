
export type page = {
    pageNumber: number,
    skip: number
}

export type categories = {
    value: string,
    label: string,
    used?: boolean
}[]

export type transaction = {
    avatar: string;
    name: string;
    category: string;
    date: string;
    amount: number;
    recurring: boolean;
    isDueSoon?: boolean;
}

export type transactions = transaction[]

export type budget = {
    name: string,
    value: number,
    spent: number,
    theme: string,
    transactions: transactions,
    date: string[]
}

export type budgets = budget[]

export type currentItem = {
    toggle: number,
    edit: number,
    delete: number
}

export type category = {
    value: string,
    label: string
}

export type pot = {
    name: string,
    target: number,
    total: number,
    theme: string,
    percent?: string
}

export type pots = pot[]

export type modifiedPot = {
    add: number,
    withdraw: number
}
