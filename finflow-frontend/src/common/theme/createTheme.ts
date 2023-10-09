import { createTheme as createMuiTheme } from "@mui/material/styles";

import { componentsTheme } from "./components";
import { darkPalette, lightPalette } from "./palette";
import { shapeTheme } from "./shape";
import { typographyTheme } from "./typography";

export type ThemeMode = "light" | "dark";
export const THEME_MODE_KEY = "ION_theme_mode";

const defaultTheme = {
  components: componentsTheme,
  typography: typographyTheme,
  shape: shapeTheme,
};

const createTheme = (modeTheme: ThemeMode) => {
  return createMuiTheme({
    ...defaultTheme,
    palette: modeTheme === "light" ? lightPalette : darkPalette,
  });
};

createTheme.components = componentsTheme;

export { createTheme };
