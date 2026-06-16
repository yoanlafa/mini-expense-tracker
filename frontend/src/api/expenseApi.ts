import type {Expense, CreateExpenseRequest} from "../types/Expense.ts";

const API_URL = "http://localhost:8080/api/expenses";

export async function getExpenses(): Promise<Expense[]> {
    const response = await fetch(API_URL)

    if (!response.ok){
        throw new Error("Failed to fetch expenses")
    }
    return response.json();
}

export async function createExpense (expenseRequest: CreateExpenseRequest): Promise<Expense>{
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expenseRequest)
    });

    if (!response.ok){
        throw new Error("Failed to create Task")
    }

    return response.json();
}

export async function deleteExpense(expenseID: number): Promise<void>{
    const response = await fetch(`${API_URL}/${expenseID}`, {
        method:"DELETE",
    });

    if (!response.ok){
        throw new Error("Failed to delete!")
    }
}

export async function getTotalAmount(): Promise<number> {
    const response = await fetch("http://localhost:8080/api/expenses/sum");

    if (!response.ok){
        throw new Error("Failed to fetch total amount!");
    }

    return response.json();
}