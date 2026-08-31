import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about an order, a return or sizing? Get in touch with the ZENJI team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="SUPPORT // ZENJI"
        title={"TALK TO\nTHE TEAM."}
        lead="Orders, returns, sizing, wholesale. One business day turnaround."
      />

      <section className="py-16 md:py-24">
        <div className="container grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="space-y-8">
            <div className="border border-white/10 bg-ink-900 p-7">
              <p className="zenji-eyebrow">RESPONSE TIME</p>
              <p className="mt-4 font-display text-5xl text-white">&lt;24h</p>
              <p className="mt-2 font-mono text-[12px] text-white/40">
                Monday to Friday, Australian business hours.
              </p>
            </div>

            <div className="space-y-4">
              <p className="zenji-eyebrow">FASTER ANSWERS</p>
              <ul className="space-y-2.5">
                {[
                  { label: "Read the FAQ", href: "/faq" },
                  { label: "Return policy", href: "/return-policy" },
                  { label: "Shipping & terms", href: "/terms" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="zenji-link-underline font-mono text-[13px] text-white/50 hover:text-white"
                    >
                      {link.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <p className="zenji-eyebrow">FOLLOW THE LORE</p>
              <div className="flex flex-wrap gap-2">
                {["TikTok", "Instagram", "Facebook"].map((social) => (
                  <Link
                    key={social}
                    href="#"
                    className="border border-white/15 px-4 py-2 font-mono text-[10px] uppercase tracking-brand text-white/55 transition-colors hover:border-blood hover:text-white"
                  >
                    {social}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
