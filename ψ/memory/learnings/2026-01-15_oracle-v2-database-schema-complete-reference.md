---
title: ## Oracle v2 Database Schema - Complete Reference
tags: [oracle, schema, database, reference, architecture]
created: 2026-01-15
source: Schema Analysis
---

# ## Oracle v2 Database Schema - Complete Reference

## Oracle v2 Database Schema - Complete Reference

### Core Tables

**1. oracle_documents** - Main document index
- `id`, `type`, `source_file`, `concepts` (JSON)
- Provenance: `origin` ('mother'|'arthur'|'volt'|'human'), `project` (ghq path), `created_by`
- Supersede pattern: `superseded_by`, `superseded_at`, `superseded_reason`

**2. oracle_fts** - FTS5 virtual table (managed via raw SQL)
- `id`, `content`, `concepts`
- Porter stemmer tokenizer

**3. indexing_status** - Track indexing progress
- `is_indexing`, `progress_current`, `progress_total`, `started_at`, `completed_at`, `error`

### Logging Tables (all have `project` field)

**4. search_log** - Search query history
- `query`, `type`, `mode`, `results_count`, `search_time_ms`, `results` (JSON)

**5. consult_log** - Consultation history
- `decision`, `context`, `principles_found`, `patterns_found`, `guidance`

**6. learn_log** - Learning creation history
- `document_id`, `pattern_preview`, `source`, `concepts`

**7. document_access** - Document access tracking
- `document_id`, `access_type`

### Forum Tables

**8. forum_threads**
- `title`, `created_by`, `status` (active|answered|pending|closed)
- GitHub sync: `issue_url`, `issue_number`, `synced_at`

**9. forum_messages**
- `thread_id` (FK), `role` (human|oracle|claude), `content`, `author`
- Search context: `principles_found`, `patterns_found`, `search_query`

### Decision Tracking

**10. decisions**
- `title`, `status` (pending|parked|researching|decided|implemented|closed)
- `context`, `options` (JSON), `decision`, `rationale`
- `tags` (JSON), `decided_at`, `decided_by`

### Trace Log (Discovery Sessions)

**11. trace_log**
- `trace_id` (UUID), `query`, `query_type` (general|project|pattern|evolution)
- Dig points: `found_files`, `found_commits`, `found_issues`, `found_retrospectives`, `found_learnings`
- Recursion: `depth`, `parent_trace_id`, `child_trace_ids`
- Distillation: `status` (raw|reviewed|distilling|distilled), `awakening`, `distilled_to_id`

### Projects (Categorization)

**12. projects**
- `id` (slug), `name`, `color` (hex), `description`, `ghq_path`

### Key Patterns

1. **Project field is EVERYWHERE** - Almost all tables have `project` for filtering
2. **Supersede pattern** - "Nothing is Deleted" - mark outdated, don't delete
3. **Provenance tracking** - Know where data came from (origin, created_by)
4. **JSON fields** - `concepts`, `options`, `tags`, `results` store arrays as JSON strings

---
*Added via Oracle Learn*
