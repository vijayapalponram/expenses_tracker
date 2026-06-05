---
name: explain-code
description: Explain what a class or file does in the context of this project's hexagonal architecture — its role, responsibilities, and how it connects to other layers.
---

Explain the class or file named in $ARGUMENTS (or the file open/selected in the conversation).

## Steps

1. Read the target file fully.
2. Identify its hexagonal layer from its package path.
3. Trace its inbound callers and outbound dependencies by searching the codebase.
4. Produce the explanation below.

## Output format

### `ClassName` — {one-line role summary}

**Layer**: `{domain | application | adapters | infrastructure}`

**What it does**
2–4 sentences. Focus on *responsibility*, not implementation details. Explain it in terms of the business domain (expenses, residents, corpus fund) rather than framework mechanics.

**Key methods / fields**
A short table listing the most important public methods or fields and what they do. Skip getters/setters.

| Method / Field | Purpose |
|----------------|---------|
| ... | ... |

**How it fits in the architecture**
- What calls this class (inbound)
- What this class calls (outbound)
- Which ports/interfaces it implements or depends on (if any)

**What to watch out for**
Any non-obvious constraints, side effects, or things a developer should know before modifying this class (e.g. transactional boundaries, security assumptions, Lombok caveats).

Keep the explanation concise — aim for something a developer unfamiliar with this file can read in under 2 minutes.
