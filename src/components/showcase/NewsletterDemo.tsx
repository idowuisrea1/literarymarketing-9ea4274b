import { useId, useState } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";

/**
 * Demo newsletter form for showcase samples.
 * It validates and gives feedback, but DOES NOT send or store anything.
 * A real client site connects this to their email provider.
 */
export function NewsletterDemo({ inputClass, buttonClass, className }: { inputClass: string; buttonClass: string; className?: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setState(z.string().trim().email().max(255).safeParse(email).success ? "done" : "error");
  }

  if (state === "done") {
    return (
      <div role="status" className={className}>
        <p className="font-semibold">Thanks, you're on the list.</p>
        <p className="mt-1 text-sm opacity-70">Demo only: no email was sent or stored. On a live site this connects to your email provider.</p>
      </div>
    );
  }
  return (
    <form onSubmit={submit} noValidate className={cn("grid gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium">Email address</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input id={id} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-invalid={state === "error"} aria-describedby={state === "error" ? `${id}-err` : undefined} className={cn("min-h-11 flex-1", inputClass)} />
        <button type="submit" className={cn("min-h-11", buttonClass)}>Sign up</button>
      </div>
      {state === "error" && <p id={`${id}-err`} role="alert" className="text-sm text-red-400">Please enter a valid email address.</p>}
    </form>
  );
}
