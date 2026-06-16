export interface Expense{
    id: number;
    title: string;
    category: string;
    amount: number;
    date: string
}

export interface CreateExpenseRequest{
    title: string;
    category:string;
    amount:number;
    date:string;
}

export type CategoryFilter = 'Groceries' | 'Shopping' | 'Services' | 'Entertainment' | 'Taxes' | 'All'