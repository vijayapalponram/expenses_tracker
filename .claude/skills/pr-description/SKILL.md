---
name: pr-description
description: Generate a structured pull request title and body from the current git diff and commit history.
---

Generate a pull request description for the current branch.

## Steps

1. Run `git log main..HEAD --oneline` to list commits on this branch.
2. Run `git diff main...HEAD --stat` to see files changed.
3. Run `git diff main...HEAD` to read the full diff.
4. Synthesise a PR title and body using the format below.

## Output format

**Title** (one line, ≤ 70 chars)
- Start with a verb: Add / Fix / Refactor / Update / Remove
- Describe *what* changed, not *how*

**Body**

---

## Summary
- Bullet list of what changed and why (3–5 points max)

## Changes
| Layer | What changed |
|-------|-------------|
| domain | ... |
| application | ... |
| adapters | ... |
| infrastructure | ... |

_(Only include rows where something actually changed)_

## How to test
- [ ] Step-by-step instructions a reviewer can follow to verify the feature manually
- [ ] Note any seed data or setup required

## Notes
Any context a reviewer needs: breaking changes, follow-up work, known limitations, or migration steps.

---

After printing the PR description, ask the user if they want it posted via `gh pr create`.
If yes, run:
```
gh pr create --title "<title>" --body "<body>"
```
