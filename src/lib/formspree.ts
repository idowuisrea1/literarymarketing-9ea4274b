/**
 * Formspree delivery: emails each submission to the site owner.
 * These URLs are public form addresses, not secrets.
 * Supabase stays the primary store; Formspree is a second copy so no enquiry is lost.
 */
const ENDPOINTS = {
  enquiry: "https://formspree.io/f/meagepoq",
  signup: "https://formspree.io/f/mvkazvgk",
} as const;

export async function sendToFormspree(kind: keyof typeof ENDPOINTS, data: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch(ENDPOINTS[kind], {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}
