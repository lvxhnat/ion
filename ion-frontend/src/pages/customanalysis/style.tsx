import * as React from 'react';
import { styled } from '@mui/material/styles';

export const Panel = styled('div')(({ theme }) => ({
    display: 'flex',
}));

export const SidePanel = styled('div')(({ theme }) => ({
    width: '20%',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
}));

export const SidePanelRow = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 5,
}));

export const MainPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: 5,
}));

export const TypeDeclarationWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));
