package service;

import DTO.ExpenseRequest;
import model.Expense;
import org.springframework.stereotype.Service;
import repository.ExpenseRepository;

import java.util.List;

@Service
public class ExpenseService {
    public final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<Expense> getAllExpense (){
        return expenseRepository.findAll();
    }

    public Expense createExpense (ExpenseRequest request){
        Expense expense = new Expense();
        expense.setDate(request.date());
        expense.setCategory(request.category());
        expense.setAmount(request.amount());
        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long id){
        expenseRepository.deleteById(id);
    }
}
