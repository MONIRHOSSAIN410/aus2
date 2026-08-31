import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthProvider = "google" | "apple" | "email" | "guest";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  provider: AuthProvider;
  avatarInitials: string;
  memberSince: string;
  tier: string;
}

export interface AuthState {
  user: AuthUser | null;
  status: "idle" | "loading" | "authenticated" | "error";
  pendingProvider: AuthProvider | null;
  error: string | null;
  redirectTo: string;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  pendingProvider: null,
  error: null,
  redirectTo: "/account",
};

const NAMES: Record<AuthProvider, string> = {
  google: "Kaito Mori",
  apple: "Rin Sato",
  email: "New Recruit",
  guest: "Guest",
};

function makeUser(provider: AuthProvider, email?: string): AuthUser {
  const name = provider === "email" && email ? email.split("@")[0].replace(/[._-]/g, " ") : NAMES[provider];
  const clean = name.trim() || "Zenji Member";
  return {
    id: `usr_${provider}_${Math.abs(hash(clean + provider))}`,
    name: clean.replace(/\b\w/g, (c) => c.toUpperCase()),
    email: email ?? `${clean.toLowerCase().replace(/\s+/g, ".")}@zenji.shop`,
    provider,
    avatarInitials: clean
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join(""),
    memberSince: "2026",
    tier: provider === "guest" ? "VISITOR" : "INITIATE",
  };
}

function hash(value: string) {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h << 5) - h + value.charCodeAt(i);
  return h;
}

/**
 * Mock sign-in.
 *
 * Swap the body for a real call when you wire an auth provider:
 *   const res = await signIn("google", { redirect: false })   // next-auth
 *   const res = await supabase.auth.signInWithOAuth({ provider: "apple" })
 * The reducers below do not care where the user object comes from.
 */
export const signInWithProvider = createAsyncThunk(
  "auth/signInWithProvider",
  async (payload: { provider: AuthProvider; email?: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    if (payload.provider === "email" && payload.email && !/^\S+@\S+\.\S+$/.test(payload.email)) {
      throw new Error("INVALID_EMAIL");
    }
    return makeUser(payload.provider, payload.email);
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
      state.pendingProvider = null;
    },
    setRedirect(state, action: PayloadAction<string>) {
      state.redirectTo = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    hydrateUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
      state.status = action.payload ? "authenticated" : "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithProvider.pending, (state, action) => {
        state.status = "loading";
        state.pendingProvider = action.meta.arg.provider;
        state.error = null;
      })
      .addCase(signInWithProvider.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.pendingProvider = null;
        state.user = action.payload;
      })
      .addCase(signInWithProvider.rejected, (state, action) => {
        state.status = "error";
        state.pendingProvider = null;
        state.error =
          action.error.message === "INVALID_EMAIL"
            ? "That email address does not look right."
            : "Sign-in failed. Try again.";
      });
  },
});

export const { signOut, setRedirect, clearError, hydrateUser } = authSlice.actions;
export default authSlice.reducer;
