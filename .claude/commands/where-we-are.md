---
description: Session awareness with deep mode
allowed-tools:
  - Read
  - Bash
  - Glob
---

# /where-we-are - Session Awareness

"Not just the clock. The map."

## Usage

```
/where-we-are        # Quick mode (same as /now)
/where-we-are deep   # Deep mode with bigger picture
```

## Quick Mode (default)

Same as `/now` - reconstruct session from memory:

```markdown
## 🕐 This Session

| Time | Duration | Topic | Jump |
|------|----------|-------|------|
| HH:MM | ~Xm | Topic | Type |

**Status**: Energy level, loose ends, parked items
**My Read**: 1-2 sentences
```

## Deep Mode

Expand with bigger picture context:

1. Read `ψ/WIP.md` for pending work
2. Check `git status` for uncommitted changes
3. Read recent handoff files from `ψ/memory/handoffs/`
4. Query Oracle for related patterns

Output includes:

```markdown
## 🗺️ The Bigger Picture

**Active Threads**:
- [From WIP.md]

**Uncommitted Work**:
- [From git status]

**Recent Handoffs**:
- [Date]: [Context summary]

**Connection Patterns**:
- [How current work connects to past sessions]

## 📍 Where We Are in the Journey

[Narrative placing current session in larger context]
```

## Jump Types

| Icon | Type | Meaning |
|------|------|---------|
| 🌟 | **Spark** | New idea, exciting |
| ✅ | **Complete** | Finished, moving on |
| 🔄 | **Return** | Coming back to parked |
| 📍 | **Park** | Intentional pause |
| 🚪 | **Escape** | Avoiding difficulty |

## Philosophy

Quick mode answers: "What time is it?"
Deep mode answers: "Where are we in the journey?"
