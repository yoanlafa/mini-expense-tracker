package com.yoanlafazanski.mini_expense_tracker.service;

import com.yoanlafazanski.mini_expense_tracker.dto.ExpenseRequest;
import com.yoanlafazanski.mini_expense_tracker.model.AppUser;
import com.yoanlafazanski.mini_expense_tracker.model.Expense;
import com.yoanlafazanski.mini_expense_tracker.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.yoanlafazanski.mini_expense_tracker.repository.ExpenseRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;


    public ExpenseService(ExpenseRepository expenseRepository, UserRepository userRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    public List<Expense> getAllExpense(String username) {
        return expenseRepository.findByUserUsername(username);
    }

    public Expense createExpense(ExpenseRequest request, String username) {
        AppUser appUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Expense expense = new Expense();
        expense.setTitle(request.title());
        expense.setDate(request.date());
        expense.setCategory(request.category());
        expense.setAmount(request.amount());
        expense.setUser(appUser); // Bind the logged-in user!

        return expenseRepository.save(expense);
    }

    public BigDecimal sumAllAmounts(String username) {
        BigDecimal sum = expenseRepository.sumAllAmountsByUsername(username);
        return Objects.requireNonNullElse(sum, BigDecimal.ZERO);
    }

    public void deleteExpense(Long id, String username) {
        // Optional Security Check: Ensure the expense actually belongs to the user deleting it
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Expense not found"));

        if (!expense.getUser().getUsername().equals(username)) {
            throw new SecurityException("Unauthorized to delete this expense");
        }

        expenseRepository.deleteById(id);
    }
}
