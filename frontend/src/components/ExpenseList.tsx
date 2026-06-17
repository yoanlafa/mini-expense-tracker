import type {Expense} from "../types/Expense.ts";
import ExpenseItem from "./ExpenseItem.tsx";

interface ExpenseListProps {
    expenses: Expense[];
    onDeleteExpense:(expense: Expense)=>void;
}

function ExpenseList({expenses, onDeleteExpense}: ExpenseListProps){
    if (expenses.length===0){
        return <p>No expenses yet!</p>
    }

    return (
        <div className="mt-6">
            <div
                className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr_80px] items-center gap-2 border p-4 rounded-lg shadow-sm mb-4">
                <span className="text-sm font-bold text-center">Title</span>
                <span className="text-sm font-bold text-center">Category</span>
                <span className="text-sm font-bold text-center">Date</span>
                <span className="text-sm font-bold text-center">Amount</span>
                <span></span>
            </div>

            <ul className="space-y-3">
                {expenses.map((expense: Expense) => (
                    <ExpenseItem
                        key={expense.id}
                        expense={expense}
                        onDeleteExpense={onDeleteExpense}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ExpenseList;