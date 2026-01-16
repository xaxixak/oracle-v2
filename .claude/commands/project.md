---
description: Manage project repos with ghq
allowed-tools:
  - Bash
  - Read
  - Write
  - Glob
  - mcp__oracle-v2__oracle_projects_list
  - mcp__oracle-v2__oracle_projects_create
---

# /project - Repo Tracker

Manage repos using ghq. "ghq owns the clone → ψ/ owns the symlink."

## Usage

```
/project list                    # List tracked projects
/project learn [url/slug]        # Clone for study
/project incubate [url/slug]     # Clone for active dev
/project find [query]            # Search across projects
```

## Actions

### list

1. Call `oracle_projects_list` for Oracle-tracked projects
2. Check symlinks in `ψ/learn/` and `ψ/incubate/`
3. Display status table:

```markdown
| Project | Type | Path | Status |
|---------|------|------|--------|
| repo-a | learn | ψ/learn/repo-a | ✅ |
| repo-b | incubate | ψ/incubate/repo-b | ✅ |
```

### learn [target]

For studying a repo:

1. Clone: `ghq get [url]`
2. Find path: `ghq list -p [slug]`
3. Symlink: `ln -sf [path] ψ/learn/[name]`
4. Confirm success

### incubate [target]

For active development:

1. Clone: `ghq get [url]`
2. Find path: `ghq list -p [slug]`
3. Symlink: `ln -sf [path] ψ/incubate/[name]`
4. Register with `oracle_projects_create`

### find [query]

Search across all tracked repos:

1. `ghq list | grep [query]`
2. Search `ψ/learn/` and `ψ/incubate/`
3. Show matching paths

## Directory Model

```
ψ/learn/<slug>     → symlink to ghq path (study)
ψ/incubate/<slug>  → symlink to ghq path (active dev)
~/Code/...         → actual source (ghq manages)
```

## Rules

- **Never copy** — always symlink
- **Keep flat** — no nested symlinks
- **ghq first** — all clones through ghq
- **Verify links** — check for broken symlinks

## Health Check

```bash
# Find broken symlinks
find ψ/learn ψ/incubate -type l ! -exec test -e {} \; -print
```
