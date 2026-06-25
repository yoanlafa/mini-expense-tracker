package com.yoanlafazanski.mini_expense_tracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ExpenseRequest(
        @NotBlank
        String title,

        @NotBlank
        String category,

        @NotNull
        BigDecimal amount,

        @NotNull
        LocalDate date
) {
}
