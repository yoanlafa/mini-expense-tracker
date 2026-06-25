package com.yoanlafazanski.mini_expense_tracker.repository;

import com.yoanlafazanski.mini_expense_tracker.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);
}
