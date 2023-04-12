import * as React from 'react';
import * as S from './style';

import DeleteIcon from '@mui/icons-material/Delete';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import Navigation from 'components/Navigation';
import CreatePortfolio from './CreatePortfolio';
import MainTable from './MainTable';

export default function Portfolio() {
    return (
        <>
            <CssBaseline />
            <Navigation />
            <S.OptionsWrapper>
                <CreatePortfolio />
                <S.IconButtonWrapper>
                    <DeleteIcon fontSize="small" />
                </S.IconButtonWrapper>
            </S.OptionsWrapper>
            <MainTable />
        </>
    );
}
