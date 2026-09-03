import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "./index";

export const selectCartLines = (state: RootState) => state.cart.lines;

export const selectCartCount = createSelector(selectCartLines, (lines) =>
  lines.reduce((total, line) => total + line.quantity, 0),
);

export const selectCartSubtotal = createSelector(selectCartLines, (lines) =>
  lines.reduce((total, line) => total + line.price * line.quantity, 0),
);

export const selectCartTotals = createSelector(
  [selectCartSubtotal, (state: RootState) => state.cart],
  (subtotal, cart) => {
    const shipping = subtotal === 0 || subtotal >= cart.freeShippingThreshold ? 0 : cart.flatShipping;
    return {
      subtotal,
      shipping,
      total: subtotal + shipping,
      remainingForFreeShipping: Math.max(0, cart.freeShippingThreshold - subtotal),
      progress: Math.min(1, subtotal / cart.freeShippingThreshold),
    };
  },
);

export const selectIsWishlisted = (slug: string) => (state: RootState) =>
  state.wishlist.slugs.includes(slug);
