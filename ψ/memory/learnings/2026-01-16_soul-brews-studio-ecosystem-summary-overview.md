---
title: # Soul Brews Studio Ecosystem Summary
tags: [soul-brews-studio, oracle-ecosystem, multi-agent, ralph-loop, integration]
created: 2026-01-16
source: GitHub Exploration 2026-01-17
---

# # Soul Brews Studio Ecosystem Summary

# Soul Brews Studio Ecosystem Summary

## Overview
Soul Brews Studio (by Nat) is the origin of oracle-v2 and the entire Oracle ecosystem. 19 repositories covering AI-human collaboration tools, frameworks, and learning challenges.

## Core Philosophy (3 Principles)
1. **Nothing is Deleted** - Append-only, timestamps = truth
2. **Patterns Over Intentions** - Observe behavior, not promises
3. **External Brain, Not Command** - Mirror reality, don't decide

## Key Repositories

### oracle-v2 (⭐5) - WE USE THIS
MCP Memory Layer with hybrid search (FTS5 + ChromaDB), 19 MCP tools, React dashboard.
- We forked from Soul-Brews-Studio/oracle-v2

### oracle-framework (⭐11)
Complete Claude Code framework with ψ/ structure (7 pillars), commands, agents.
Impact: 12.4 → 46.5 commits/day

### multi-agent-workflow-kit (⭐23) 🔥
tmux + git worktree for parallel agents. Each agent works in isolated worktree.
Commands: /maw.sync, /maw.hey, /maw.zoom

### ralph-local (⭐1)
Self-referential AI loop. Claude works → exits → hook blocks → continues.
Used for 90+ iterations on PhD thesis!

### plugin-marketplace (⭐1)
13 Oracle skills for Claude Code. We imported 5 commands already.

### oracle-voice-tray (Rust)
macOS TTS via menu bar. HTTP API port 37779, MQTT support.

## Learning Challenges
- mission-02: Parser debugging (find 6 broken files)
- mission-03: Gesture control (MediaPipe + Three.js)
- mission-04: Claude Code hooks (Safety Guardian)

## Integration Opportunities
1. multi-agent-workflow-kit → parallel development
2. ralph-local → automated iteration loops
3. oracle-voice-tray → voice feedback
4. hooks patterns → safety guardrails

---
*Added via Oracle Learn*
