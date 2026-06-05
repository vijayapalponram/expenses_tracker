package com.expenses.tracker.adapters;

import com.expenses.tracker.adapters.dto.UserLoginRequest;
import com.expenses.tracker.adapters.dto.UserRegistrationRequest;
import com.expenses.tracker.adapters.dto.UserResponse;
import com.expenses.tracker.application.UserService;
import com.expenses.tracker.domain.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Web controller for user registration and login
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Register a new user
     */
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody UserRegistrationRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(request.getPassword());
        user.setFlatNumber(request.getFlatNumber());
        user.setRole(request.getRole());

        User registeredUser = userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(UserResponse.fromUser(registeredUser));
    }

    /**
     * User login endpoint
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest request) {
        Optional<User> authenticatedUser = userService.authenticate(request.getEmail(), request.getPassword());

        if (authenticatedUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        return ResponseEntity.ok(UserResponse.fromUser(authenticatedUser.get()));
    }

}
