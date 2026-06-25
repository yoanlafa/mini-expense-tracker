package com.yoanlafazanski.mini_expense_tracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "expenses")
@Data
@NoArgsConstructor
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String category;

    @NotNull
    private BigDecimal amount;

    @DateTimeFormat
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;
}
