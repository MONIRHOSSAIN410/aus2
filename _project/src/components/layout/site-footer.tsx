"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { Wordmark } from "@/components/layout/wordmark";
import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { footerColumns, site } from "@/lib/site";
import { useAppDispatch } from "@/store/hooks";
import { pushToast } from "@/store/slices/uiSlice";

export function SiteFooter() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");

  return (
    <footer className="relative border-t border-white/10 bg-ink-950">
      <Marquee
        items={["NO RESTOCKS. EVER.", "力 AWAKENING INCOMING", "WEAR THE ARC", "EST. 2024 — AUSTRALIA"]}
        className="border-b border-white/10 py-4"
        itemClassName="font-display text-3xl uppercase text-white/10 md:text-5xl"
        speed="slow"
      />

      <div className="container grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
        <Reveal className="space-y-6">
          <Wordmark href={null} height={40} />
          <p className="max-w-sm font-mono text-[13px] leading-relaxed text-white/45">
            {site.tagline} {site.promise}
          </p>

          <div className="space-y-3">
            <p className="zenji-eyebrow">FOLLOW THE LORE</p>
            <div className="flex gap-2">
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

          <form
            className="flex max-w-sm gap-2 pt-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (!/^\S+@\S+\.\S+$/.test(email)) {
                dispatch(pushToast({ title: "CHECK YOUR EMAIL", description: "That address is not valid." }));
                return;
              }
              dispatch(
                pushToast({ title: "YOU'RE ON THE LIST", description: "Watch your inbox for the next drop." }),
              );
              setEmail("");
            }}
          >
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your@email.com"
              aria-label="Email address"
              className="h-11"
            />
            <Button type="submit" size="default" className="h-11 shrink-0">
              JOIN
            </Button>
          </form>
        </Reveal>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerColumns.map((column, index) => (
            <Reveal key={column.title} delay={index * 0.06} className="space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-brand text-blood">
                {column.title}
              </p>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="font-mono text-[12px] text-white/45 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-wide2 text-white/30">
            © {new Date().getFullYear()} ZENJI. All drops are final. No restocks. Ever.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: "Privacy", href: "/privacy-policy" },
              { label: "Terms", href: "/terms" },
              { label: "Cookies", href: "/privacy-policy#cookies" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-wide2 text-white/30 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide2 text-white/30">
            <motion.span
              className="size-1.5 bg-blood"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            Anime-inspired. Gamer-built. Community-owned.
          </p>
        </div>
      </div>
    </footer>
  );
}
