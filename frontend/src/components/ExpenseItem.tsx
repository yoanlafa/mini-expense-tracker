import type {Expense} from "../types/Expense.ts";

interface ExpenseItemProps{
    expense: Expense;
    onDeleteExpense: (expense: Expense) => void;
}

function ExpenseItem({expense, onDeleteExpense}: ExpenseItemProps){
    return (
        <li className="border p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div>
                <h3 className="text-lg font-bold">{expense.title}</h3>
            </div>
            <div className="flex gap-2">
                <h3 className="text-lg">{expense.category}</h3>

                <h3 className="text-lg">{expense.date}</h3>

                <h3 className="text-lg">{expense.amount}</h3>

                <button
                onClick={()=>onDeleteExpense(expense)}
                className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm">Delete</button>
            </div>

        </li>
    );
}

export default ExpenseItem;