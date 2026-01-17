---
title: # Oracle Voice Tray - TTS Integration
tags: [voice, tts, tauri, rust, accessibility, hooks]
created: 2026-01-16
source: Soul-Brews-Studio/oracle-voice-tray
---

# # Oracle Voice Tray - TTS Integration

# Oracle Voice Tray - TTS Integration

## What It Is
macOS menu bar app (Tauri 2.0 + Rust) for text-to-speech.
Claude agents can speak through this.

## Protocols
- HTTP API: port 37779
- MQTT: subscribe to topics

## API Usage
```bash
curl -X POST http://127.0.0.1:37779/speak \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello","voice":"Samantha","agent":"Main"}'
```

## Available Voices
Samantha, Daniel, Karen, Rishi, Alex, Victoria

## Features
- Message queue (no overlapping speech)
- Timeline UI shows voice history
- Agent identification
- Configurable speech rate

## Hook Integration
Scripts parse Claude transcript → detect agent → lookup voice preference → POST to tray.

## Integration with oracle-v2
1. Add PostToolUse hook to announce completions
2. Speak oracle_consult guidance
3. Voice feedback for long operations
4. Accessibility for hands-free work

---
*Added via Oracle Learn*
