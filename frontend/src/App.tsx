import { useState, useEffect } from 'react'
import './App.css'
import type {CreateExpenseRequest, Expense} from "./types/Expense.ts";
import ExpenseList from "./components/ExpenseList.tsx";
import {createExpense, deleteExpense, getExpenses, getTotalAmount} from "./api/expenseApi.ts";
import ExpenseForm from "./components/ExpenseForm.tsx";
import ExpenseCategoryDropdown from "./components/ExpenseCategoryFilter.tsx";
import TimeFilterFields from "./components/TimeFilter.tsx";

function App(){
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [formVisible, setFormVisible]=useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("All");
    {/*states used for filtering the time period*/}
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  useEffect(() => {
    getExpenses().then((data)=>{
      console.log("Data from backend", data);
      setExpenses(data);
    })
        .catch((error)=>console.error("Error fetching expenses",error))

  }, []);

    {/* gets the total amount*/}

    useEffect(() => {
        getTotalAmount()
            .then((data)=>setTotalAmount(data))
            .catch((error)=>console.error("Error fetching total amount:", error))
    }, []);


  const handleDeleteExpense = (expenseToDelete:Expense)=> {
    deleteExpense(expenseToDelete.id)
        .then(()=>{
          setExpenses((previousExpenses:Expense[])=>
          previousExpenses.filter((expense)=>expense.id !== expenseToDelete.id)
          );
            setTotalAmount((previous)=>previous - expenseToDelete.amount);
        })
        .catch((error)=>console.error("Error deleting task:", error));
  };

  const handleExpenseForm = (expenseRequest: CreateExpenseRequest) => {
      createExpense(expenseRequest)
          .then((createdExpense)=>{
              setExpenses((previousExpenses:Expense[])=>[...previousExpenses, createdExpense]);
              setFormVisible(false);
              setTotalAmount((previous)=>previous + createdExpense.amount);

          }).catch((error)=>console.error("Error creating Expense", error));
  };

    {/*filter the list of expenses*/}

  const displayedExpenses: Expense[] = expenses.filter((expense)=>{
      const matchCategory = categoryFilter ==="All" || expense.category ===categoryFilter;
      const matchesStartDate = startDate === "" || expense.date >= startDate;
      const matchesEndDate = endDate === "" || expense.date <= endDate;

      const matchDate = matchesStartDate && matchesEndDate;

      return matchCategory && matchDate;
  });

    if (formVisible){
        return(
            <div className="p-5 font-sans max-w-[500px] mx-auto">
            {/*Form to Submit New Expenses*/}

        {
            <ExpenseForm onCreateExpense={handleExpenseForm}
                         onCancel={()=>setFormVisible(false)}/>
        }
            </div>
        );
    }

  return (
      <div className="p-5 font-sans max-w-[500px] mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Mini Expense Tracker
        </h1>
          <>
              <div className="mb-6 flex items-center justify-between">

                  <button
                      onClick={()=>setFormVisible(true)}
                      className="bg-green-500 text-black px-4 py-2 rounded-md text-lg"
                      >+</button>

                  <h3 className="text-2xl font-bold text-center text-green-600">
                      Expenses
                  </h3>

                  <h3 className="text-2xl font-bold text-center text-green-600">
                      Total Spent: {totalAmount}
                  </h3>
              </div>

              <div className="mb-6 flex flex-col gap-3">
                  <TimeFilterFields onStartDateChange={setStartDate} onEndDateChange={setEndDate}/>
                  <ExpenseCategoryDropdown onFilterChange={setCategoryFilter}/>
              </div>

              <div className="border p-4 rounded-lg shadow-sm flex justify-between items-center">
                  <h3 className="text-base font-bold">Title</h3>

                  <h3 className="text-sm">Category</h3>

                  <h3 className="text-sm">Date</h3>

                  <h3 className="text-base">Amount</h3>
              </div>
          </>
          {/* List of All the Expenses*/}

          {displayedExpenses.length === 0 ? (
              <p className="text-center text-gray-500 my-6">No tasks match the active filters.</p>
          ) : (
              < ExpenseList
                  expenses = {displayedExpenses}
            onDeleteExpense={handleDeleteExpense}/>
        )
        }
      </div>

  );
}


export default App;
