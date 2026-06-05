# Flat Expenses Tracker API - Spring Boot

This is the Java Spring Boot implementation of the Flat Expenses Tracker API, equivalent to the Node.js Express.js version.

## Project Structure

Following the Hexagonal Architecture pattern:

```
src/main/java/com/expenses/tracker/
├── domain/              # Core business entities
├── application/         # Business logic and use cases
├── adapters/            # Controllers and DTOs
├── infrastructure/      # Database configuration and repositories
└── FlatExpensesApiApplication.java  # Main Spring Boot application
```

## Build & Run

### Prerequisites
- Java 21
- Gradle 8.7

### Build
```bash
./gradlew build
```

### Run
```bash
./gradlew bootRun
```

The API will be available at: `http://localhost:5000`

### Database Console
H2 Database console available at: `http://localhost:5000/h2-console`

## API Endpoints

### User Registration
```
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "flatNumber": "101",
  "role": "resident"
}
```

### User Login
```
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

## Dependencies

- Spring Boot 3.3.0
- Spring Web
- Spring Data JPA
- Spring Security
- H2 Database
- Lombok
- JWT (jjwt)

## Development

### Hot Reload
```bash
./gradlew bootRun --args='--spring.devtools.restart.enabled=true'
```

### Run Tests
```bash
./gradlew test
```
