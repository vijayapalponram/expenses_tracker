Implement the backlog story: $ARGUMENTS

Follow the 5-step workflow exactly as defined in `.github/instructions/implementation.instructions.md`.

## Step 1 — Analyse

1. Find the story file in `docs/backlog/` matching the argument (e.g. "jwt" matches `story-session-management-jwt.md`).
2. Read the story: description, acceptance criteria, status, execution order.
3. Read related feature file if one exists.
4. Identify all backend changes needed across hexagonal layers:
   - domain entities / value objects
   - application services / use cases
   - adapter controllers + DTOs
   - infrastructure repositories / config
   - Flyway migrations
5. **Pause and present the analysis to the user. Wait for confirmation before proceeding.**

## Step 2 — Development

Only proceed after user approval from Step 1.

- Apply backend changes layer by layer (domain → application → adapters → infrastructure → migration).
- Follow naming conventions from CLAUDE.md.
- After all changes, run `./gradlew compileJava` to verify compilation.
- **Pause and show a summary of changed files. Wait for confirmation before proceeding.**

## Step 3 — Testing

Only proceed after user approval from Step 2.

- Add unit tests for the new service methods.
- Add an integration test covering the happy path.
- Run `./gradlew test` and report pass/fail with counts.

## Step 4 — CI/CD

- Run `./gradlew build` to ensure full build passes.
- Report the result.

## Step 5 — Close Out

- Update the story file: set `**Status**: Completed`.
- Check if all acceptance criteria are satisfied and list them as ✓ or ✗.
- If any acceptance criterion is newly addressed that wasn't listed before, add it to the story file.
- Suggest the next story to pick up (lowest execution order with status Not Started).
