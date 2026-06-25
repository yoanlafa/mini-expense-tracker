package com.yoanlafazanski.mini_expense_tracker.service;

import com.yoanlafazanski.mini_expense_tracker.dto.RegisterRequest;
import com.yoanlafazanski.mini_expense_tracker.model.AppUser;
import com.yoanlafazanski.mini_expense_tracker.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AppUser register(RegisterRequest request){
        if (userRepository.findByUsername(request.username()).isPresent()){
            throw new IllegalArgumentException("Username already exists!");
        }

        AppUser appUser = new AppUser();
        appUser.setUsername(request.username());
        appUser.setPasswordHash(passwordEncoder.encode(request.password()));

        return userRepository.save(appUser);
    }
}
