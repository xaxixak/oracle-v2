# Oracle v2 - MCP Memory Layer

> "The Oracle Keeps the Human Human" - now queryable via MCP

TypeScript prototype implementing semantic search over Oracle philosophy using Model Context Protocol (MCP).

## Architecture

```
Claude Code → MCP Server → SQLite + Chroma
                          ↓
                    ψ/memory files
```

Following [claude-mem](https://github.com/zackees/claude-mem) patterns:
- Granular vector documents (split principles into sub-chunks)
- Hybrid search (vector + FTS5)
- Local embeddings via ChromaDB
- SQLite as source of truth

## Quick Start

### 1. Install Dependencies

```bash
cd ψ/lab/oracle-v2
npm install
```

### 2. Index Oracle Knowledge

```bash
npm run index
```

This will:
- Parse `ψ/memory/resonance/*.md` (principles)
- Parse `ψ/memory/learnings/*.md` (patterns)
- Parse `ψ/memory/retrospectives/**/*.md` (history)
- Create SQLite index at `oracle.db`
- Create Chroma vectors at `chroma/`

### 3. Run MCP Server

```bash
npm run dev
```

## MCP Tools

### oracle_search

Search Oracle knowledge base semantically.

```json
{
  "query": "how should I handle file deletion?",
  "type": "principle",
  "limit": 5
}
```

Returns relevant principles, patterns, learnings, or retrospectives.

### oracle_consult

Get guidance on a decision based on Oracle philosophy.

```json
{
  "decision": "Should I amend this commit or create a new one?",
  "context": "I just made a commit but forgot to add a file"
}
```

Returns:
- Relevant principles
- Relevant patterns
- Synthesized guidance

### oracle_reflect

Get random wisdom for reflection.

```json
{}
```

Returns a random principle or pattern.

## Data Model

### Source Files

```
ψ/memory/
├── resonance/        → IDENTITY (who am I)
│   ├── oracle.md     → Core principles
│   └── patterns.md   → Behavioral patterns
│
├── learnings/        → PATTERNS (what I've learned)
│   └── *.md
│
└── retrospectives/   → HISTORY (what happened)
    └── **/*.md
```

### Vector Documents

Following granular pattern from claude-mem:

```typescript
{
  id: "resonance_oracle_principle_1",
  type: "principle",
  source_file: "ψ/memory/resonance/oracle.md",
  content: "Nothing is Deleted: Append only...",
  concepts: ["append-only", "history", "context"],
  created_at: 1735489287,
  updated_at: 1735489287
}
```

Each principle is split into:
1. Main document (full principle)
2. Sub-documents (bullet points)

This enables finding specific guidance even within larger principles.

## Configuration

Set `ORACLE_REPO_ROOT` environment variable to override default path:

```bash
export ORACLE_REPO_ROOT=/path/to/Nat-s-Agents
npm run index
npm run dev
```

## Development

```bash
# Index knowledge base
npm run index

# Run MCP server (development)
npm run dev

# Build TypeScript
npm run build

# Run compiled server
npm start
```

## How It Works

### Indexing (indexer.ts)

1. **Parse markdown files** from ψ/memory/
2. **Split into granular chunks**:
   - Principles → sections → bullet points
   - Learnings → sections
   - Retrospectives → sections
3. **Extract concepts** (keywords for filtering)
4. **Store in SQLite** (metadata + FTS5)
5. **Store in Chroma** (vector embeddings)

### Querying (index.ts)

1. **Vector search** via Chroma (semantic similarity)
2. **FTS search** via SQLite (keyword matching)
3. **Merge results** (hybrid scoring)
4. **Enrich with metadata** from SQLite
5. **Return ranked results**

## Future Enhancements

- [ ] Add `oracle_learn` tool (write new patterns)
- [ ] Auto-update on file changes (fswatch)
- [ ] Skill wrapper for progressive disclosure
- [ ] Track which principles influence decisions
- [ ] Pattern detection from retrospectives

## References

- [SPEC.md](./SPEC.md) - Full specification
- [claude-mem](https://github.com/zackees/claude-mem) - Inspiration
- [MCP SDK](https://github.com/anthropics/anthropic-sdk-typescript) - Protocol docs

---

**Status**: Prototype / Exploration
**Created**: 2025-12-29
**Model**: Following claude-mem architecture
