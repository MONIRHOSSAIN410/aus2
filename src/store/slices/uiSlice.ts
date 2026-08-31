import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  mobileNavOpen: boolean;
  searchOpen: boolean;
  searchQuery: string;
  promoDismissed: boolean;
  cookiesChoice: "accepted" | "declined" | null;
  quickViewSlug: string | null;
  introPlayed: boolean;
  toast: { id: number; title: string; description?: string } | null;
}

const initialState: UiState = {
  mobileNavOpen: false,
  searchOpen: false,
  searchQuery: "",
  promoDismissed: false,
  cookiesChoice: null,
  quickViewSlug: null,
  introPlayed: false,
  toast: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobileNav(state, action: PayloadAction<boolean>) {
      state.mobileNavOpen = action.payload;
    },
    setSearchOpen(state, action: PayloadAction<boolean>) {
      state.searchOpen = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    dismissPromo(state) {
      state.promoDismissed = true;
    },
    setCookiesChoice(state, action: PayloadAction<"accepted" | "declined">) {
      state.cookiesChoice = action.payload;
    },
    setQuickView(state, action: PayloadAction<string | null>) {
      state.quickViewSlug = action.payload;
    },
    markIntroPlayed(state) {
      state.introPlayed = true;
    },
    pushToast(state, action: PayloadAction<{ title: string; description?: string }>) {
      state.toast = { id: Date.now(), ...action.payload };
    },
    clearToast(state) {
      state.toast = null;
    },
  },
});

export const {
  setMobileNav,
  setSearchOpen,
  setSearchQuery,
  dismissPromo,
  setCookiesChoice,
  setQuickView,
  markIntroPlayed,
  pushToast,
  clearToast,
} = uiSlice.actions;
export default uiSlice.reducer;
