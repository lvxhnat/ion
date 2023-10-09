import { create } from "zustand";
import { THEME_MODE_KEY, ThemeMode } from "../../common/theme";
import { setCookie } from "../../common/helper/cookies";

interface ThemeTypes {
  mode?: ThemeMode;
  setMode: (mode?: ThemeMode) => void;
}

const MODE_EXPIRATION = 60 * 60 * 24 * 365; // 1 YEAR

export const useThemeStore = create<ThemeTypes>((set) => ({
  mode: undefined,
  setMode: (mode?: ThemeMode) => {
    set((state) => {
      const newThemeMode = mode || (state.mode === "dark" ? "light" : "dark");
      setCookie(THEME_MODE_KEY, newThemeMode, {
        maxAge: MODE_EXPIRATION,
      });
      return { mode: newThemeMode };
    });
  },
}));
