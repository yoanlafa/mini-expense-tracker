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
        <ul className = "mt-6">
            {expenses.map((expense:Expense)=>(
                <ExpenseItem
                key={expense.id}
                expense={expense}
                onDeleteExpense={onDeleteExpense}/>
            ))}
        </ul>
    )
}

export default ExpenseList;