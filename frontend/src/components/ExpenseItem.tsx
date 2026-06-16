import type {Expense} from "../types/Expense.ts";

interface ExpenseItemProps{
    expense: Expense;
    onDeleteExpense: (expense: Expense) => void;
}

function ExpenseItem({expense, onDeleteExpense}: ExpenseItemProps){
    return (
        <li className="border p-4 rounded-lg shadow-sm flex justify-between items-center">

            <div className="flex gap-6 items-center">
                <h3 className="text-base font-bold">{expense.title}</h3>

                <h3 className="text-sm">{expense.category}</h3>

                <h3 className="text-sm">{expense.date}</h3>

                <h3 className="text-base">{expense.amount}€</h3>

                <button
                    onClick={() => onDeleteExpense(expense)}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm">Delete
                </button>
            </div>

        </li>
    );
}

export default ExpenseItem;