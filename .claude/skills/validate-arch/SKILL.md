---
name: validate-arch
description: Scan the entire codebase for hexagonal architecture layer violations in this Spring Boot project and report all offenders.
---

Scan the codebase at `src/main/java/com/expenses/tracker/` for violations of the hexagonal architecture layer rules.

## Layer rules

| Layer | Package | May import from |
|-------|---------|-----------------|
| domain | `domain` | nothing (no framework, no other layers) |
| application | `application` | `domain` only |
| adapters | `adapters` | `application`, `domain` |
| infrastructure | `infrastructure` | `application`, `domain` |

## What counts as a violation

- `domain` importing from `application`, `adapters`, or `infrastructure`
- `domain` importing Spring/Jakarta annotations (except `@Entity`, `@Table`, `@Column`, `@Id`, `@GeneratedValue`, `@ManyToOne`, `@OneToMany` — JPA persistence annotations are permitted on domain entities in this project)
- `application` importing from `adapters` or `infrastructure`
- A DTO (class ending in `Request` or `Response`) used directly inside `application` or `domain`
- A JPA repository interface (`@Repository` or extending `JpaRepository`) placed inside `application` instead of `infrastructure`

## Steps

1. Read every `.java` file under `src/main/java/com/expenses/tracker/`.
2. For each file, identify its layer from its package path.
3. Check its `import` statements against the allowed imports for that layer.
4. Collect all violations.

## Output format

If no violations found:
> ✓ No architecture violations found. All layer boundaries are respected.

If violations found:

### Architecture Violations

For each violation:
- **File**: `path/to/File.java` (line number of the offending import)
- **Violation**: `{layer}` imports from `{forbidden layer}`
- **Import**: the exact import statement
- **Fix**: one sentence on how to resolve it

End with a count: `{n} violation(s) found across {m} file(s).`
