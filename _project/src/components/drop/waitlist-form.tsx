"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/store/hooks";
import { pushToast } from "@/store/slices/uiSlice";

export function WaitlistForm() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  if (joined) {
    return (
      <motion.p
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-blood bg-blood/10 px-5 py-4 font-mono text-[11px] uppercase tracking-brand text-white"
      >
        ✓ YOU'RE ON THE LIST. EARLY ACCESS LOCKED IN.
      </motion.p>
    );
  }

  return (
    <form
      className="flex max-w-md flex-col gap-3 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          dispatch(pushToast({ title: "INVALID EMAIL", description: "Check the address." }));
          return;
        }
        setJoined(true);
        dispatch(pushToast({ title: "WAITLIST JOINED", description: "Pre-drop discount incoming." }));
      }}
    >
      <Input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email address"
        aria-label="Email address"
      />
      <Button type="submit" size="default" className="h-12 shrink-0">
        JOIN THE WAITLIST →
      </Button>
    </form>
  );
}
