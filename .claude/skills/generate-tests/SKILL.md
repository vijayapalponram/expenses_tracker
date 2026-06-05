---
name: generate-tests
description: Generate JUnit 5 integration and unit tests for a given service or controller class in this Spring Boot hexagonal-architecture project.
---

Generate tests for the class named in $ARGUMENTS (or the file open/selected in the conversation).

## Steps

1. Read the target class fully.
2. Identify what layer it belongs to (controller, service, domain, repository).
3. Choose the right test strategy per layer (see below).
4. Write tests covering: happy path, validation failures, auth/role enforcement, and key edge cases.
5. Write the test file to the correct path under `src/test/java/...` mirroring the source package.

## Test strategy by layer

**Controller (`adapters/`)**
- Use `@SpringBootTest(webEnvironment = RANDOM_PORT)` + `TestRestTemplate`
- Test each endpoint: valid request, missing/invalid fields (expect 400), unauthenticated (expect 401), wrong role (expect 403)
- Do not mock the service — test the full stack

**Service (`application/`)**
- Use `@SpringBootTest` with a real H2 database
- Test business logic, state transitions, and error conditions
- Seed data via repository saves in `@BeforeEach`

**Repository (`infrastructure/`)**
- Use `@DataJpaTest`
- Test custom queries, pagination, and any derived finders

**Domain (`domain/`)**
- Plain JUnit 5, no Spring context
- Test value object validation and any domain logic methods

## Output format

- One test class per source class
- Class name: `{SourceClass}Test`
- Package matches source package
- Use `@DisplayName` on each test method describing the scenario in plain English
- Group with `@Nested` inner classes per method/scenario being tested
- Use `AssertJ` assertions (`assertThat(...)`)
- Add a `// given / when / then` comment structure inside each test

Write the full file content, then state the path where it was saved.
