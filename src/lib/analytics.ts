export type AnalyticsEvent =
  | "cta_click"
  | "package_compare_view"
  | "enquiry_start"
  | "enquiry_step"
  | "enquiry_submit"
  | "calculator_use"
  | "portfolio_filter";

/**
 * Fire a named site event. Never pass personal data (names, emails, messages).
 * Dispatches a "lm:analytics" browser event and logs it in development.
 */
export function trackEvent(name: AnalyticsEvent, props: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("lm:analytics", { detail: { name, ...props } }));
  if (import.meta.env.DEV) console.info("[analytics]", name, props);

  // ── CONNECT AN ANALYTICS PROVIDER HERE ─────────────────────────────────
  // This is the only place to forward events. Lovable's built-in visitor
  // analytics receives them now; add another provider's call below if needed.
  window.__lovableEvents?.track?.(`project.${name}`, props);
}
