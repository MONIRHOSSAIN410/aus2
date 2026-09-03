import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface WishlistState {
  slugs: string[];
}

const initialState: WishlistState = { slugs: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<string>) {
      const index = state.slugs.indexOf(action.payload);
      if (index >= 0) state.slugs.splice(index, 1);
      else state.slugs.push(action.payload);
    },
    hydrateWishlist(state, action: PayloadAction<string[]>) {
      state.slugs = action.payload;
    },
  },
});

export const { toggleWishlist, hydrateWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
