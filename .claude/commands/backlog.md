Show the current state of the project backlog.

## Steps

1. Read all files in `docs/backlog/` that start with `story-`.
2. For each story extract: title, execution order, status, priority, estimation (story points).
3. Print a table sorted by execution order:

   | # | Story | Status | Priority | Points |
   |---|-------|--------|----------|--------|
   | 1 | ... | ✅ Completed / 🔲 Not Started / 🔄 In Progress | High/Med/Low | N |

4. Print a summary line: "X of Y stories completed (Z points done / W points remaining)."
5. Highlight the next recommended story (lowest execution order that is Not Started).
