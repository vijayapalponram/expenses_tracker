Perform a security audit of the Spring Boot application.

## What to check

### 1. Spring Security Configuration
- Read `src/main/java/com/expenses/tracker/infrastructure/SecurityConfig.java`
- Verify CSRF is configured appropriately for a stateless JWT API
- Check that `/api/users/register` and `/api/users/login` are the only public endpoints
- Ensure all other routes require authentication

### 2. JWT Implementation
- Find JWT utility / filter classes
- Verify token signing uses a strong algorithm (HS256 minimum, RS256 preferred)
- Check token expiry is set and enforced
- Verify the secret key is not hardcoded — should come from `application.yml` or environment variable
- Check that tokens are validated on every request

### 3. Password Security
- Find where passwords are stored
- Verify BCryptPasswordEncoder (or equivalent) is used — never plain text or MD5/SHA1
- Check that raw passwords are not logged anywhere

### 4. Input Validation
- Check DTOs for Bean Validation annotations (`@NotNull`, `@Size`, `@Email`, etc.)
- Verify controller methods use `@Valid` on request bodies

### 5. Database
- Check for any native queries that could allow SQL injection
- Review Flyway migrations for any sensitive defaults

## Output Format

For each area report:
- **Status**: ✅ OK / ⚠️ Warning / ❌ Issue
- **Finding**: what was found
- **Recommendation**: what to fix (only if not OK)

End with a prioritized list of issues to fix (Critical → High → Medium).
