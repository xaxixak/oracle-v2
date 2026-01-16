---
description: Log emotions and energy levels
allowed-tools:
  - Read
  - Write
  - Glob
---

# /feel - Emotion Log

Track how you're feeling. Rest is also data.

## Usage

```
/feel                     # Review recent entries
/feel [mood]             # Quick log
/feel [mood] energy:3    # With energy (1-5)
/feel [mood] trigger:x   # With trigger
```

## Action

### Review Mode (no args)

1. Read recent entries from `ψ/feelings/log.md`
2. Show last 10 entries in table format
3. Identify patterns (energy trends, common triggers)

### Log Mode (with args)

1. Parse input:
   - Mood: first word(s) before any flags
   - Energy: `energy:[1-5]` (optional)
   - Trigger: `trigger:[text]` (optional)

2. Append to `ψ/feelings/log.md`:
```
YYYY-MM-DD HH:MM | [mood] | energy:[N] | trigger:[x]
```

3. Smart responses based on mood:
   - Fear/panic → Suggest `/snapshot` or `/rrr`
   - Positive → Celebrate, suggest preserving state
   - Low energy → Acknowledge, no pressure

## Energy Visualization

```
1: ▓░░░░ Depleted
2: ▓▓░░░ Low
3: ▓▓▓░░ Normal
4: ▓▓▓▓░ Good
5: ▓▓▓▓▓ Peak
```

## Philosophy

"Rest is also data." - Feelings inform patterns.
