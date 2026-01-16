---
description: Log information for future reference
allowed-tools:
  - Read
  - Write
  - Glob
  - mcp__oracle-v2__oracle_learn
---

# /fyi - Information Log

Quick capture of information for future reference.

## Usage

```
/fyi                           # Review recent entries
/fyi [info]                    # Log neutral info
/fyi -i [info]                 # Mark as interesting
/fyi -p [info]                 # Mark as important (saves to Oracle)
```

## Flags

- No flag: Neutral information
- `-i` or `--interesting`: Notable, worth remembering
- `-p` or `--important`: Critical, auto-saved to Oracle

## Action

### Review Mode (no args)

1. Read `ψ/fyi/index.md`
2. Show recent entries grouped by significance
3. Display counts: neutral/interesting/important

### Log Mode (with args)

1. Parse significance flag from input
2. Generate slug from content (first 5 words, kebab-case)
3. Create entry in `ψ/fyi/YYYY-MM/slug.md`:

```markdown
---
date: YYYY-MM-DD HH:MM
type: fyi
significance: neutral|interesting|important
status: logged
---

# [Title from content]

[Full content]

---
*Logged via /fyi*
```

4. Update `ψ/fyi/index.md` with new entry
5. If important (`-p`): Call `oracle_learn` to index in Oracle

## Significance Colors

- **Neutral**: Default
- **Interesting**: 🟡 Yellow
- **Important**: 🔴 Red (+ Oracle indexed)

## Safety

Arguments may contain special characters. Use Write tool directly, never pass to bash.
