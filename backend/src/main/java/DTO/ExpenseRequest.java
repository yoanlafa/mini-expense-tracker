package DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ExpenseRequest(
        @NotBlank
        String category,

        @NotNull
        Double amount,

        @NotNull
        LocalDate date
) {
}
