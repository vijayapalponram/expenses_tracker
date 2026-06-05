export const meta = {
  name: 'spec-driven-dev',
  description: 'Spec-driven feature development: requirements → spec → plan → tasks → implement → polish',
  phases: [
    { title: 'Requirements', detail: 'Structure rough input into clear requirements' },
    { title: 'Spec',         detail: 'Write functional spec and save to docs/backlog' },
    { title: 'Plan',         detail: 'Break spec into phased implementation plan' },
    { title: 'Implement',    detail: 'Execute each task phase by phase' },
    { title: 'Polish',       detail: 'Review diff and clean up' },
  ],
}

// ── Phase 1: Requirements ────────────────────────────────────────────────────

phase('Requirements')
log(`Feature request: ${args}`)

const requirements = await agent(
  `You are a requirements analyst for a Spring Boot REST API — a flat/apartment expense tracker.

Feature request from the user:
"${args}"

Analyse this and produce structured requirements. Fill gaps with reasonable assumptions.
The system has two roles: 'admin' and 'resident'. Auth is JWT-based.
Existing entity: User (id, name, email, passwordHash, flatNumber, role).`,
  {
    label: 'structure-requirements',
    schema: {
      type: 'object',
      properties: {
        featureName:         { type: 'string', description: 'Short PascalCase feature name' },
        kebabName:           { type: 'string', description: 'kebab-case version for file names' },
        goal:                { type: 'string', description: 'One sentence — what problem this solves' },
        userStories:         { type: 'array', items: { type: 'string' } },
        acceptanceCriteria:  { type: 'array', items: { type: 'string' } },
        outOfScope:          { type: 'array', items: { type: 'string' } },
        assumptions:         { type: 'array', items: { type: 'string' } },
      },
      required: ['featureName', 'kebabName', 'goal', 'userStories', 'acceptanceCriteria'],
    },
  }
)

log(`Requirements structured for: ${requirements.featureName}`)

// ── Phase 2: Spec ────────────────────────────────────────────────────────────

phase('Spec')

const spec = await agent(
  `You are a technical writer for a Spring Boot 3.3 REST API project (Java 21, hexagonal architecture).

Write a complete, implementation-ready functional specification for this feature and save it to:
docs/backlog/feature-${requirements.kebabName}.md

== Requirements ==
Feature: ${requirements.featureName}
Goal: ${requirements.goal}
User Stories:
${requirements.userStories.map(s => '- ' + s).join('\n')}
Acceptance Criteria:
${requirements.acceptanceCriteria.map(c => '- [ ] ' + c).join('\n')}
Out of Scope: ${(requirements.outOfScope || []).join(', ')}
Assumptions: ${(requirements.assumptions || []).join(', ')}

== Project context ==
- Roles: admin, resident (in JWT claim)
- Existing entities: User (id, name, email, passwordHash, flatNumber, role)
- Next Flyway migration: check current highest V number in src/main/resources/db/migration/
- All endpoints under /api/...
- Unauthenticated requests → 401, wrong role → 403

== Spec sections to include ==
1. Goal + Background
2. User Stories with acceptance criteria checkboxes
3. API Contract (per endpoint: method, path, auth, request JSON, response JSON, error table)
4. Domain Model (new/changed entities, fields, enums)
5. Database Changes (Flyway migration names + what they do)
6. Security (role rules per endpoint)
7. Out of Scope
8. Open Questions / Assumptions

Write the full spec markdown and save it to the file path above.`,
  { label: 'write-spec' }
)

log('Spec written to docs/backlog/')

// ── Phase 3: Plan ────────────────────────────────────────────────────────────

phase('Plan')

const plan = await agent(
  `You are a software architect for a Spring Boot hexagonal architecture project.

Create an implementation plan for the feature: ${requirements.featureName}

Read the spec at docs/backlog/feature-${requirements.kebabName}.md for full details.

Break the work into phases matching the hexagonal layers — implement in this order:
1. Domain       — entities, value objects, enums (no framework deps, JPA annotations allowed)
2. Infrastructure — Flyway SQL migration, JpaRepository interface
3. Application  — port interfaces, service class (@Transactional lives here)
4. Adapters     — controller, request/response DTOs
5. Tests        — @SpringBootTest integration tests

For each phase, produce specific tasks (one task = one class or file to create/edit).

Write the plan to docs/backlog/plan-${requirements.kebabName}.md`,
  {
    label: 'create-plan',
    schema: {
      type: 'object',
      properties: {
        featureName: { type: 'string' },
        phases: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              tasks: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title:       { type: 'string' },
                    description: { type: 'string' },
                    filePath:    { type: 'string', description: 'Relative path of the file to create or edit' },
                  },
                  required: ['title', 'description', 'filePath'],
                },
              },
            },
            required: ['name', 'tasks'],
          },
        },
      },
      required: ['featureName', 'phases'],
    },
  }
)

log(`Plan created: ${plan.phases.length} phases, ${plan.phases.reduce((n, p) => n + p.tasks.length, 0)} tasks`)

// ── Phase 4: Implement ───────────────────────────────────────────────────────

phase('Implement')

for (const currentPhase of plan.phases) {
  log(`→ Phase: ${currentPhase.name}`)

  for (const task of currentPhase.tasks) {
    await agent(
      `You are implementing one specific task in a Spring Boot hexagonal architecture project.

== Task ==
Feature : ${plan.featureName}
Phase   : ${currentPhase.name}
Task    : ${task.title}
Detail  : ${task.description}
File    : ${task.filePath}

== Spec (source of truth) ==
Read docs/backlog/feature-${requirements.kebabName}.md before writing any code.

== Architecture rules ==
- domain      → no Spring/framework imports except JPA annotations
- application → depends on domain only; owns @Transactional; uses repository port interfaces (not JPA directly)
- adapters    → controllers + DTOs (suffix: Request / Response); no business logic
- infrastructure → JPA repos (UserJpaRepository pattern), security config

== Code style ==
- No comments unless the WHY is non-obvious
- No unused imports
- Lombok allowed (@Getter, @Setter, @NoArgsConstructor — avoid @Data on JPA entities)
- AssertJ for test assertions; @DisplayName on every test method

Implement the file at ${task.filePath} now.`,
      { label: `impl: ${task.title}`, phase: 'Implement' }
    )
  }
}

// ── Phase 5: Polish ──────────────────────────────────────────────────────────

phase('Polish')

await agent(
  `You are a senior engineer doing a final polish pass on a freshly implemented feature.

Feature just implemented: ${plan.featureName}

Steps:
1. Run: git diff HEAD  (or git diff main..HEAD if on a branch)
2. Review every changed file for:
   - Unused imports or variables
   - Business logic in controllers (move to service)
   - DTOs leaking into domain or application layers
   - Missing @Transactional or misplaced @Transactional (must be on service, not controller)
   - Hardcoded strings that should be constants
   - Any Lombok @Data on JPA entity (causes equals/hashCode issues — replace with explicit methods or @EqualsAndHashCode(onlyExplicitlyIncluded = true))
3. Apply small cleanups directly. Do not refactor structure — only polish.
4. Report: what was cleaned up, and confirm the feature looks production-ready.`,
  { label: 'polish' }
)

log(`✓ ${plan.featureName} — spec-driven development complete.`)

return {
  feature: plan.featureName,
  specFile: `docs/backlog/feature-${requirements.kebabName}.md`,
  planFile: `docs/backlog/plan-${requirements.kebabName}.md`,
  phases: plan.phases.length,
  tasks: plan.phases.reduce((n, p) => n + p.tasks.length, 0),
}
