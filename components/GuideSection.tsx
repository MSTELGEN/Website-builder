"use client";
import { useEffect, useState, useCallback } from "react";
import NightSection from "@/components/NightSection";
import { nights } from "@/lib/nights";
import { loadState, saveState, emptyState, type TrackerState } from "@/lib/tracker";

export default function GuideSection() {
  const [trackerState, setTrackerState] = useState<TrackerState>(emptyState);

  useEffect(() => {
    setTrackerState(loadState());
  }, []);

  const handleToggle = useCallback((nightIndex: number) => {
    setTrackerState((prev) => {
      // Toggle all rituals for this night (or just the first ritual as a "did I complete this night" toggle)
      // Brief says per-night yes/no writes into tracker — we toggle all 7 rituals for the night at once
      const anyDone = prev.some((row) => row[nightIndex]);
      const next = prev.map((row) => {
        const updated = [...row];
        updated[nightIndex] = !anyDone;
        return updated;
      }) as TrackerState;
      saveState(next);
      return next;
    });
  }, []);

  return (
    <section id="guide" aria-label="The 7 nights" className="scroll-mt-20">
      {nights.map((night) => (
        <NightSection
          key={night.num}
          night={night}
          trackerState={trackerState.map((row) => row[night.num - 1])}
          onToggleRitual={handleToggle}
        />
      ))}
    </section>
  );
}
