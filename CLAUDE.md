# Flat Expenses Tracker API

Spring Boot 3.3 REST API for tracking flat/apartment maintenance expenses. Uses Hexagonal Architecture and JWT-based authentication.

## Tech Stack

- Java 21, Spring Boot 3.3, Gradle 8.7
- Spring Security + JWT (jjwt 0.12.3)
- Spring Data JPA + H2 (file-based, MySQL-compatible mode)
- Flyway for DB migrations
- Lombok

## Build & Run

```bash
./gradlew build          # compile + test
./gradlew bootRun        # start on port 5000
./gradlew test           # tests only
./gradlew compileJava    # compile check
```

App runs at `http://localhost:5000`. H2 console at `http://localhost:5000/h2-console`.

## Architecture

Hexagonal (Ports & Adapters) under `src/main/java/com/expenses/tracker/`:

```
domain/          # Entities, value objects — no framework deps
application/     # Use cases / services (depend only on domain)
adapters/        # Controllers, DTOs (inbound adapters)
infrastructure/  # JPA repos, Security config (outbound adapters)
```

**Layer rules:**
- `domain` depends on nothing
- `application` depends on `domain` only
- `adapters` depends on `application` + `domain`
- `infrastructure` depends on `application` + `domain`

## Database Migrations

All schema changes go through Flyway in `src/main/resources/db/migration/`.
Naming: `V{version}__{Description}.sql` (e.g. `V2__Add_Expenses_Table.sql`).

## Naming Conventions

- Java: camelCase vars/methods, PascalCase classes, UPPER_SNAKE_CASE constants
- Files/dirs: kebab-case
- DTOs suffix: `Request` / `Response`
- Controllers: `{Entity}Controller`
- Services: `{Entity}Service`
- Repositories: `{Entity}JpaRepository` (infra), `{Entity}Repository` (adapter port)

## Solution Principles

- Hexagonal Architecture + DDD
- SOLID, DRY, clean code
- Stories live in `docs/backlog/` — mark status when completing

## Testing

JUnit 5 + Spring Boot Test. Integration tests use `@SpringBootTest`. Run with `./gradlew test`.

## Custom Commands

| Command | Purpose |
|---|---|
| `/build` | Compile and package |
| `/test` | Run test suite |
| `/run` | Start the app |
| `/add-endpoint` | Scaffold a full hexagonal endpoint |
| `/add-migration` | Create a numbered Flyway migration |
