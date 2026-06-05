package com.expenses.tracker.adapters;

import com.expenses.tracker.domain.User;
import com.expenses.tracker.infrastructure.UserJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Adapter for user persistence using Spring Data JPA
 */
@Repository
public class UserRepository {

    private final UserJpaRepository jpaRepository;

    public UserRepository(UserJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    public User save(User user) {
        return jpaRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return jpaRepository.findByEmail(email);
    }

}
