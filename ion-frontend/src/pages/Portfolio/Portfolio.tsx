import * as React from 'react';
import * as S from './style';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import Header from 'components/Header';
import { ColorsEnum } from 'common/theme';

export default function Portfolio() {
    return (
        <>
            <CssBaseline />
            <Header />
            <S.OptionsWrapper>
                <S.StyledButton disableRipple startIcon={<AddIcon fontSize="small" />}>
                    <Typography variant="body2">Create</Typography>
                </S.StyledButton>
                <S.StyledButton disableRipple startIcon={<DeleteIcon fontSize="small" />}>
                    <Typography variant="body2">Remove</Typography>
                </S.StyledButton>
            </S.OptionsWrapper>
        </>
    );
}
