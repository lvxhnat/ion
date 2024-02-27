import * as React from "react";
import { ThemeProvider as ThemeMUIProvider } from "@mui/material/styles";
import { FC, useEffect } from "react";

import { ThemeMode } from "../../common/types";
import { createTheme } from "../../common/theme";
import { useThemeStore } from "../../store/theme";

interface ThemeProviderProps {
  modeTheme?: ThemeMode;
  children?: React.ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, modeTheme }) => {
  const { mode, setMode } = useThemeStore();
  const themeMode = modeTheme || "light";
  const theme = createTheme(mode || themeMode);

  useEffect(() => {
    setMode(themeMode);
  }, [setMode, themeMode]);

  return <ThemeMUIProvider theme={theme}>{children}</ThemeMUIProvider>;
};

export default ThemeProvider;
