import {useState} from "react";
import type {CreateExpenseRequest} from "../types/Expense.ts";

interface ExpenseFormProps {
    onCreateExpense: (expenseRequest: CreateExpenseRequest) => void;
    onCancel: ()=>void;
}


//used for submitting new Expenses


function ExpenseForm({onCreateExpense, onCancel}: ExpenseFormProps) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");


    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        onCreateExpense({
            title,
            category,
            amount: Number(amount),
            date
        })

        setTitle("");
        setCategory("")
        setAmount("");
        setDate("")
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="min-h-screen bg-white p-5 font-sans max-w-[500px] mx-auto">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2.5"
            >
                <h3 className="font-bold text-2xl text-center mb-6 text-gray-800">
                    Submit New Expense
                </h3>

                <input
                    type="text"
                    placeholder="Expense Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border rounded-md p-2 w-full border-gray-300"
                />
                <select value={category}
                        required
                        onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="Groceries">Food</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Services">Services</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Taxes">Taxes</option>
                </select>

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    step="0.01"
                    min="0.01"
                    className="border rounded-md p-2 w-full border-gray-300"
                />

                <input
                type="date"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
                required
                className="border rounded-md p-2 w-full border-gray-300"/>

                <div className="mb-5 flex justify-center gap-3">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-black px-4 py-2 rounded-md"
                        > Submit Expense</button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className={"bg-gray-300 hover:bg-gray-500 text-black px-4 py-2 rounded-md"}>
                        Cancel
                    </button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default ExpenseForm;