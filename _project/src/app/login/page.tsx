import type { Metadata } from "next";

import { LoginCard } from "@/components/auth/login-card";
import { Marquee } from "@/components/motion/marquee";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to ZENJI with Google, Apple or email to track orders and get early access.",
};

const PERKS = [
  { title: "ORDER TRACKING", body: "Every drop you claim, tracked end to end." },
  { title: "EARLY ACCESS", body: "First look at limited releases before they go live." },
  { title: "SAVED WISHLIST", body: "Your fits, kept across every device." },
];

export default function LoginPage() {
  return (
    <div className="relative min-h-[calc(100vh-9rem)] overflow-hidden">
      {/* atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,#2a0d0d_0%,#0a0a0a_50%,#050505_100%)]" />
      <div className="absolute inset-0 grid-lines opacity-40" />
      <div className="noise-overlay absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[60vw] leading-none text-white/[0.022] md:text-[38vw]"
      >
        力
      </span>

      <div className="container relative grid items-center gap-16 py-16 lg:grid-cols-[1fr_auto] lg:gap-24 lg:py-24">
        <div className="hidden max-w-lg space-y-10 lg:block">
          <div>
            <p className="zenji-eyebrow">ACCESS // ZENJI_MEMBER</p>
            <h2 className="zenji-display mt-5 text-7xl text-white">
              JOIN THE
              <br />
              <span className="text-blood">ARC.</span>
            </h2>
            <p className="mt-6 max-w-sm font-mono text-[13px] leading-relaxed text-white/45">
              An account unlocks order tracking and early access to limited releases. Every drop is
              limited — no restocks, ever.
            </p>
          </div>

          <ul className="space-y-px border border-white/10 bg-white/10">
            {PERKS.map((perk, index) => (
              <li key={perk.title} className="bg-ink-950 p-5">
                <p className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-brand text-white">
                  <span className="text-blood">0{index + 1}</span>
                  {perk.title}
                </p>
                <p className="mt-1.5 pl-8 font-mono text-[12px] text-white/40">{perk.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center lg:justify-end">
          <LoginCard />
        </div>
      </div>

      <Marquee
        items={["力 AWAKENING", "NO RESTOCKS. EVER.", "MEMBERS FIRST", "EST. 2024 — AUSTRALIA"]}
        className="relative border-t border-white/10 py-4"
        itemClassName="font-mono text-[10px] uppercase tracking-brand text-white/25"
        speed="slow"
      />
    </div>
  );
}
