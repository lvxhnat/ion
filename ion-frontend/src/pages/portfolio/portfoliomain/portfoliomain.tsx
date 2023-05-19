import * as React from 'react';
import * as S from '../style';

import Typography from '@mui/material/Typography';

import { MdAdd, MdRemove } from 'react-icons/md';

import PortfolioDesc from './portfoliodesc';
import PortfolioTable from './portfoliotable';
import { usePortfolioStore } from 'store/portfolio/portfolio';
import { deleteTable } from 'endpoints/clients/database/postgres';
import { PostgresTablesEnum } from 'endpoints/schema/database/postgres/props';

export default function PortfolioMain(props: { setShow: (show: boolean) => void }) {
    const [portfolioSelected, clearSelectedPortfolio, deletePortfolio] = usePortfolioStore(
        state => [state.selectedPortfolio, state.clearSelectedPortfolio, state.deletePortfolio]
    );

    const handleRemovePortfolio = () => {
        if ('uuid' in portfolioSelected) {
            deleteTable({
                id: portfolioSelected.uuid,
                tableName: PostgresTablesEnum.PORTFOLIO,
            });
            clearSelectedPortfolio();
        }
    };
    return (
        <div>
            <PortfolioDesc />
            <S.OptionsWrapper>
                <S.ButtonWrapper onClick={() => props.setShow(true)}>
                    <MdAdd />
                    <Typography variant="subtitle2"> Add Portfolio </Typography>
                </S.ButtonWrapper>
                <S.ButtonWrapper
                    disabled={Object.keys(portfolioSelected).length === 0}
                    onClick={() => {
                        if ('uuid' in portfolioSelected) {
                            handleRemovePortfolio();
                            deletePortfolio(portfolioSelected.uuid);
                        }
                    }}
                >
                    <MdRemove />
                    <Typography variant="subtitle2"> Remove Portfolio </Typography>
                </S.ButtonWrapper>
            </S.OptionsWrapper>
            <PortfolioTable />
        </div>
    );
}
