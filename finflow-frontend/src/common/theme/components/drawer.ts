import { ColorsEnum } from '../colors';

export const drawerTheme = {
    MuiDrawer: {
        styleOverrides: {
          paper: ({ theme }: any) => ({
            backgroundColor:
                theme.palette.mode === 'light'
                ? ColorsEnum.black
                : ColorsEnum.darkMode,
            color:
                theme.palette.mode === 'light'
                ? ColorsEnum.white
                : ColorsEnum.black,
        }),
        },
      },
};
