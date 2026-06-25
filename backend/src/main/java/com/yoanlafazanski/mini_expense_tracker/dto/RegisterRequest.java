package com.yoanlafazanski.mini_expense_tracker.dto;

import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(
        @NotBlank
        String username,

        @NotBlank
        String password
) {
}
