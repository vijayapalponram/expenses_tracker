export const meta = {
  name: 'multi-repo-edit',
  description: 'Apply a coordinated change across multiple repos in parallel — one agent per repo',
  phases: [
    { title: 'Discover', detail: 'Read each repo and understand what needs to change' },
    { title: 'Edit',     detail: 'Apply changes in parallel, one isolated agent per repo' },
    { title: 'Summary',  detail: 'Report what changed in each repo' },
  ],
}

// ── Input ────────────────────────────────────────────────────────────────────
// args can be:
//   "task description"
//   { task: "description", repos: ["repo-name-1", "repo-name-2"] }  ← filter to specific repos
//
// Repo list is always sourced from .claude/multi-repo.json
// Pass repos array in args to target only a subset.

const task   = typeof args === 'string' ? args : args.task
const filter = typeof args === 'object' && args.repos ? args.repos : null

if (!task) throw new Error('Provide a task description as args, e.g. args: "add .editorconfig to all repos"')

// ── Load repo config ─────────────────────────────────────────────────────────

const configRaw = await agent(
  `Read the file /Users/vijayapal.ponram/Projects/workshop/expenses_tracker/.claude/multi-repo.json
   and return its contents as-is (the raw JSON string, nothing else).`,
  {
    label: 'load-config',
    schema: {
      type: 'object',
      properties: {
        repos: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name:        { type: 'string' },
              path:        { type: 'string' },
              description: { type: 'string' },
              stack:       { type: 'string' },
            },
            required: ['name', 'path'],
          },
        },
      },
      required: ['repos'],
    },
  }
)

const allRepos  = configRaw.repos
const targetRepos = filter ? allRepos.filter(r => filter.includes(r.name)) : allRepos

log(`Task: ${task}`)
log(`Repos targeted: ${targetRepos.map(r => r.name).join(', ')}`)

// ── Phase 1: Discover ────────────────────────────────────────────────────────

phase('Discover')

const DISCOVERY_SCHEMA = {
  type: 'object',
  properties: {
    repoName:    { type: 'string' },
    repoPath:    { type: 'string' },
    relevance:   { type: 'string', enum: ['yes', 'no', 'maybe'], description: 'Is this repo affected by the task?' },
    currentState:{ type: 'string', description: 'Brief description of what exists in this repo relevant to the task' },
    changeNeeded:{ type: 'string', description: 'Exactly what needs to be added, edited, or removed' },
    filesToTouch:{ type: 'array', items: { type: 'string' }, description: 'List of file paths to create or modify' },
    skipReason:  { type: 'string', description: 'Why this repo is not affected (only if relevance=no)' },
  },
  required: ['repoName', 'repoPath', 'relevance', 'currentState', 'changeNeeded', 'filesToTouch'],
}

const discoveries = await parallel(targetRepos.map(repo => () =>
  agent(
    `You are a discovery agent scoping a cross-repo change.

Task: "${task}"

Your repo:
  Name : ${repo.name}
  Path : ${repo.path}
  Stack: ${repo.description} (${repo.stack})

Steps:
1. Run: ls ${repo.path}
2. Read any relevant config or entry-point files to understand the repo structure
3. Decide: is this repo affected by the task?
4. If yes — describe the current state and exactly what needs to change, listing each file to touch
5. If no  — briefly explain why and set relevance to "no"`,
    { label: `discover:${repo.name}`, phase: 'Discover', schema: DISCOVERY_SCHEMA }
  )
))

const relevant = discoveries.filter(Boolean).filter(d => d.relevance !== 'no')
const skipped  = discoveries.filter(Boolean).filter(d => d.relevance === 'no')

skipped.forEach(d => log(`Skipping ${d.repoName}: ${d.skipReason}`))
log(`${relevant.length} repo(s) need changes: ${relevant.map(d => d.repoName).join(', ')}`)

if (relevant.length === 0) {
  log('No repos require changes for this task.')
  return { task, changed: [], skipped: skipped.map(d => d.repoName) }
}

// ── Phase 2: Edit ────────────────────────────────────────────────────────────

phase('Edit')

const edits = await parallel(relevant.map(discovery => () =>
  agent(
    `You are an editing agent applying a specific change to one repository.

Task   : "${task}"
Repo   : ${discovery.repoName}
Path   : ${discovery.repoPath}
Stack  : ${discovery.currentState}

What to change:
${discovery.changeNeeded}

Files to touch:
${discovery.filesToTouch.map(f => '- ' + f).join('\n')}

Instructions:
- Work exclusively inside ${discovery.repoPath}
- Read each file before editing it
- Make only the changes required by the task — do not refactor unrelated code
- After all edits, run: git -C ${discovery.repoPath} diff --stat
- Report a brief summary of what was changed`,
    { label: `edit:${discovery.repoName}`, phase: 'Edit', isolation: 'worktree' }
  )
))

// ── Phase 3: Summary ─────────────────────────────────────────────────────────

phase('Summary')

const summary = await agent(
  `You are summarising the results of a multi-repo coordinated change.

Task: "${task}"

Results per repo:
${edits.filter(Boolean).map((result, i) => `
--- ${relevant[i].repoName} ---
${result}
`).join('\n')}

Skipped repos (not affected): ${skipped.map(d => d.repoName).join(', ') || 'none'}

Write a concise summary table:
| Repo | Status | What changed |
|------|--------|-------------|
...

Then list any follow-up actions needed (e.g. PRs to open, migrations to run, config to update).`,
  { label: 'summary' }
)

log(summary)

return {
  task,
  changed: relevant.map(d => d.repoName),
  skipped: skipped.map(d => d.repoName),
  summary,
}
