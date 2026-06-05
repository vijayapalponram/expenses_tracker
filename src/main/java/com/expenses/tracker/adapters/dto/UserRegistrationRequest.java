package com.expenses.tracker.adapters.dto;

/**
 * DTO for user registration request
 */
public class UserRegistrationRequest {
    private String name;
    private String email;
    private String password;
    private String flatNumber;
    private String role;

    public UserRegistrationRequest() {
    }

    public UserRegistrationRequest(String name, String email, String password, String flatNumber, String role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.flatNumber = flatNumber;
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFlatNumber() {
        return flatNumber;
    }

    public void setFlatNumber(String flatNumber) {
        this.flatNumber = flatNumber;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
