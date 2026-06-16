package com.yoanlafazanski.mini_expense_tracker.controller;

import com.yoanlafazanski.mini_expense_tracker.DTO.ExpenseRequest;
import jakarta.validation.Valid;
import com.yoanlafazanski.mini_expense_tracker.model.Expense;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.yoanlafazanski.mini_expense_tracker.service.ExpenseService;

import java.math.BigDecimal;
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
    public List<Expense> getAllExpense(){
        return expenseService.getAllExpense();
    }

    @GetMapping("/sum")
    public BigDecimal sumAllAmount(){
        return expenseService.sumAllAmounts();
    }

    @PostMapping
    public ResponseEntity<Expense> createExpense(@Valid @RequestBody ExpenseRequest request){
        Expense savedExpense = expenseService.createExpense(request);
        return new ResponseEntity<>(savedExpense, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id){
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}
