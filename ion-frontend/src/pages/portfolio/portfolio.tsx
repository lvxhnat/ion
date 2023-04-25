import * as React from 'react';
import * as S from './style';

import DeleteIcon from '@mui/icons-material/Delete';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';

import Navigation from 'components/Navigation';
import CreatePortfolioPopup from './portfoliopopup';
import { Typography } from '@mui/material';
import PortfolioTable from './portfoliotable/portfoliotable';

export default function Portfolio() {
    const [show, setShow] = React.useState<boolean>(false);
    return (
        <>
            <CssBaseline />
            <Navigation />
            <S.OptionsWrapper>
                <S.ButtonWrapper onClick={() => setShow(true)}>
                    <AddIcon fontSize="small" />
                    <Typography variant="subtitle2"> Add Portfolio </Typography>
                </S.ButtonWrapper>
            </S.OptionsWrapper>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '40%' }}>
                    <PortfolioTable />
                </div>
            </div>
            <CreatePortfolioPopup show={show} setShow={setShow} />
        </>
    );
}
