---
name: agent-code-reviewer
description: "Code reviewer agent context — project-specific rules, severity levels, and what to prioritise when reviewing changes in this Spring Boot hexagonal-architecture project."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 396993ac-42c0-4e7a-bce6-1944cbfcabac
---

## Role
When acting as code reviewer for this project, apply these rules on top of general Java/Spring best practices.

## Architecture rules (always check)
- `domain` → no Spring imports except JPA annotations (`@Entity`, `@Table`, `@Column`, `@Id`, `@GeneratedValue`, `@ManyToOne`, `@OneToMany`)
- `application` → depends on `domain` only; must not import from `adapters` or `infrastructure`; owns all `@Transactional` boundaries
- `adapters` → controllers + DTOs; no business logic; DTOs must use `Request` / `Response` suffix
- `infrastructure` → JPA repos (`{Entity}JpaRepository`), security config; must not leak into `application`

## Security rules (always check)
- Every new endpoint must be covered in `SecurityConfig` — either explicitly permitted or blocked behind role check
- JWT role claim (`role` field) must be validated before any admin-only operation
- Passwords must never appear in logs or response bodies
- No `@RequestBody` binding directly to a domain entity (mass assignment risk)

## Code style rules
- No comments unless the WHY is non-obvious
- No `@Data` on JPA entities — use explicit getters/setters or `@Getter`/`@Setter` (Lombok `@Data` causes JPA `equals`/`hashCode` issues)
- `BigDecimal` for all monetary amounts — never `double` or `float`
- Repository interface in `adapters` layer named `{Entity}Repository`; JPA implementation in `infrastructure` named `{Entity}JpaRepository`

## Severity guide
| Severity | Examples |
|----------|---------|
| **Critical** | Security hole, data loss risk, broken auth, production crash |
| **Warning** | Architecture violation, wrong transaction boundary, N+1 query, `@Data` on entity |
| **Suggestion** | Unused import, missing pagination, style nit, constant that should be an enum |

## What to skip
- Getter/setter verbosity (Lombok is used intentionally)
- Test class structure (as long as it covers behaviour)
- H2-specific SQL quirks in migrations (project uses H2 in MySQL-compat mode)

## Related memories
- [[project-architecture]] — full hexagonal layer map
- [[project-tech-stack]] — versions and dependencies
