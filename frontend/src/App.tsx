import { useState, useEffect } from 'react'
import './App.css'
import type {CreateExpenseRequest, Expense} from "./types/Expense.ts";
import ExpenseList from "./components/ExpenseList.tsx";
import {createExpense, deleteExpense, getExpenses} from "./api/expenseApi.ts";
import ExpenseForm from "./components/ExpenseForm.tsx";

function App(){
  const[expenses, setExpenses] = useState<Expense[]>([]);
  const[formVisible, setFormVisible]=useState(false);

  useEffect(() => {
    getExpenses().then((data)=>{
      console.log("Data from backend", data);
      setExpenses(data);
    })
        .catch((error)=>console.error("Error fetching expenses",error))

  }, []);

  const handleDeleteExpense = (expenseToDelete:Expense)=> {
    deleteExpense(expenseToDelete.id)
        .then(()=>{
          setExpenses((previousExpenses:Expense[])=>
          previousExpenses.filter((expense)=>expense.id !== expenseToDelete.id)
          );
        })
        .catch((error)=>console.error("Error deleting task:", error));
  };

  const handleExpenseForm = (expenseRequest: CreateExpenseRequest) => {
      createExpense(expenseRequest)
          .then((createdExpense)=>{
              setExpenses((previousExpenses:Expense[])=>[...previousExpenses, createdExpense]);
              setFormVisible(false);

          }).catch((error)=>console.error("Error creating Expense", error));
    }

  return (
      <div
          style={{
            padding: "20px",
            fontFamily: "sans-serif",
            maxWidth: "500px",
          }}>
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
              </div>
          </>
          {/* List of All the Expenses*/}

        {
          <ExpenseList
          expenses={expenses}
          onDeleteExpense={handleDeleteExpense}/>
        }

          {/*Form to Submit New Expenses*/}

          { formVisible &&
              <ExpenseForm onCreateExpense={handleExpenseForm}
              onCancel={()=>setFormVisible(false)}/>
          }
      </div>

  )
}


export default App
