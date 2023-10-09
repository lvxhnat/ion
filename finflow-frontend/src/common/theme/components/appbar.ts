import { alpha } from "@mui/material/styles";
import { ColorsEnum } from "../colors";

export const appBarTheme = {
  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        backgroundColor: ColorsEnum.darkMode,
        color: ColorsEnum.white,
      }),
    },
  },
};
