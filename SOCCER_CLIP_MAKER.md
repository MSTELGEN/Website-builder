# Soccer Clip Maker
Drop rough, already-trimmed soccer clips into a folder and get back ready-to-post
vertical (9:16) clips for TikTok / Reels / Shorts.
Each clip gets:
1. Reframed to vertical 9:16 (full frame kept over a blurred background — nothing cropped out)
2. Audio normalized to social-media loudness levels
3. *(optional)* Auto-captions burned in from the commentary
4. *(optional)* A Claude-written viral hook + post caption saved as a `.txt`

If you prefer to add the on-screen text in **Canva**, just skip the `--captions`
flag and use the generated hook text (from `--hook`) as your starting point.

---

## 1. Install ffmpeg (required)
This does all the video work.
- **macOS:** `brew install ffmpeg`
- **Ubuntu/Debian:** `sudo apt install ffmpeg`
- **Windows:** download from <https://ffmpeg.org/download.html> and add it to your PATH

Check it works: `ffmpeg -version`

## 2. Install Python deps (only if you want captions or hooks)
```bash
pip install -r requirements.txt
```
The basic vertical formatting works without these.

## 3. Run it
Put your clips in a folder (e.g. `input/`), then:
```bash
# Basic: reframe to vertical + clean audio
python clip.py --input ./input --output ./output

# Add auto-captions
python clip.py --input ./input --output ./output --captions

# Add captions + a Claude-written hook & caption
python clip.py --input ./input --output ./output --captions --hook

# Single file, zoom-crop instead of blurred background
python clip.py --input ./input/goal.mp4 --output ./output --vertical-mode crop
```

Finished clips land in `output/` as `<name>_vertical.mp4`.
Hook/caption text (with `--hook`) lands as `<name>_copy.txt`.

---

## Options
| Flag | What it does |
|------|--------------|
| `--input` | A single video file **or** a folder of videos. |
| `--output` | Where finished clips go (default `./output`). |
| `--vertical-mode blur` | Keep the full frame over a blurred background (**default**, best for wide pitch shots). |
| `--vertical-mode crop` | Center-crop/zoom to 9:16 (loses the sides). |
| `--captions` | Transcribe the commentary and burn in styled captions. |
| `--hook` | Use Claude to write an on-screen hook + post caption. Needs an API key. |

## Hook generation (Claude)
Set your key before using `--hook`:
```bash
export ANTHROPIC_API_KEY=sk-ant-...     # macOS/Linux
setx ANTHROPIC_API_KEY sk-ant-...       # Windows (new terminal after)
```
Get a key at <https://console.anthropic.com>.

---

## Tweaking the look
Open `clip.py` and edit the config block near the top:
- `OUT_W`, `OUT_H` — output resolution (default 1080x1920)
- `WHISPER_MODEL` — `tiny`/`base`/`small`/`medium`/`large-v3` (bigger = more accurate, slower)
- `CAPTION_MAX_WORDS` — how many words show on screen at once
- The `Style: Pop` line in `build_ass()` — font, size, colors, outline of the captions

## Notes
- First caption run downloads the Whisper model (needs internet once).
- This expects clips that are already trimmed to the moment. It does **not**
  find highlights inside a full match — that's a much bigger job.
- If a clip has no speech, it's exported cleanly without captions.
