import * as React from 'react';
import * as S from './style';

import DeleteIcon from '@mui/icons-material/Delete';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import Header from 'components/Header';
import CreatePortfolio from './CreatePortfolio/CreatePortfolio';
import MainTable from './MainTable';

export default function Portfolio() {
    return (
        <>
            <CssBaseline />
            <Header />
            <S.OptionsWrapper>
                <CreatePortfolio />
                <S.StyledButton disableRipple startIcon={<DeleteIcon fontSize="small" />}>
                    <Typography variant="body2">Remove</Typography>
                </S.StyledButton>
            </S.OptionsWrapper>
            <MainTable />
        </>
    );
}
