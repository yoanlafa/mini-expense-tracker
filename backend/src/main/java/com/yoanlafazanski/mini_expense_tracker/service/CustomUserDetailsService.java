package com.yoanlafazanski.mini_expense_tracker.service;

import com.yoanlafazanski.mini_expense_tracker.model.AppUser;
import com.yoanlafazanski.mini_expense_tracker.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = userRepository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("User not found: "+username));

        return User.builder()
                .username(appUser.getUsername())
                .password(appUser.getPasswordHash())
                .authorities("USER")
                .build();
    }
}
