package com.yoanlafazanski.mini_expense_tracker.repository;

import com.yoanlafazanski.mini_expense_tracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUserUsername(String username);

    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user.username = :username")
    BigDecimal sumAllAmountsByUsername(@Param("username") String username);
}
