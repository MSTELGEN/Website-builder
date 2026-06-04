// Tracks whether the visitor has subscribed, so we can unlock the gated
// downloads (PDF guide, printable tracker, bonus ritual) for them.
const KEY = "mr_subscribed";

export function isSubscribed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "true";
}

export function setSubscribed(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, "true");
  // let other components on the page react immediately
  window.dispatchEvent(new Event("mr-subscribed"));
}
