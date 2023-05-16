import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';

import { MdAdd } from 'react-icons/md';

import Navigation from 'components/Navigation';
import CreatePortfolioPopup from './portfoliopopup';
import PortfolioTable from './portfoliotable/portfoliotable';
import PortfolioSidePanel from './portfoliosidepanel/portfoliosidepanel';

export default function Portfolio() {
    const [show, setShow] = React.useState<boolean>(false);
    return (
        <>
            <CssBaseline />
            <Navigation />
            <div style={{ display: 'flex', gap: 5 }}>
                <div style={{ width: '40%' }}>
                    <S.OptionsWrapper>
                        <S.ButtonWrapper onClick={() => setShow(true)}>
                            <MdAdd />
                            <Typography variant="subtitle2"> Add Portfolio </Typography>
                        </S.ButtonWrapper>
                    </S.OptionsWrapper>
                    <PortfolioTable />
                </div>
                <div style={{ width: '60%', minHeight: '50vh' }}>
                    <PortfolioSidePanel />
                </div>
            </div>
            <CreatePortfolioPopup show={show} setShow={setShow} />
        </>
    );
}
