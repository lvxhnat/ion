import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';

import { MdAdd, MdRemove } from 'react-icons/md';

import Navigation from 'components/Navigation';
import CreatePortfolioPopup from './portfoliopopup';
import PortfolioSidePanel from './portfoliosidepanel/portfoliosidepanel';
import PortfolioMain from './portfoliomain/portfoliomain';

export default function Portfolio() {
    const [show, setShow] = React.useState<boolean>(false);

    return (
        <>
            <CssBaseline />
            <Navigation />
            <div style={{ display: 'flex', gap: 5 }}>
                <div style={{ width: '40%' }}>
                    <PortfolioMain setShow={setShow} />
                </div>
                <div style={{ width: '60%', minHeight: '50vh' }}>
                    <PortfolioSidePanel />
                </div>
            </div>
            <CreatePortfolioPopup show={show} setShow={setShow} />
        </>
    );
}
