import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { ColorsEnum } from 'common/theme';
import Box, { BoxProps } from '@mui/system/Box';

export const Panel = styled('div')(({ theme }) => ({
    display: 'flex',
}));

export const SidePanel = styled('div')(({ theme }) => ({
    width: '15%',
    height: '90vh',
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
                padding: `${props.dense ? theme.spacing(0) : theme.spacing(0.5)} ${theme.spacing(
                    2
                )}`,
                gap: 5,
                ...addCSS,
            }}
            {...props.rest}
        >
            {props.children}
        </Box>
    );
};

export const MainPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: 5,
}));

export const TypeDeclarationWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));
