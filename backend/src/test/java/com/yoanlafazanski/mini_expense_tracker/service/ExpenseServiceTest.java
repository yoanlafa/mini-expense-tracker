package com.yoanlafazanski.mini_expense_tracker.service;

import com.yoanlafazanski.mini_expense_tracker.repository.ExpenseRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class ExpenseServiceTest {
    @Mock
    private ExpenseRepository expenseRepository;

    @InjectMocks
    private ExpenseService expenseService;

    @Test
    void sumAllAmounts_returnsTotalAmounts(){
        when(expenseRepository.sumAllAmounts())
                .thenReturn(new BigDecimal("25.50"));

        BigDecimal result = expenseService.sumAllAmounts();

        assertEquals(new BigDecimal("25.50"),result);
    }

    @Test
    void deleteExpense_deletesExpenseById(){
        Long expenseId = 1L;

        expenseService.deleteExpense(expenseId);
        verify(expenseRepository).deleteById(expenseId);
    }


}
