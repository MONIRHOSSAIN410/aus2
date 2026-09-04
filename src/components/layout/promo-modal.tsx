"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Wordmark } from "@/components/layout/wordmark";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fighterOptions, promo } from "@/lib/site";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { dismissPromo, pushToast } from "@/store/slices/uiSlice";

export function PromoModal() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const muted = promo.mutedPaths.some((path) => pathname.startsWith(path));
  const dismissed = useAppSelector((state) => state.ui.promoDismissed);
  const [open, setOpen] = useState(false);
  const [fighter, setFighter] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (muted) return;
    const store = promo.scope === "session" ? window.sessionStorage : window.localStorage;
    try {
      if (store.getItem(promo.storageKey)) return;
    } catch {
      /* storage blocked — still show once */
    }
    const timer = setTimeout(() => setOpen(true), promo.delayMs);
    return () => clearTimeout(timer);
  }, [muted]);

  const close = () => {
    setOpen(false);
    dispatch(dismissPromo());
    try {
      const store = promo.scope === "session" ? window.sessionStorage : window.localStorage;
      store.setItem(promo.storageKey, "1");
    } catch {
      /* ignore */
    }
  };

  if (dismissed || muted) return null;

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? setOpen(true) : close())}>
      <DialogContent className="max-w-md">
        <div className="flex flex-col items-center gap-1 text-center">
          <Wordmark href={null} height={30} />
          <DialogTitle className="mt-2 text-3xl">FREE SHIPPING ON FIRST ORDER</DialogTitle>
          <DialogDescription className="tracking-brand">CHOOSE YOUR FIGHTER</DialogDescription>
        </div>

        {!fighter ? (
          <div className="mt-6 max-h-[46vh] space-y-2 overflow-y-auto pr-1">
            {fighterOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFighter(option)}
                className="w-full border border-white/20 py-3 font-mono text-[11px] uppercase tracking-brand text-white/80 transition-all hover:border-blood hover:bg-blood/10 hover:text-white"
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <form
            className="mt-6 space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (!/^\S+@\S+\.\S+$/.test(email)) {
                dispatch(pushToast({ title: "INVALID EMAIL", description: "Check the address." }));
                return;
              }
              dispatch(
                pushToast({
                  title: "CODE UNLOCKED",
                  description: `Free shipping applied — ${fighter} arc noted.`,
                }),
              );
              close();
            }}
          >
            <p className="text-center font-mono text-[11px] uppercase tracking-brand text-blood">
              {fighter} SELECTED
            </p>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your@email.com"
              aria-label="Email address"
            />
            <Button type="submit" size="lg" className="w-full">
              UNLOCK FREE SHIPPING →
            </Button>
            <button
              type="button"
              onClick={close}
              className="w-full font-mono text-[10px] uppercase tracking-brand text-white/30 underline-offset-4 hover:text-white/60 hover:underline"
            >
              No thanks
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
