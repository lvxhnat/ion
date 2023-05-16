import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';

import { MdAdd, MdRemove } from 'react-icons/md';

import Navigation from 'components/Navigation';
import CreatePortfolioPopup from './portfoliopopup';
import PortfolioTable from './portfoliotable/portfoliotable';
import PortfolioSidePanel from './portfoliosidepanel/portfoliosidepanel';
import { usePortfolioStore } from 'store/portfolio/portfolio';
import { deleteTable } from 'endpoints/clients/database/postgres';
import { PostgresTablesEnum } from 'endpoints/schema/database/postgres/props';

export default function Portfolio() {
    const [show, setShow] = React.useState<boolean>(false);
    const [portfolioSelected, clearSelectedPortfolio, deletePortfolio] = usePortfolioStore(state => [
        state.selectedPortfolio, 
        state.clearSelectedPortfolio,
        state.deletePortfolio
    ])

    const handleRemovePortfolio = () => {
        if ("uuid" in portfolioSelected) {
            deleteTable({
                id: portfolioSelected.uuid,
                tableName: PostgresTablesEnum.PORTFOLIO,
            })
            clearSelectedPortfolio()
        }
    }

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
                        <S.ButtonWrapper disabled={Object.keys(portfolioSelected).length === 0} onClick={() => {
                            if ('uuid' in portfolioSelected) {
                                handleRemovePortfolio()
                                deletePortfolio(portfolioSelected.uuid);
                            }
                        }}>
                            <MdRemove />
                            <Typography variant="subtitle2"> Remove Portfolio </Typography>
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
