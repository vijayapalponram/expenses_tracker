---
name: code-review
description: Review staged or recent changes in this Spring Boot hexagonal-architecture project for bugs, security issues, and architecture violations.
---

Review the current git diff (`git diff HEAD` or staged changes) for this Spring Boot 3.3 / Java 21 project.

## What to check

**Architecture (Hexagonal)**
- Layer violations: `domain` must not import from `application`, `adapters`, or `infrastructure`; `application` must not import from `adapters` or `infrastructure`
- Business logic leaking into controllers or JPA repositories
- DTOs crossing layer boundaries (domain entities returned directly from controllers)

**Security**
- Unprotected endpoints (missing `@PreAuthorize` or Security config exclusion)
- JWT claims not validated before use
- SQL injection via native queries or `@Query` with string concatenation
- Sensitive data (passwords, tokens) logged or returned in responses
- Mass assignment via direct entity binding from request body

**Spring Boot / JPA**
- N+1 query issues (missing `fetch join` or `@EntityGraph`)
- Transactions on the wrong layer (should be in `application` services, not controllers)
- `@Transactional` on private methods (proxy won't intercept)
- Missing pagination on list endpoints

**Code quality**
- Unused imports, fields, or methods
- Null checks that should be `Optional` or validated at the boundary
- Constants that should be in an enum or config property
- Lombok misuse (`@Data` on JPA entities — causes issues with `equals`/`hashCode`)

**Tests**
- New code paths without test coverage
- Tests asserting on implementation details instead of behaviour
- Missing edge cases for auth or validation logic

## Output format

Group findings by severity:

### Critical
> Things that will break in production or are security vulnerabilities.

### Warning
> Code smells, architecture violations, or risky patterns worth fixing before merge.

### Suggestion
> Nice-to-haves, style, or minor improvements.

For each finding include: file path + line number, what the issue is, and a concrete fix.
If there are no findings in a category, omit it.
End with a one-line summary verdict: **Approve**, **Approve with suggestions**, or **Request changes**.
