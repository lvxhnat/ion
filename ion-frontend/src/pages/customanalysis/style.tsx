import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { ColorsEnum } from 'common/theme';
import Box, { BoxProps } from '@mui/system/Box';

export const Panel = styled('div')(({ theme }) => ({
    display: 'flex',
    marginTop: 10,
}));

export const SidePanel = styled('div')(({ theme }) => ({
    width: '15%',
    minWidth: '13%',
    maxWidth: '30%',
    resize: 'horizontal',
    backgroundColor: ColorsEnum.darkGrey,
    border: `1px solid ${ColorsEnum.coolgray1}`,
    borderLeft: 'none',
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

export const ResizingCursor = styled('div')(({ theme }) => ({
    cursor: 'col-resize',
    flexShrink: 0,
    zIndex: 10,
    width: '5px',
}));

export const MainPanel = styled('div')(({ theme }) => ({
    flexGrow: 1,
    gap: 5,
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
    return (
        <Box
            style={{
                display: 'flex',
                alignItems: 'center',
                textTransform: 'none',
                fontWeight: 300,
                fontSize: `calc(0.5rem + 0.3vw)`,
                gap: 5,
                paddingBottom: 2,
                paddingTop: 5,
                color: props.selected ? ColorsEnum.beer : ColorsEnum.white,
                boxShadow: props.selected ? `0 2px 0 ${ColorsEnum.beer}` : 'none',
            }}
            sx={{
                '&:hover': {
                    cursor: 'pointer',
                    boxShadow: `0 2px 0 ${ColorsEnum.beer}`,
                },
            }}
            {...props}
        >
            {props.icon}
            {props.label}
        </Box>
    );
};
