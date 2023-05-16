import { styled } from '@mui/system';
import { ColorsEnum } from 'common/theme';
import { typographyTheme } from 'common/theme/typography';

type TableRowInputProps = {
    overtColors: boolean;
    disableHover?: boolean;
    theme?: any;
};

export const ClassTagWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: `${0} ${theme.spacing(1)}`,
    height: 15,
    fontSize: typographyTheme.subtitle2.fontSize,
    backgroundColor: ColorsEnum.royalred,
}));

export const TableRowWrapper = styled('div')<TableRowInputProps>(
    ({ theme, overtColors, disableHover }) => ({
        display: 'flex',
        width: '100%',
        padding: 2,
        backgroundColor: overtColors ? ColorsEnum.warmgray1 : ColorsEnum.darkGrey,
        '&:hover': disableHover
            ? undefined
            : {
                  backgroundColor: ColorsEnum.beer,
                  color: ColorsEnum.black,
              },
    })
);

export const TickerSearchInput = styled('input')(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.palette.mode === 'dark' ? ColorsEnum.black : ColorsEnum.white,
    border: 'none',
    outline: 'none',
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    color: theme.palette.mode === 'dark' ? ColorsEnum.white : ColorsEnum.white,
    fontSize: typographyTheme.subtitle2.fontSize,
}));

export const SelectArrowWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    '&:hover': {
        backgroundColor: ColorsEnum.warmgray3,
    },
    cursor: 'pointer',
}));

export const TableRowItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'default',
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
}));

export const SearchWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    '.MuiInputBase-root': {
        fieldset: {
            border: 'none',
            background:
                theme.palette.mode === 'light'
                    ? 'rgba(0, 0, 0, 0.06)'
                    : 'rgba(255, 255, 255, 0.09)',
        },
        '&.Mui-focused fieldset': {
            background:
                theme.palette.mode === 'light'
                    ? 'rgba(0, 0, 0, 0.09)'
                    : 'rgba(255, 255, 255, 0.06)',
        },
        '&:hover fieldset': {
            background:
                theme.palette.mode === 'light'
                    ? 'rgba(0, 0, 0, 0.09)'
                    : 'rgba(255, 255, 255, 0.06)',
        },
        '&.Mui-disabled fieldset': {
            background:
                theme.palette.mode === 'light'
                    ? 'rgba(0, 0, 0, 0.06)'
                    : 'rgba(255, 255, 255, 0.09)',
        },
    },
}));
