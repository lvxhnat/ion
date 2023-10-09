import { ThemeMode } from "./createTheme";
import { ColorsEnum } from "./colors";

const defaultPalette = {
  primary: {
    main: ColorsEnum.primary,
    light: ColorsEnum.secondary,
  },
  secondary: {
    main: ColorsEnum.secondary,
  },
  success: {
    main: ColorsEnum.success,
  },
  error: {
    main: ColorsEnum.error,
  },
};

export const darkPalette = {
  ...defaultPalette,
  mode: "dark" as ThemeMode,
  color: ColorsEnum.white,
  background: {
    default: ColorsEnum.darkMode,
  },
};

export const lightPalette = {
  ...defaultPalette,
  mode: "light" as ThemeMode,
  background: {
    default: ColorsEnum.white,
  },
  color: ColorsEnum.darkMode,
};
