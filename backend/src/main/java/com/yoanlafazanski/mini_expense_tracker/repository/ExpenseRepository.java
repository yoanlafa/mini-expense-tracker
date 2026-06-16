package com.yoanlafazanski.mini_expense_tracker.repository;

import com.yoanlafazanski.mini_expense_tracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    @Query("SELECT SUM(e.amount) FROM Expense e")
    BigDecimal sumAllAmounts();
}
