package com.yoanlafazanski.mini_expense_tracker.controller;

import com.yoanlafazanski.mini_expense_tracker.dto.ExpenseRequest;
import jakarta.validation.Valid;
import com.yoanlafazanski.mini_expense_tracker.model.Expense;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.yoanlafazanski.mini_expense_tracker.service.ExpenseService;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {
    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public List<Expense> getAllExpense(Principal principal) {
        return expenseService.getAllExpense(principal.getName());
    }

    @GetMapping("/sum")
    public BigDecimal sumAllAmount(Principal principal) {
        return expenseService.sumAllAmounts(principal.getName());
    }

    @PostMapping
    public ResponseEntity<Expense> createExpense(@Valid @RequestBody ExpenseRequest request, Principal principal) {
        Expense savedExpense = expenseService.createExpense(request, principal.getName());
        return new ResponseEntity<>(savedExpense, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id, Principal principal) {
        expenseService.deleteExpense(id, principal.getName());
        return ResponseEntity.noContent().build();
    }
}
