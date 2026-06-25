package com.yoanlafazanski.mini_expense_tracker.controller;

import com.yoanlafazanski.mini_expense_tracker.dto.RegisterRequest;
import com.yoanlafazanski.mini_expense_tracker.dto.RegisterResponse;
import com.yoanlafazanski.mini_expense_tracker.model.AppUser;
import com.yoanlafazanski.mini_expense_tracker.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request){
        AppUser appUser = authService.register(request);

        RegisterResponse response = new RegisterResponse(appUser.getId(), appUser.getUsername());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
