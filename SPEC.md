---
title: Oracle v2 - MCP Memory Layer
created: 2025-12-29
status: exploration
learned-from: claude-mem
---

# Oracle v2 - MCP Memory Layer

> "The Oracle Keeps the Human Human" - now queryable via MCP

## Vision

Oracle v2 transforms the existing Oracle philosophy files into a **searchable knowledge system** via MCP, allowing Claude to:

1. **Consult** Oracle philosophy when making decisions
2. **Learn** from patterns in resonance files
3. **Search** retrospectives and learnings semantically
4. **Grow** by adding new patterns over time

## What We Learned from claude-mem

### Architecture That Works

```
┌─────────────────────────────────────────────────────┐
│                    Claude Code                       │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │   Skills Layer   │ ← Progressive disclosure
              │  (oracle-query)  │    (~250 tokens upfront)
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   MCP Server     │ ← HTTP or stdio
              │   (oracle-mcp)   │
              └────────┬─────────┘
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
   ┌──────────┐ ┌──────────┐ ┌──────────┐
   │  SQLite  │ │ ChromaDB │ │  ψ/ Dir  │
   │ (index)  │ │ (vector) │ │ (source) │
   └──────────┘ └──────────┘ └──────────┘
```

### Key Patterns to Adopt

| claude-mem Pattern | Oracle v2 Adaptation |
|-------------------|---------------------|
| Granular vectors | philosophy → principles, patterns → behaviors |
| Hybrid search | Vector (semantic) + FTS5 (keyword) |
| Local embeddings | sentence-transformers via Chroma |
| 90-day recency | N/A (Oracle is timeless) |
| ROI tracking | Track which principles influence decisions |

## Oracle v2 Data Model

### Source Files (ψ/memory/)

```
ψ/memory/
├── resonance/           → IDENTITY (who am I)
│   ├── oracle.md
│   ├── patterns.md
│   ├── style.md
│   └── identity.md
│
├── learnings/           → PATTERNS (what I've learned)
│   └── *.md
│
├── retrospectives/      → HISTORY (what happened)
│   └── **/*.md
│
└── logs/                → EPHEMERAL (not indexed)
    └── activity.log
```

### Vector Document Structure

Following claude-mem's granular approach:

```typescript
interface OracleDocument {
  id: string;           // e.g., "resonance_oracle_principle_1"
  type: 'principle' | 'pattern' | 'learning' | 'retro';
  source_file: string;  // "ψ/memory/resonance/oracle.md"
  content: string;      // The actual text
  concepts: string[];   // Tags: ['trust', 'patterns', 'mirror']
  created_at: number;   // epoch
  updated_at: number;   // epoch
}
```

### Example Vector Split

**Original: oracle.md Principle 1**
```markdown
### 1. Nothing is Deleted
- Append only, timestamps = truth
- History is preserved, not overwritten
- Every decision has context
```

**Becomes Multiple Vectors:**
```json
[
  {
    "id": "oracle_principle_1",
    "type": "principle",
    "content": "Nothing is Deleted: Append only, timestamps = truth. History is preserved, not overwritten. Every decision has context.",
    "concepts": ["append-only", "history", "context", "timestamps"]
  },
  {
    "id": "oracle_principle_1_sub_1",
    "type": "principle",
    "content": "Append only, timestamps = truth",
    "concepts": ["append-only", "timestamps"]
  },
  {
    "id": "oracle_principle_1_sub_2",
    "type": "principle",
    "content": "History is preserved, not overwritten",
    "concepts": ["history", "immutable"]
  }
]
```

## MCP Tools

### Tool: oracle_search

```typescript
{
  name: "oracle_search",
  description: "Search Oracle knowledge base semantically",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string", description: "Natural language query" },
      type: {
        type: "string",
        enum: ["principle", "pattern", "learning", "retro", "all"],
        default: "all"
      },
      limit: { type: "number", default: 5 }
    },
    required: ["query"]
  }
}
```

### Tool: oracle_consult

```typescript
{
  name: "oracle_consult",
  description: "Get guidance on a decision based on Oracle philosophy",
  inputSchema: {
    type: "object",
    properties: {
      decision: { type: "string", description: "Decision to make" },
      context: { type: "string", description: "Current situation" }
    },
    required: ["decision"]
  }
}
```

### Tool: oracle_learn

```typescript
{
  name: "oracle_learn",
  description: "Add new pattern to Oracle knowledge base",
  inputSchema: {
    type: "object",
    properties: {
      pattern: { type: "string", description: "Pattern discovered" },
      source: { type: "string", description: "Where it was observed" },
      concepts: { type: "array", items: { type: "string" } }
    },
    required: ["pattern"]
  }
}
```

## Skill Alternative (Preferred)

Instead of MCP tools, use a **skill** for progressive disclosure:

```yaml
# ψ/skills/oracle/skill.md
---
name: oracle
description: Consult Oracle philosophy for decisions, patterns, and guidance. Use when facing decisions, reviewing past patterns, or seeking alignment with principles.
---

# Oracle Skill

Query your personal Oracle knowledge base.

## Operations

| Operation | When to Use |
|-----------|-------------|
| search | Find relevant patterns/principles |
| consult | Get guidance on decisions |
| learn | Record new patterns |
| reflect | Get random wisdom for reflection |
```

## Implementation Plan

### Phase 1: Read-Only Oracle (MVP)

1. **Index existing files**
   - Parse ψ/memory/resonance/*.md
   - Parse ψ/memory/learnings/*.md
   - Create SQLite index
   - Generate Chroma vectors

2. **Create skill**
   - oracle_search (vector + FTS5)
   - oracle_reflect (random principle)

### Phase 2: Bidirectional Oracle

1. **Add learning capability**
   - oracle_learn tool
   - Auto-commit to ψ/memory/learnings/

2. **Pattern detection**
   - Hook on retrospective creation
   - Extract patterns → add to Oracle

### Phase 3: Context Injection

1. **SessionStart hook**
   - Inject relevant principles based on project/topic
   - Progressive disclosure pattern

## Key Design Decisions

### 1. Skill > MCP Tools

**Why**: Progressive disclosure saves tokens. MCP loads all tools upfront (~2500 tokens). Skill loads only frontmatter (~250 tokens).

### 2. Local Embeddings

**Why**: Zero API cost, fast, works offline. Chroma + sentence-transformers.

### 3. Source-of-Truth = Files

**Why**: Oracle philosophy should remain human-editable markdown. SQLite/Chroma are indexes, not sources.

### 4. No Recency Window

**Why**: Unlike claude-mem's 90-day window, Oracle principles are timeless. All patterns remain relevant.

### 5. Concept Tags

**Why**: Enable filtered search. "Show me patterns about trust" → filter by concept.

## Questions to Resolve

1. **Where to run MCP server?**
   - Subprocess (like claude-mem)?
   - HTTP service (background)?

2. **Auto-update vectors?**
   - On file change (fswatch)?
   - On session start (index check)?

3. **How to handle conflicts?**
   - User edits oracle.md
   - AI suggests pattern change
   - Which wins?

## Success Metrics

| Metric | How to Measure |
|--------|----------------|
| Oracle usage | Count oracle_search calls |
| Pattern application | "Based on Oracle principle X..." in output |
| Knowledge growth | New learnings added per week |
| Decision alignment | Retrospective feedback on Oracle guidance |

---

## Next Steps

1. [ ] Create ψ/lab/oracle-v2/prototype.ts
2. [ ] Test Chroma indexing of ψ/memory/resonance/
3. [ ] Create oracle skill with search operation
4. [ ] Test in real session

---

*Learned from: claude-mem architecture exploration*
*Created: 2025-12-29 10:35*
