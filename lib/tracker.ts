export const RITUAL_LABELS = [
  "Cool bedroom ≤19°C",
  "Phone out of room",
  "Dinner 3h before",
  "Last drink 3h before",
  "Warm bath or shower",
  "Breathing 4-6",
  "Side position",
] as const;

export const NIGHTS = ["N1", "N2", "N3", "N4", "N5", "N6", "N7"] as const;

export type TrackerState = boolean[][];

const STORAGE_KEY = "mr_sleep_reset_v1";

export function emptyState(): TrackerState {
  return Array.from({ length: 7 }, () => Array(7).fill(false));
}

export function loadState(): TrackerState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as unknown;
    if (
      Array.isArray(parsed) &&
      parsed.length === 7 &&
      parsed.every((row) => Array.isArray(row) && row.length === 7)
    ) {
      return parsed as TrackerState;
    }
  } catch {
    // corrupt storage — reset silently
  }
  return emptyState();
}

export function saveState(state: TrackerState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function nightCompletion(state: TrackerState, night: number): number {
  const col = state.map((row) => row[night]);
  return col.filter(Boolean).length;
}

export function overallPercent(state: TrackerState): number {
  const total = 7 * 7;
  const done = state.flat().filter(Boolean).length;
  return Math.round((done / total) * 100);
}

export function nightsLogged(state: TrackerState): number {
  return NIGHTS.filter((_, i) =>
    state.some((row) => row[i])
  ).length;
}

/** 0-indexed night based on today vs a fixed start, capped 0–6 */
export function currentNightIndex(): number {
  return Math.min(6, Math.max(0, new Date().getDay() === 0 ? 6 : new Date().getDay() - 1));
}
