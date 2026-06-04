import Tracker from "@/components/Tracker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sleep Tracker — ManyRituals 7-Night Reset",
  description: "Your personal 7-ritual × 7-night sleep tracker. Mark off each ritual as you complete it.",
};

export default function TrackerPage() {
  return (
    <div className="pt-24">
      <Tracker />
    </div>
  );
}
