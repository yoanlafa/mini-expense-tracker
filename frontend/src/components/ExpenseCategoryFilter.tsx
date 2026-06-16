import type {CategoryFilter} from "../types/Expense.ts";

interface ExpenseCategoryFilterProps{
    onFilterChange: (filter: CategoryFilter) => void;
}

function ExpenseCategoryDropdown({onFilterChange}: ExpenseCategoryFilterProps) {
    return (
        <div className="mb-5 flex justify-center">
            <select
                onChange={(e) => onFilterChange(e.target.value as CategoryFilter)}
                defaultValue="All"
                className="border rounded-md p-2 border-gray-300">
                <option value = "All">All</option>
                <option value="Groceries">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Services">Services</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Taxes">Taxes</option>
            </select>
        </div>
    );
}

export default ExpenseCategoryDropdown;