"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Provider } from "react-redux";

import { makeStore, type AppStore } from "@/store";
import { hydrateCart, type CartLine } from "@/store/slices/cartSlice";
import { hydrateWishlist } from "@/store/slices/wishlistSlice";
import { hydrateUser, type AuthUser } from "@/store/slices/authSlice";

const CART_KEY = "zenji.cart.v1";
const WISHLIST_KEY = "zenji.wishlist.v1";
const AUTH_KEY = "zenji.auth.v1";

/**
 * Redux Provider with per-request store creation (App Router safe) and a small
 * localStorage bridge so the cart / wishlist / mock session survive a refresh.
 */
export function ReduxProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) storeRef.current = makeStore();

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;

    try {
      const cart = localStorage.getItem(CART_KEY);
      if (cart) store.dispatch(hydrateCart(JSON.parse(cart) as CartLine[]));

      const wishlist = localStorage.getItem(WISHLIST_KEY);
      if (wishlist) store.dispatch(hydrateWishlist(JSON.parse(wishlist) as string[]));

      const auth = localStorage.getItem(AUTH_KEY);
      if (auth) store.dispatch(hydrateUser(JSON.parse(auth) as AuthUser));
    } catch {
      /* storage unavailable (private mode, blocked cookies) — start empty */
    }

    return store.subscribe(() => {
      const state = store.getState();
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(state.cart.lines));
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishlist.slugs));
        if (state.auth.user) localStorage.setItem(AUTH_KEY, JSON.stringify(state.auth.user));
        else localStorage.removeItem(AUTH_KEY);
      } catch {
        /* quota or blocked — ignore */
      }
    });
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
