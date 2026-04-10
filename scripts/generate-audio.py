#!/usr/bin/env python3
"""Generate MP3 audio files for all questions in questions.json using gTTS.

Usage:
    pip install gtts
    python scripts/generate-audio.py

Output:
    audio/q-001.mp3, audio/q-002.mp3, ...
"""

import json
import os
import sys
from pathlib import Path

try:
    from gtts import gTTS
except ImportError:
    print("gTTS not installed. Run: pip install gtts")
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
QUESTIONS_PATH = ROOT / "questions.json"
AUDIO_DIR = ROOT / "audio"


def main():
    with open(QUESTIONS_PATH, encoding="utf-8") as f:
        questions = json.load(f)

    AUDIO_DIR.mkdir(exist_ok=True)

    total = len(questions)
    skipped = 0
    generated = 0

    for i, q in enumerate(questions):
        qid = f"q-{i + 1}"
        out_path = AUDIO_DIR / f"{qid}.mp3"

        if out_path.exists():
            skipped += 1
            continue

        text = q.get("en", "")
        if not text.strip():
            print(f"  SKIP {qid}: empty English text")
            skipped += 1
            continue

        try:
            tts = gTTS(text=text, lang="en", slow=False)
            tts.save(str(out_path))
            generated += 1
            print(f"  [{generated}/{total}] {qid}: {text[:60]}")
        except Exception as e:
            print(f"  ERROR {qid}: {e}")

    print(f"\nDone. Generated: {generated}, Skipped: {skipped}, Total: {total}")
    print(f"Audio directory: {AUDIO_DIR}")


if __name__ == "__main__":
    main()
