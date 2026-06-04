"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  RITUAL_LABELS,
  NIGHTS,
  emptyState,
  loadState,
  saveState,
  clearState,
  nightCompletion,
  overallPercent,
  nightsLogged,
  type TrackerState,
} from "@/lib/tracker";

export default function Tracker() {
  const [state, setState] = useState<TrackerState>(emptyState);
  const [todayNight, setTodayNight] = useState(0);
  const [justChecked, setJustChecked] = useState<string | null>(null);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");
  const [hasStartDate, setHasStartDate] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setState(loadState());
    // Today's night: prefer a stored start date; else assume Night 1 tonight
    const stored = localStorage.getItem("mr_start_date");
    if (stored) {
      const start = new Date(stored);
      const diff = Math.floor((Date.now() - start.getTime()) / 86_400_000);
      setTodayNight(Math.min(6, Math.max(0, diff)));
      setHasStartDate(true);
    } else {
      setTodayNight(0);
      setHasStartDate(false);
    }
  }, []);

  const toggle = useCallback(
    (ritual: number, night: number) => {
      setState((prev) => {
        const next = prev.map((row) => [...row]) as TrackerState;
        next[ritual][night] = !next[ritual][night];
        saveState(next);
        return next;
      });
      setJustChecked(`${ritual}-${night}`);
      setTimeout(() => setJustChecked(null), 400);
    },
    []
  );

  const reset = () => {
    clearState();
    setState(emptyState());
    localStorage.removeItem("mr_start_date");
    setTodayNight(0);
    setHasStartDate(false);
  };

  const startTonight = () => {
    if (!localStorage.getItem("mr_start_date")) {
      localStorage.setItem("mr_start_date", new Date().toISOString());
      setHasStartDate(true);
    }
    setTodayNight(0);
  };

  const percent = overallPercent(state);
  const logged = nightsLogged(state);

  // Share card via Canvas
  const generateShareCard = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 1080;
    const H = 1080;
    canvas.width = W;
    canvas.height = H;

    // Background
    ctx.fillStyle = "#14171c";
    ctx.fillRect(0, 0, W, H);

    // Radial glow
    const glow = ctx.createRadialGradient(W / 2, H / 3, 0, W / 2, H / 3, 500);
    glow.addColorStop(0, "rgba(217,138,78,0.12)");
    glow.addColorStop(1, "rgba(217,138,78,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Headline
    ctx.fillStyle = "#d98a4e";
    ctx.font = "italic 300 72px serif";
    ctx.textAlign = "center";
    ctx.fillText("7-Night Sleep Reset", W / 2, 160);

    ctx.fillStyle = "rgba(243,236,224,0.5)";
    ctx.font = "400 30px sans-serif";
    ctx.fillText("ManyRituals", W / 2, 210);

    // Stats
    ctx.fillStyle = "#f3ece0";
    ctx.font = `bold 120px serif`;
    ctx.fillText(`${percent}%`, W / 2, 380);
    ctx.font = "400 28px sans-serif";
    ctx.fillStyle = "rgba(243,236,224,0.55)";
    ctx.fillText("complete", W / 2, 420);

    ctx.font = "400 28px sans-serif";
    ctx.fillStyle = "rgba(243,236,224,0.55)";
    ctx.fillText(`${logged} of 7 nights logged`, W / 2, 480);

    // Grid
    const cellSize = 80;
    const gapX = 14;
    const gapY = 14;
    const gridW = 7 * cellSize + 6 * gapX;
    const gridH = 7 * cellSize + 6 * gapY;
    const startX = (W - gridW) / 2;
    const startY = 540;

    for (let ritual = 0; ritual < 7; ritual++) {
      for (let night = 0; night < 7; night++) {
        const x = startX + night * (cellSize + gapX);
        const y = startY + ritual * (cellSize + gapY);
        const done = state[ritual][night];

        ctx.beginPath();
        ctx.roundRect(x, y, cellSize, cellSize, 8);
        ctx.fillStyle = done ? "#d98a4e" : "rgba(243,236,224,0.08)";
        ctx.fill();

        if (done) {
          ctx.fillStyle = "#14171c";
          ctx.font = "bold 36px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("✓", x + cellSize / 2, y + cellSize / 2);
          ctx.textBaseline = "alphabetic";
        }
      }
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "rgba(243,236,224,0.3)";
    ctx.font = "400 22px sans-serif";
    ctx.fillText("manyrituals.com", W / 2, H - 40);

    try {
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sleep-reset-week.png";
        a.click();
        URL.revokeObjectURL(url);
      });
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 2500);
    } catch {
      // Fallback: open in new tab
      window.open(canvas.toDataURL(), "_blank");
    }
  }, [state, percent, logged]);

  const tonightRituals = state.map((row, i) => ({
    label: RITUAL_LABELS[i],
    done: row[todayNight],
    index: i,
  }));

  return (
    <section id="tracker" className="py-20 px-5 scroll-mt-20" aria-label="Sleep reset tracker">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 reveal">
          <p className="text-ember text-sm font-medium tracking-widest uppercase mb-2">
            Your tracker
          </p>
          <h2
            className="text-3xl md:text-4xl font-light text-paper mb-4"
            style={{ fontFamily: "Fraunces, Georgia, serif" }}
          >
            Seven nights, seven rituals.
          </h2>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex flex-col">
              <span className="text-4xl font-light text-ember" style={{ fontFamily: "Fraunces, Georgia, serif" }}>
                {percent}%
              </span>
              <span className="text-paper/50 text-sm">complete</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-light text-ember" style={{ fontFamily: "Fraunces, Georgia, serif" }}>
                {logged}
              </span>
              <span className="text-paper/50 text-sm">nights logged</span>
            </div>
          </div>

          {/* Overall progress bar */}
          <div
            className="mt-4 h-1 w-full max-w-sm rounded-full bg-paper/10"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${percent}% of week complete`}
          >
            <div
              className="h-full rounded-full bg-ember transition-all duration-500 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Tonight's focus */}
        <div className="mb-10 rounded-xl border border-ember/20 bg-ember/5 p-6 reveal">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <h3 className="text-lg font-medium text-paper">
              Night {todayNight + 1} — tonight&apos;s rituals
            </h3>
            {!hasStartDate && (
              <button
                onClick={startTonight}
                className="text-xs text-ember border border-ember/40 rounded-full px-3 py-1 hover:bg-ember/10 cursor-pointer transition-colors duration-200"
              >
                Start tonight
              </button>
            )}
          </div>
          <ul className="space-y-2 list-none p-0 m-0">
            {tonightRituals.map(({ label, done, index }) => (
              <li key={index} className="flex items-center gap-3">
                <button
                  onClick={() => toggle(index, todayNight)}
                  className={`w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    done
                      ? "bg-ember border-ember"
                      : "border-paper/30 hover:border-ember/60 bg-transparent"
                  }`}
                  aria-pressed={done}
                  aria-label={`Mark "${label}" as ${done ? "not done" : "done"} for Night ${todayNight + 1}`}
                >
                  {done && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="#14171c"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                <span className={`text-sm ${done ? "text-paper/50 line-through" : "text-paper/80"}`}>
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Full 7×7 grid */}
        <div className="reveal overflow-x-auto -mx-5 px-5">
          <div className="min-w-[460px]">
            {/* Column headers */}
            <div className="grid gap-1.5 mb-2" style={{ gridTemplateColumns: "minmax(130px,1fr) repeat(7, 1fr)" }}>
              <div />
              {NIGHTS.map((n, i) => (
                <div
                  key={n}
                  className={`text-center text-xs font-medium py-1 rounded ${
                    i === todayNight ? "text-ember" : "text-paper/40"
                  }`}
                >
                  {n}
                </div>
              ))}
            </div>

            {/* Rows */}
            {RITUAL_LABELS.map((label, ri) => (
              <div
                key={ri}
                className="grid gap-1.5 mb-1.5"
                style={{ gridTemplateColumns: "minmax(130px,1fr) repeat(7, 1fr)" }}
              >
                <div className="flex items-center text-xs text-paper/55 pr-2 truncate">
                  {label}
                </div>
                {NIGHTS.map((_, ni) => {
                  const done = state[ri][ni];
                  const cellKey = `${ri}-${ni}`;
                  const popped = justChecked === cellKey;
                  return (
                    <button
                      key={ni}
                      onClick={() => toggle(ri, ni)}
                      className={`tracker-cell aspect-square rounded-md cursor-pointer flex items-center justify-center transition-all duration-200 ${
                        done ? "bg-ember" : "bg-paper/[0.07] border border-paper/10 hover:bg-paper/15"
                      } ${popped ? "scale-110" : ""} ${ni === todayNight ? "ring-1 ring-ember/40" : ""}`}
                      aria-pressed={done}
                      aria-label={`Night ${ni + 1} — ${label} — ${done ? "done" : "not done"}`}
                    >
                      {done && (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden="true"
                          className={popped ? "animate-check-pop" : ""}
                        >
                          <path
                            d="M2.5 7l3.5 3.5 5.5-6"
                            stroke="#14171c"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}

            {/* Per-night completion bars */}
            <div className="grid gap-1.5 mt-3" style={{ gridTemplateColumns: "minmax(130px,1fr) repeat(7, 1fr)" }}>
              <div className="text-xs text-paper/30 flex items-end pb-1">Done</div>
              {NIGHTS.map((_, ni) => {
                const count = nightCompletion(state, ni);
                const pct = Math.round((count / 7) * 100);
                return (
                  <div key={ni} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-paper/40">{count}/7</span>
                    <div
                      className="w-full h-1 rounded-full bg-paper/10"
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Night ${ni + 1}: ${count} of 7 rituals done`}
                    >
                      <div
                        className="h-full rounded-full bg-ember/60 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-8">
          <button
            onClick={generateShareCard}
            className="cursor-pointer flex items-center gap-2 rounded-lg bg-paper/10 hover:bg-paper/15 px-5 py-2.5 text-sm text-paper transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1v8M5 6l3 3 3-3M2 10v3a1 1 0 001 1h10a1 1 0 001-1v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {shareStatus === "copied" ? "Downloaded!" : "Share my week"}
          </button>

          <button
            onClick={reset}
            className="cursor-pointer rounded-lg border border-paper/15 hover:border-paper/30 px-5 py-2.5 text-sm text-paper/50 hover:text-paper/80 transition-colors duration-200"
          >
            Reset tracker
          </button>
        </div>

        {/* Hidden canvas for share card generation */}
        <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
      </div>
    </section>
  );
}
