import { styled } from '@mui/system';
import { alpha } from '@mui/material';

import { ColorsEnum } from 'common/theme';
import React from 'react';

export const Pill = styled('div')(({ theme }) => ({
    fontSize: '10px',
    width: '110px',
}));

const pillStyling: React.CSSProperties = {
    height: '30px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center' /* align horizontal */,
    alignItems: 'center' /* align vertical */,
};

export const LeftPill = styled('div')(({ theme }) => ({
    ...pillStyling,
    width: '60%',
    borderBottomLeftRadius: '15px',
    borderTopLeftRadius: '15px',
    backgroundColor: alpha(
        theme.palette.mode === 'light' ? ColorsEnum.coolgray6 : ColorsEnum.warmgray1,
        1.0
    ),
}));

export const RightPill = styled('div')(({ theme }) => ({
    ...pillStyling,
    width: '40%',
    borderBottomRightRadius: '15px',
    borderTopRightRadius: '15px',
    borderLeft:
        theme.spacing(0.5) +
        ' solid ' +
        alpha(theme.palette.mode === 'light' ? ColorsEnum.white : ColorsEnum.darkGrey, 0.9),
    backgroundColor: alpha(
        theme.palette.mode === 'light' ? ColorsEnum.coolgray6 : ColorsEnum.warmgray1,
        1.0
    ),
}));
