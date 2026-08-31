"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/store/hooks";
import { pushToast } from "@/store/slices/uiSlice";

const TOPICS = ["ORDER", "RETURN", "SIZING", "WHOLESALE", "OTHER"];

export function ContactForm() {
  const dispatch = useAppDispatch();
  const [topic, setTopic] = useState(TOPICS[0]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-blood bg-blood/10 p-8 text-center"
      >
        <p className="font-display text-3xl uppercase text-white">MESSAGE SENT</p>
        <p className="mt-3 font-mono text-[13px] text-white/60">
          We reply within one business day. Check your inbox.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSending(true);
        // Wire this to your own endpoint / form service.
        setTimeout(() => {
          setSending(false);
          setSent(true);
          dispatch(pushToast({ title: "MESSAGE SENT", description: "We'll be in touch." }));
        }, 900);
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">NAME</Label>
          <Input id="contact-name" name="name" required placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">EMAIL</Label>
          <Input id="contact-email" name="email" type="email" required placeholder="you@example.com" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-order">ORDER NUMBER (OPTIONAL)</Label>
        <Input id="contact-order" name="order" placeholder="ZNJ-000000" />
      </div>

      <div className="space-y-3">
        <Label>TOPIC</Label>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setTopic(option)}
              aria-pressed={topic === option}
              className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-brand transition-all ${
                topic === option
                  ? "border-blood bg-blood text-white"
                  : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">MESSAGE</Label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder="Tell us what happened…"
          className="w-full border border-white/15 bg-ink-900 px-4 py-3 font-mono text-sm text-white placeholder:text-white/35 focus:border-blood focus:outline-none"
        />
      </div>

      <Button type="submit" size="lg" disabled={sending} className="w-full sm:w-auto">
        {sending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> SENDING…
          </>
        ) : (
          "SEND MESSAGE →"
        )}
      </Button>
    </form>
  );
}
