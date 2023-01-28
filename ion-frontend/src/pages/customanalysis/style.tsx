import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { ColorsEnum } from 'common/theme';
import Box, { BoxProps } from '@mui/system/Box';
import { useThemeStore } from 'store/theme';

export const Panel = styled('div')(({ theme }) => ({
    display: 'flex',
    height: '100%',
    width: '100%',
    gap: 10,
}));

export const FilePanel = styled('div')(({ theme }) => ({
    gap: 0,
    height: '100%',
    padding: theme.spacing(0.5),
}));

export const PanelRow = styled('div')(({ theme }) => ({
    width: '100%',
    padding: `${theme.spacing(0.8)} ${theme.spacing(1)}`,
    display: 'flex',
    flexDirection: 'row',
}));

export const ConnectionFlag = styled(PanelRow)(({ theme }) => ({
    display: 'block',
    padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
    borderLeft: `3px solid ${ColorsEnum.beer}`,
    backgroundColor: ColorsEnum.darkGrey,
}));

export const SelectableRow = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: 10,
    '&:hover': {
        backgroundColor:
            theme.palette.mode === 'dark' ? ColorsEnum.warmgray1 : ColorsEnum.warmgray5,
        cursor: 'pointer',
    },
    padding: `${theme.spacing(0.8)} ${theme.spacing(1.5)}`,
    borderRadius: 2,
}));

export const SidePanel = styled('div')(({ theme }) => ({
    width: '15%',
    backgroundColor: theme.palette.mode === 'dark' ? ColorsEnum.darkGrey : 'transparent',
    border: `1px solid ${ColorsEnum.coolgray1}`,
    borderLeft: 'none',
    height: '100%',
}));

export const SidePanelRow = (props: {
    children?: any;
    dense?: boolean;
    displayHover?: boolean;
    style?: React.CSSProperties;
    rest?: BoxProps;
}) => {
    const theme = useTheme();

    let addCSS;
    if (props.displayHover) {
        addCSS = {
            '&:hover': {
                backgroundColor: ColorsEnum.warmgray2,
                cursor: 'pointer',
            },
        };
    } else {
        addCSS = {};
    }

    return (
        // See difference between sx and style https://stackoverflow.com/questions/72527461/when-should-i-use-style-instead-of-sx-prop-in-material-ui
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: `${props.dense ? theme.spacing(0.2) : theme.spacing(0.5)} ${theme.spacing(
                    2
                )}`,
                ...addCSS,
            }}
            {...props.rest}
        >
            {props.children}
        </Box>
    );
};

export const MainPanel = styled('div')(({ theme }) => ({
    flexGrow: 1,
    gap: 5,
}));

export const DatasetFlowWrapper = styled('div')(({ theme }) => ({
    width: '100%',
    minHeight: '100px',
    height: '15vh',
}));

export const MainPanelChartWrapper = styled('div')(({ theme }) => ({
    width: '80%',
}));

export const TypeDeclarationWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));

export const Tabs = (props: { children: any; [prop: string]: any }) => {
    return (
        <div
            style={{
                display: 'flex',
                gap: 15,
                paddingLeft: 10,
                paddingBottom: 5,
            }}
            {...props}
        >
            {props.children}
        </div>
    );
};

export const Tab = (props: {
    icon: React.ReactElement;
    label: string;
    selected: boolean;
    [index: string]: any;
}) => {
    const { mode } = useThemeStore();
    const defaultColor = mode === 'dark' ? ColorsEnum.white : ColorsEnum.black;
    const selectedColor = mode === 'dark' ? ColorsEnum.beer : ColorsEnum.oldschoolOrange;

    return (
        <Box
            style={{
                display: 'flex',
                alignItems: 'center',
                textTransform: 'none',
                fontSize: `calc(0.5rem + 0.3vw)`,
                gap: 5,
                paddingBottom: 2,
                paddingTop: 5,
                color: props.selected ? selectedColor : defaultColor,
                fontWeight: props.selected ? 'bold' : 300,
                boxShadow: props.selected ? `0 2px 0 ${selectedColor}` : 'none',
            }}
            sx={{
                '&:hover': {
                    cursor: 'pointer',
                    boxShadow: `0 2px 0 ${selectedColor}`,
                },
            }}
            {...props}
        >
            {props.icon}
            {props.label}
        </Box>
    );
};
