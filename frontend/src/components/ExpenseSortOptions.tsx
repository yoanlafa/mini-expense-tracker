import type {SortingOption} from "../types/Expense.ts";

interface ExpenseSortOptionsProps{
    onSortingChange:(sortingOption:SortingOption) =>void;
}

function ExpenseSortingDropdown({onSortingChange}:ExpenseSortOptionsProps){
    return (
        <div className="mb-5 flex justify-center">
            <select onChange={(e) => onSortingChange(e.target.value as SortingOption)}
                    defaultValue = "Newest"
                    className="border rounded-md p-2 border-gray-300">
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Amount decreasing">Amount decreasing</option>
                <option value="Amount increasing">Amount increasing</option>
            </select>

        </div>
    );
}

export default ExpenseSortingDropdown;