---
title: # Ralph Local - AI Self-Loop Plugin
tags: [ralph-loop, self-iteration, automation, hooks, continuous-work]
created: 2026-01-16
source: Soul-Brews-Studio/ralph-local
---

# # Ralph Local - AI Self-Loop Plugin

# Ralph Local - AI Self-Loop Plugin

## Concept
Claude works on task → tries to exit → hook blocks exit → re-feeds same prompt → Claude sees previous work in files → continues iterating.

## How It Works
1. `/ralph-loop "task" --max-iterations 10` starts loop
2. Claude works on task
3. Claude attempts exit
4. Stop hook intercepts, blocks exit
5. Same prompt re-sent
6. Claude sees modified files from last iteration
7. Continues until completion criteria met

## Key Commands
- `/ralph-loop "task" --max-iterations N --completion-promise "DONE"`
- `/cancel-ralph` - Stop active loop
- `/gogogo-ralph` - Fast iteration mode

## Best Practices
- Clear completion criteria in prompt
- Always set --max-iterations as safety
- Write TDD-style prompts (test → implement → verify)
- Incremental phases work best

## Real Results
- 90+ iterations for PhD thesis documentation
- Multiple repos generated overnight
- $50k contract completed for minimal API cost

## Integration with oracle-v2
1. Each iteration can oracle_learn discoveries
2. Use oracle_trace to log iteration progress
3. Final retrospective via /rrr
4. Knowledge persists across iterations

---
*Added via Oracle Learn*
