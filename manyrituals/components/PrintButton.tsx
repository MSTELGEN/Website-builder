"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="cursor-pointer flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
      style={{ background: "#d98a4e", color: "#14171c" }}
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path
          d="M4 1h7v4H4zM3 5h9a2 2 0 012 2v4a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h7v3H4z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <circle cx="11" cy="8" r="0.7" fill="currentColor" />
      </svg>
      Save as PDF
    </button>
  );
}
