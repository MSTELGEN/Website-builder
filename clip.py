#!/usr/bin/env python3
"""
Soccer Clip Maker
-----------------
Drop rough, already-trimmed soccer clips in an input folder and get back
ready-to-post vertical (9:16) clips for TikTok / Reels / Shorts.

What it does per clip:
  1. Reframes to vertical 9:16 (blurred-fill background so no action is cropped)
  2. Normalizes the audio loudness for social platforms
  3. (optional) Auto-transcribes the commentary and burns in styled captions
  4. (optional) Uses Claude to write a viral hook + post caption (saved as .txt)

If you'd rather do the on-screen text in Canva, just leave captions off and
use the generated hook/caption text as your starting point.

Usage:
  python clip.py --input ./input --output ./output
  python clip.py --input ./input --output ./output --captions
  python clip.py --input ./input --output ./output --captions --hook
  python clip.py --input ./input/myclip.mp4 --output ./output --vertical-mode crop

Run `python clip.py --help` for all options.
"""

import argparse
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

# ---------------------------------------------------------------------------
# Config you can tweak
# ---------------------------------------------------------------------------

VIDEO_EXTS = {".mp4", ".mov", ".mkv", ".avi", ".m4v", ".webm"}

# Output canvas (vertical 9:16). 1080x1920 is the standard for Reels/TikTok/Shorts.
OUT_W, OUT_H = 1080, 1920

# Loudness target for social platforms (EBU R128). -14 LUFS is a good default.
LOUDNORM = "loudnorm=I=-14:TP=-1.5:LRA=11"

# Whisper model size: tiny / base / small / medium / large-v3
# "small" is a good speed/quality balance. Use "medium" for better accuracy.
WHISPER_MODEL = "small"

# Claude model used for hook/caption generation (only if --hook is passed).
CLAUDE_MODEL = "claude-sonnet-4-6"

# Caption style: max words shown on screen at once.
CAPTION_MAX_WORDS = 4


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def run(cmd):
    """Run a command, raising a clear error if it fails."""
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(
            f"Command failed:\n  {' '.join(cmd)}\n\n{result.stderr.strip()}"
        )
    return result


def check_ffmpeg():
    try:
        subprocess.run(["ffmpeg", "-version"], capture_output=True, check=True)
        subprocess.run(["ffprobe", "-version"], capture_output=True, check=True)
    except (subprocess.CalledProcessError, FileNotFoundError):
        sys.exit(
            "ffmpeg/ffprobe not found. Install it first:\n"
            "  macOS:   brew install ffmpeg\n"
            "  Ubuntu:  sudo apt install ffmpeg\n"
            "  Windows: download from https://ffmpeg.org/download.html"
        )


def find_clips(input_path: Path):
    if input_path.is_file():
        return [input_path]
    return sorted(
        p for p in input_path.iterdir()
        if p.suffix.lower() in VIDEO_EXTS
    )


# ---------------------------------------------------------------------------
# Step 1 + 2: reframe to vertical and normalize audio (single ffmpeg pass)
# ---------------------------------------------------------------------------

def reframe_vertical(src: Path, dst: Path, mode: str):
    """
    mode = "blur"  -> video centered over a blurred zoomed copy of itself (keeps full frame)
    mode = "crop"  -> center-crop to 9:16 (zoomed in, loses the sides)
    """
    if mode == "crop":
        vf = (
            f"scale={OUT_W}:{OUT_H}:force_original_aspect_ratio=increase,"
            f"crop={OUT_W}:{OUT_H}"
        )
        filter_args = ["-vf", vf]
    else:  # blur fill
        filter_complex = (
            f"[0:v]split=2[bg][fg];"
            f"[bg]scale={OUT_W}:{OUT_H}:force_original_aspect_ratio=increase,"
            f"crop={OUT_W}:{OUT_H},gblur=sigma=25[bg];"
            f"[fg]scale={OUT_W}:{OUT_H}:force_original_aspect_ratio=decrease[fg];"
            f"[bg][fg]overlay=(W-w)/2:(H-h)/2"
        )
        filter_args = ["-filter_complex", filter_complex]

    cmd = [
        "ffmpeg", "-y", "-i", str(src),
        *filter_args,
        "-af", LOUDNORM,
        "-c:v", "libx264", "-preset", "medium", "-crf", "20",
        "-c:a", "aac", "-b:a", "160k",
        "-movflags", "+faststart",
        str(dst),
    ]
    run(cmd)


# ---------------------------------------------------------------------------
# Step 3: transcription + caption burning (optional)
# ---------------------------------------------------------------------------

def transcribe(video: Path):
    """Return a list of word dicts: {start, end, word}. Requires faster-whisper."""
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        sys.exit(
            "Captions need faster-whisper. Install with:\n"
            "  pip install faster-whisper"
        )

    print(f"  transcribing ({WHISPER_MODEL} model, first run downloads it)...")
    model = WhisperModel(WHISPER_MODEL, device="auto", compute_type="int8")
    segments, _ = model.transcribe(str(video), word_timestamps=True)

    words = []
    for seg in segments:
        for w in (seg.words or []):
            text = w.word.strip()
            if text:
                words.append({"start": w.start, "end": w.end, "word": text})
    return words


def sec_to_ass(t: float) -> str:
    if t < 0:
        t = 0
    h = int(t // 3600)
    m = int((t % 3600) // 60)
    s = int(t % 60)
    cs = int(round((t - int(t)) * 100))
    if cs == 100:
        cs = 99
    return f"{h}:{m:02d}:{s:02d}.{cs:02d}"


def build_ass(words, ass_path: Path):
    """Group words into short phrases and write a styled ASS subtitle file."""
    header = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {OUT_W}
PlayResY: {OUT_H}
WrapStyle: 2

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Pop,Arial Black,96,&H00FFFFFF,&H000000FF,&H00111111,&H64000000,1,0,0,0,100,100,0,0,1,7,3,2,80,80,480,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    lines = []
    chunk = []
    for w in words:
        chunk.append(w)
        if len(chunk) >= CAPTION_MAX_WORDS:
            lines.append(chunk)
            chunk = []
    if chunk:
        lines.append(chunk)

    events = []
    for group in lines:
        start = sec_to_ass(group[0]["start"])
        end = sec_to_ass(group[-1]["end"])
        text = " ".join(g["word"] for g in group).upper().replace("\n", " ")
        events.append(f"Dialogue: 0,{start},{end},Pop,,0,0,0,,{text}")

    ass_path.write_text(header + "\n".join(events) + "\n", encoding="utf-8")


def burn_captions(src: Path, ass_path: Path, dst: Path):
    # escape path for ffmpeg's subtitles/ass filter
    ass_escaped = str(ass_path).replace("\\", "/").replace(":", "\\:")
    cmd = [
        "ffmpeg", "-y", "-i", str(src),
        "-vf", f"ass='{ass_escaped}'",
        "-c:v", "libx264", "-preset", "medium", "-crf", "20",
        "-c:a", "copy",
        "-movflags", "+faststart",
        str(dst),
    ]
    run(cmd)


# ---------------------------------------------------------------------------
# Step 4: Claude hook + caption (optional)
# ---------------------------------------------------------------------------

def generate_hook(words, clip_name: str):
    """Use Claude to write an on-screen hook + post caption from the transcript."""
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("  (skipping hook: set ANTHROPIC_API_KEY to enable)")
        return None
    try:
        import anthropic
    except ImportError:
        print("  (skipping hook: run `pip install anthropic`)")
        return None

    transcript = " ".join(w["word"] for w in words).strip()
    if not transcript:
        transcript = f"(no speech detected; clip file name is '{clip_name}')"

    client = anthropic.Anthropic(api_key=api_key)
    prompt = (
        "You write short-form social copy for viral soccer clips.\n"
        "Based on the clip's commentary transcript below, return JSON only "
        "(no markdown, no extra text) with exactly these keys:\n"
        '  "hook": a punchy on-screen text overlay, max 7 words, all caps\n'
        '  "caption": a post caption with 1 short line + 3-5 relevant hashtags\n\n'
        f"Transcript: {transcript}"
    )
    msg = client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=300,
        messages=[{"role": "user", "content": prompt}],
    )
    raw = msg.content[0].text.strip()
    raw = raw.replace("```json", "").replace("```", "").strip()
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return {"hook": "", "caption": raw}


# ---------------------------------------------------------------------------
# Pipeline
# ---------------------------------------------------------------------------

def process_clip(src: Path, out_dir: Path, args, tmp: Path):
    print(f"\n-> {src.name}")
    stem = src.stem
    final = out_dir / f"{stem}_vertical.mp4"

    # Step 1+2: reframe + audio
    print(f"  reframing to vertical ({args.vertical_mode}) + normalizing audio...")
    vertical_tmp = tmp / f"{stem}_v.mp4"
    reframe_vertical(src, vertical_tmp, args.vertical_mode)

    words = []
    if args.captions or args.hook:
        words = transcribe(vertical_tmp)

    # Step 3: captions
    if args.captions and words:
        print("  burning captions...")
        ass_path = tmp / f"{stem}.ass"
        build_ass(words, ass_path)
        burn_captions(vertical_tmp, ass_path, final)
    else:
        if args.captions and not words:
            print("  (no speech detected — exporting without captions)")
        vertical_tmp.replace(final)

    # Step 4: hook + caption text
    if args.hook:
        print("  generating hook + caption with Claude...")
        result = generate_hook(words, src.name)
        if result:
            txt = out_dir / f"{stem}_copy.txt"
            txt.write_text(
                f"HOOK (on-screen text):\n{result.get('hook', '')}\n\n"
                f"POST CAPTION:\n{result.get('caption', '')}\n",
                encoding="utf-8",
            )
            print(f"  saved copy -> {txt.name}")

    print(f"  done -> {final.name}")


def main():
    ap = argparse.ArgumentParser(
        description="Turn rough soccer clips into ready-to-post vertical clips.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    ap.add_argument("--input", required=True,
                    help="Input video file OR a folder of videos.")
    ap.add_argument("--output", default="./output",
                    help="Output folder (default: ./output).")
    ap.add_argument("--vertical-mode", choices=["blur", "crop"], default="blur",
                    help="blur = keep full frame on blurred background (default); "
                         "crop = zoom-crop to 9:16 (loses the sides).")
    ap.add_argument("--captions", action="store_true",
                    help="Auto-transcribe and burn in styled captions.")
    ap.add_argument("--hook", action="store_true",
                    help="Use Claude to write a hook + post caption (.txt). "
                         "Needs ANTHROPIC_API_KEY.")
    args = ap.parse_args()

    check_ffmpeg()

    input_path = Path(args.input)
    if not input_path.exists():
        sys.exit(f"Input not found: {input_path}")

    out_dir = Path(args.output)
    out_dir.mkdir(parents=True, exist_ok=True)

    clips = find_clips(input_path)
    if not clips:
        sys.exit(f"No video files found in {input_path}")

    print(f"Found {len(clips)} clip(s). Output -> {out_dir.resolve()}")

    with tempfile.TemporaryDirectory() as td:
        tmp = Path(td)
        for src in clips:
            try:
                process_clip(src, out_dir, args, tmp)
            except Exception as e:
                print(f"  ERROR on {src.name}: {e}")

    print("\nAll done.")


if __name__ == "__main__":
    main()
