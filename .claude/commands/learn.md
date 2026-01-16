---
description: Deep dive learning from repos/URLs
allowed-tools:
  - Bash
  - Read
  - Write
  - Glob
  - Task
  - mcp__oracle-v2__oracle_learn
---

# /learn - Deep Dive Learning

Explore and document a codebase systematically.

## Usage

```
/learn [target]
```

Target can be:
- GitHub URL: `https://github.com/owner/repo`
- Repo slug: `owner/repo`
- Local path: `./path/to/repo`

## Action

### 1. Resolve Target

- URL → Clone via `git clone` to `ψ/learn/repo-name/`
- Slug → `https://github.com/{slug}`
- Local → Use directly

### 2. Launch Parallel Exploration

Use 3 Task agents (haiku model for cost efficiency):

**Agent 1: Architecture Explorer**
- Map directory structure
- Identify entry points
- List dependencies

**Agent 2: Code Snippets Collector**
- Find key implementations
- Capture interesting patterns
- Note clever solutions

**Agent 3: Quick Reference Builder**
- Installation steps
- Usage examples
- Feature overview

### 3. Generate Documentation

Create in `ψ/learn/[REPO-NAME]/`:

```
YYYY-MM-DD_architecture.md
YYYY-MM-DD_snippets.md
YYYY-MM-DD_quickref.md
[REPO-NAME].md  # Hub file
```

Hub file format:
```markdown
# [Repo Name] Learning

## Timeline
| Date | Focus | Files |
|------|-------|-------|
| YYYY-MM-DD | Initial exploration | 3 |

## Quick Links
- [Architecture](./YYYY-MM-DD_architecture.md)
- [Snippets](./YYYY-MM-DD_snippets.md)
- [Quick Ref](./YYYY-MM-DD_quickref.md)
```

### 4. Index to Oracle

Call `oracle_learn` with key discoveries for future search.

## Philosophy

Parallel agents = faster learning.
Haiku for exploration = cost effective.
Main agent reviews = quality assured.
