package com.yoanlafazanski.mini_expense_tracker.repository;

import com.yoanlafazanski.mini_expense_tracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
