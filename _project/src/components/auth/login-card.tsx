"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AppleIcon, GoogleIcon } from "@/components/auth/provider-icons";
import { Wordmark } from "@/components/layout/wordmark";
import { EASE_OUT } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearError, signInWithProvider, type AuthProvider } from "@/store/slices/authSlice";
import { pushToast } from "@/store/slices/uiSlice";

type Mode = "providers" | "email";

export function LoginCard() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, pendingProvider, error, user, redirectTo } = useAppSelector((state) => state.auth);

  const [mode, setMode] = useState<Mode>("providers");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => router.push(redirectTo), 700);
      return () => clearTimeout(timer);
    }
  }, [user, router, redirectTo]);

  const busy = status === "loading";

  const start = (provider: AuthProvider, payloadEmail?: string) => {
    dispatch(clearError());
    void dispatch(signInWithProvider({ provider, email: payloadEmail }))
      .unwrap()
      .then((account) => {
        dispatch(
          pushToast({
            title: `WELCOME, ${account.name.toUpperCase()}`,
            description: "Signed in. Taking you to your account.",
          }),
        );
      })
      .catch(() => {
        /* handled by the slice — error is rendered below */
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: EASE_OUT }}
      className="relative w-full max-w-md border border-white/12 bg-ink-900/70 p-8 backdrop-blur-md sm:p-10"
    >
      {/* corner ticks */}
      {[
        "left-[-1px] top-[-1px] border-l-2 border-t-2",
        "right-[-1px] top-[-1px] border-r-2 border-t-2",
        "left-[-1px] bottom-[-1px] border-b-2 border-l-2",
        "right-[-1px] bottom-[-1px] border-b-2 border-r-2",
      ].map((position) => (
        <span key={position} className={`absolute size-4 border-blood ${position}`} aria-hidden />
      ))}

      <div className="flex flex-col items-center text-center">
        <Wordmark href={null} height={34} />
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.6, ease: EASE_OUT }}
          className="zenji-display mt-6 text-4xl text-white"
        >
          BEGIN YOUR JOURNEY
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22, duration: 0.6 }}
          className="mt-3 font-mono text-[13px] text-white/45"
        >
          Sign in to personalize your experience
        </motion.p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {user ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <motion.div
              initial={{ scale: 0.4, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              className="flex size-16 items-center justify-center border-2 border-blood font-display text-2xl text-white"
            >
              {user.avatarInitials}
            </motion.div>
            <p className="font-mono text-xs uppercase tracking-brand text-white">
              WELCOME, {user.name}
            </p>
            <p className="font-mono text-[11px] text-white/40">
              Signed in with {user.provider} — redirecting…
            </p>
            <Loader2 className="size-4 animate-spin text-blood" />
          </motion.div>
        ) : mode === "providers" ? (
          <motion.div
            key="providers"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="mt-9 space-y-3"
          >
            <button
              type="button"
              disabled={busy}
              onClick={() => start("apple")}
              className="flex w-full items-center justify-center gap-3 border border-transparent bg-bone py-4 font-mono text-[13px] font-medium text-ink-950 transition-all hover:bg-white disabled:opacity-60"
            >
              {pendingProvider === "apple" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <AppleIcon className="size-[18px]" />
              )}
              Continue with Apple
            </button>

            <button
              type="button"
              disabled={busy}
              onClick={() => start("google")}
              className="flex w-full items-center justify-center gap-3 border border-white/20 bg-transparent py-4 font-mono text-[13px] font-medium text-white transition-all hover:border-white/50 hover:bg-white/5 disabled:opacity-60"
            >
              {pendingProvider === "google" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <GoogleIcon className="size-[18px]" />
              )}
              Continue with Google
            </button>

            <div className="flex items-center gap-4 py-3">
              <span className="h-px flex-1 bg-white/12" />
              <span className="font-mono text-[11px] text-white/30">or</span>
              <span className="h-px flex-1 bg-white/12" />
            </div>

            <button
              type="button"
              disabled={busy}
              onClick={() => setMode("email")}
              className="flex w-full items-center justify-center gap-3 border border-white/20 py-4 font-mono text-[13px] text-white transition-all hover:border-blood hover:bg-blood/10 disabled:opacity-60"
            >
              <Mail className="size-[18px]" />
              Continue with Email
            </button>

            <div className="pt-4 text-center">
              <Link
                href="/collection"
                className="font-mono text-[12px] text-white/45 underline underline-offset-4 transition-colors hover:text-white"
              >
                Browse as Guest
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="email"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="mt-9 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              start("email", email);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="login-email">EMAIL</Label>
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">PASSWORD</Label>
                <Link
                  href="/contact"
                  className="font-mono text-[10px] uppercase tracking-brand text-blood hover:underline"
                >
                  FORGOT?
                </Link>
              </div>
              <Input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={busy}>
              {pendingProvider === "email" ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> SIGNING IN…
                </>
              ) : (
                "SIGN IN →"
              )}
            </Button>

            <button
              type="button"
              onClick={() => {
                setMode("providers");
                dispatch(clearError());
              }}
              className="flex w-full items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-brand text-white/40 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-3" /> OTHER SIGN-IN OPTIONS
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="mt-4 border-l-2 border-blood bg-blood/10 px-3 py-2 font-mono text-[11px] text-white/80"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <p className="mt-8 text-center font-mono text-[10px] leading-relaxed text-white/25">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="text-white/50 underline underline-offset-2 hover:text-white">
          Terms
        </Link>{" "}
        &{" "}
        <Link
          href="/privacy-policy"
          className="text-white/50 underline underline-offset-2 hover:text-white"
        >
          Privacy Policy
        </Link>
      </p>
    </motion.div>
  );
}
