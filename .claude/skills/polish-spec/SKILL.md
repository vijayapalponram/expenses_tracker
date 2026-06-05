---
name: polish-spec
description: Take a rough feature idea or draft spec and produce a complete, well-structured feature specification ready for implementation.
---

The user has provided a rough feature idea or draft spec (in $ARGUMENTS or the conversation above).
Polish it into a complete, implementation-ready feature specification.

## Steps

1. Read the rough input carefully — infer intent where details are missing.
2. Ask clarifying questions ONLY if a critical ambiguity would block implementation (e.g. auth requirements, whether it's a new entity or extends an existing one). For minor gaps, make a reasonable assumption and note it.
3. Produce the polished spec in the format below.

## Output format

---

## Feature: {Short title}

**Goal**
One or two sentences — what problem this solves and for whom.

**Background / Context**
Why this is needed. Any relevant constraints or prior decisions.

---

### User Stories

- As a **{role}**, I want to **{action}** so that **{outcome}**.
  - Acceptance criteria:
    - [ ] ...
    - [ ] ...

_(Repeat for each distinct story)_

---

### API Contract

For each endpoint:

```
METHOD /path
Auth: required / public
```

**Request**
```json
{ ... }
```

**Response** `200 OK`
```json
{ ... }
```

**Error cases**
| Status | Condition |
|--------|-----------|
| 400 | ... |
| 401 | ... |
| 404 | ... |

---

### Domain Model

Entities added or changed, key fields, relationships.
Note any new value objects or domain events.

---

### Database Changes

List Flyway migrations needed:
- `V{n}__Description.sql` — what it does

---

### Security

- Who can call each endpoint (roles / JWT claims required)
- Any data visibility rules (e.g. users can only see their own records)

---

### Out of Scope

Explicitly list what this feature does NOT include, to prevent scope creep.

---

### Open Questions / Assumptions

List any assumptions made due to missing input, and any questions still needing an answer before work begins.

---

Keep the language precise and implementation-neutral where possible — describe *what*, not *how*.
