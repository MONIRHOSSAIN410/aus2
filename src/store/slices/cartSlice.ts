import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartLine {
  key: string;
  slug: string;
  name: string;
  size: string;
  price: number;
  compareAt?: number;
  quantity: number;
  colorway: string;
}

export interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  freeShippingThreshold: number;
  flatShipping: number;
}

const initialState: CartState = {
  lines: [],
  isOpen: false,
  freeShippingThreshold: 150,
  flatShipping: 9.99,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addLine: {
      reducer(state, action: PayloadAction<CartLine>) {
        const existing = state.lines.find((line) => line.key === action.payload.key);
        if (existing) existing.quantity += action.payload.quantity;
        else state.lines.unshift(action.payload);
        state.isOpen = true;
      },
      prepare(input: Omit<CartLine, "key" | "quantity"> & { quantity?: number }) {
        return {
          payload: {
            ...input,
            quantity: input.quantity ?? 1,
            key: `${input.slug}__${input.size}`,
          } as CartLine,
        };
      },
    },
    removeLine(state, action: PayloadAction<string>) {
      state.lines = state.lines.filter((line) => line.key !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ key: string; quantity: number }>) {
      const line = state.lines.find((item) => item.key === action.payload.key);
      if (!line) return;
      line.quantity = Math.max(1, Math.min(9, action.payload.quantity));
    },
    clearCart(state) {
      state.lines = [];
    },
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    hydrateCart(state, action: PayloadAction<CartLine[]>) {
      state.lines = action.payload;
    },
  },
});

export const {
  addLine,
  removeLine,
  updateQuantity,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
  hydrateCart,
} = cartSlice.actions;
export default cartSlice.reducer;
