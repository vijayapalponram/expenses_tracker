Create a new backlog story for: $ARGUMENTS

## Steps

1. Read all existing story files in `docs/backlog/story-*.md` to find:
   - The highest current execution order number (new story gets +1).
   - The naming pattern used (e.g. `story-kebab-case-title.md`).

2. Derive a kebab-case filename from the argument (e.g. "add expense categories" → `story-add-expense-categories.md`).

3. Write the story file to `docs/backlog/{filename}.md` using this template:

```
# Story: {Title in Title Case}

**Execution Order**: {next number}

**Description**: {1-2 sentence description derived from the argument}

## Acceptance Criteria
- {3-5 specific, testable criteria derived from the argument}

**Priority**: Medium
**Estimation**: 2 story points

**Status**: Not Started
```

4. Check if a parent feature file exists that this story belongs to. If yes, note the relationship.
5. Confirm the file was created and show its contents.
