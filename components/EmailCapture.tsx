"use client";
import { useState, useId } from "react";

interface Props {
  variant?: "hero" | "waitlist";
  className?: string;
}

export default function EmailCapture({ variant = "hero", className = "" }: Props) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const emailId = useId();
  const nameId = useId();

  const isWaitlist = variant === "waitlist";
  const endpoint = isWaitlist ? "/api/subscribe?waitlist=1" : "/api/subscribe";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), firstName: firstName.trim() }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg((data as { message?: string }).message ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`rounded-xl border border-sage/30 bg-sage/10 px-6 py-5 text-center ${className}`}
        role="alert"
        aria-live="polite"
      >
        <p className="text-sage font-medium">
          {isWaitlist ? "You're on the waitlist." : "Check your inbox."}
        </p>
        <p className="text-paper/60 text-sm mt-1">
          {isWaitlist
            ? "We'll reach out when The ManyRituals Sleep System is ready."
            : "Your guide is on its way. Meanwhile, start tonight."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-3 ${className}`} noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor={nameId} className="sr-only">
            First name (optional)
          </label>
          <input
            id={nameId}
            type="text"
            placeholder="First name (optional)"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            className="w-full rounded-lg border border-paper/15 bg-paper/5 px-4 py-3 text-paper placeholder-paper/35 text-sm focus:border-ember focus:bg-paper/8 transition-colors duration-200 outline-none"
          />
        </div>
        <div className="flex-[2]">
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>
          <input
            id={emailId}
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            aria-required="true"
            className="w-full rounded-lg border border-paper/15 bg-paper/5 px-4 py-3 text-paper placeholder-paper/35 text-sm focus:border-ember focus:bg-paper/8 transition-colors duration-200 outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading" || !email.trim()}
        className="w-full cursor-pointer rounded-lg bg-ember hover:bg-ember-deep disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 text-sm font-medium text-ink transition-colors duration-200"
        aria-busy={status === "loading"}
      >
        {status === "loading"
          ? "Sending…"
          : isWaitlist
          ? "Join the waitlist"
          : "Get the free guide"}
      </button>

      {status === "error" && (
        <p className="text-red-400 text-sm" role="alert" aria-live="polite">
          {errorMsg}
        </p>
      )}

      <p className="text-paper/30 text-xs">
        No spam. One-click unsubscribe any time.
      </p>
    </form>
  );
}
