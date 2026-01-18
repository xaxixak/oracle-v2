---
title: วิธีใช้ Oracle v2
tags: [oracle, tutorial, memory]
created: 2026-01-15
---

# วิธีใช้ Oracle v2

## Context
เมื่อต้องการให้ Claude มี memory ระยะยาว

## Pattern
1. เก็บความรู้ในไฟล์ markdown
2. Index ด้วย `bun run index`
3. ค้นหาผ่าน API หรือ MCP

## Outcome
Claude สามารถจำสิ่งที่เรียนรู้ได้ข้ามหลาย sessions
