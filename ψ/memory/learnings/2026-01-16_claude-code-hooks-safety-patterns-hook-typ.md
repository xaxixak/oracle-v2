---
title: # Claude Code Hooks - Safety Patterns
tags: [hooks, safety, PreToolUse, security, guardrails]
created: 2026-01-16
source: Soul-Brews-Studio/mission-04-hooks-challenge
---

# # Claude Code Hooks - Safety Patterns

# Claude Code Hooks - Safety Patterns

## Hook Types
- **PreToolUse**: Before tool execution, can BLOCK (exit 2)
- **PostToolUse**: After execution, informational only
- **UserPromptSubmit**: On user messages
- **SessionStart**: When session begins

## Safety Guardian Pattern
Block dangerous operations:
- `rm -rf` → suggest `mv to /tmp/trash_timestamp`
- `--force` / `-f` flags on git
- `git reset --hard`
- Direct push to main

## Implementation
```bash
#!/bin/bash
# .claude/hooks/safety-guardian.sh
INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool')
COMMAND=$(echo "$INPUT" | jq -r '.input.command // empty')

if [[ "$COMMAND" =~ rm.*-rf ]]; then
  echo "BLOCKED: Use mv to /tmp instead"
  exit 2
fi
```

## Integration with oracle-v2
1. Log blocked attempts via oracle_learn
2. Track safety patterns over time
3. PreToolUse can consult oracle before risky ops
4. PostToolUse can oracle_learn successful patterns

---
*Added via Oracle Learn*
