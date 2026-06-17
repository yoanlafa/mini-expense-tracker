import type {Expense} from "../types/Expense.ts";

interface ExpenseItemProps{
    expense: Expense;
    onDeleteExpense: (expense: Expense) => void;
}

function formatDate(date:string){
    const [year, month, day] = date.split("-")
    return`${day}.${month}.${year}`;
}

function ExpenseItem({expense, onDeleteExpense}: ExpenseItemProps){
    return (
        <li className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr_80px] items-center gap-2 border p-4 rounded-lg shadow-sm">
            <h3 className="text-base font-bold text-center">{expense.title}</h3>

            <span className="text-sm text-center">{expense.category}</span>

            <span className="text-sm text-center">{formatDate(expense.date)}</span>

            <span className="text-base text-center">{expense.amount}€</span>

            <button
                onClick={() => onDeleteExpense(expense)}
                className="bg-red-100 hover:bg-red-300 text-red-700 px-3 py-1 rounded-md text-sm"
            >
                Delete
            </button>
        </li>
    );
}

export default ExpenseItem;