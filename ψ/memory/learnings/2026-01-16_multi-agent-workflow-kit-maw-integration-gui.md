---
title: # Multi-Agent Workflow Kit (MAW) - Integration Guide
tags: [multi-agent, maw, tmux, worktree, parallel-development]
created: 2026-01-16
source: Soul-Brews-Studio/multi-agent-workflow-kit
---

# # Multi-Agent Workflow Kit (MAW) - Integration Guide

# Multi-Agent Workflow Kit (MAW) - Integration Guide

## What It Does
Orchestrates multiple Claude Code agents working simultaneously on same codebase.
Each agent has isolated git worktree + own branch.

## Architecture
```
Main repo (main branch)
├── agents/1/ (worktree, branch: agents/1)
├── agents/2/ (worktree, branch: agents/2)
└── agents/3/ (worktree, branch: agents/3)
```

## Key Commands
- `maw hey <agent> <message>` - Direct message to agent
- `maw send <message>` - Broadcast to all agents
- `maw sync` - Smart git synchronization
- `/maw.zoom` - Focus on specific agent pane

## tmux Layouts
6 preconfigured layouts from 2-agent to 6-pane dashboard.

## Integration with oracle-v2
1. Each agent can use oracle MCP tools
2. Agents share knowledge via oracle_learn
3. Use oracle_trace for discovery sessions
4. Coordinate via oracle_thread for discussions

## Use Cases
- Parallel feature development
- Code review + implementation simultaneously
- Research + coding at same time
- Testing + fixing in parallel

## Setup
Single bootstrap command creates 3 default agent worktrees + tmux session.

---
*Added via Oracle Learn*
