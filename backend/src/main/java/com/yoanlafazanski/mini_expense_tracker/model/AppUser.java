package com.yoanlafazanski.mini_expense_tracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "app_users")
@Data
@NoArgsConstructor
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, unique = true)
    private String username;

    @NotBlank
    @Column(nullable = false)
    private String passwordHash;
}
