import * as React from 'react';
import * as S from './style';

import { v4 as uuid } from 'uuid';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';

import Navigation from 'components/Navigation';
import PortfolioPopup from './portfoliopopup';
import PortfolioSidePanel from './portfoliosidepanel/portfoliosidepanel';
import PortfolioMain from './portfoliomain/portfoliomain';
import { PortfolioPopupOptionRow, PortfolioPopupTextRow } from './portfoliopopup/portfoliopopup';
import { PortfolioTableEntry } from 'endpoints/schema/database/postgres/portfolio';
import { usePortfolioStore } from 'store/portfolio/portfolio';
import { PostgresTablesEnum } from 'endpoints/schema/database/postgres/props';
import { getTable, insertTable } from 'endpoints/clients/database/postgres/general';

const createPortfolioTableEntry = () => ({
    uuid: '',
    name: '',
    description: '',
    currency: '',
    last_updated: new Date(),
    creation_date: new Date(),
});

export default function Portfolio() {
    const [show, setShow] = React.useState<boolean>(false);
    const [addPortfolio, setPortfolios] = usePortfolioStore(state => [
        state.addPortfolio,
        state.setPortfolios,
    ]);
    const [portfolioConfig, setPortfolioConfig] = React.useState<PortfolioTableEntry>(
        createPortfolioTableEntry()
    );

    const defaultCurrency = 'SGD';

    React.useEffect(() => {
        getTable({ tableName: PostgresTablesEnum.PORTFOLIO }).then(res => {
            setPortfolios(res.data);
        });
    }, []);

    const handleClick = () => {
        portfolioConfig.currency =
            portfolioConfig.currency === '' ? defaultCurrency : portfolioConfig.currency;
        portfolioConfig.uuid = uuid();
        portfolioConfig.creation_date = new Date();
        addPortfolio(portfolioConfig);
        insertTable({
            tableName: PostgresTablesEnum.PORTFOLIO,
            entry: portfolioConfig,
        });
        setShow(false);
        setPortfolioConfig(createPortfolioTableEntry());
    };

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
            <PortfolioPopup show={show} setShow={setShow} handleClick={handleClick}>
                <PortfolioPopupTextRow
                    type="text"
                    title="Portfolio Name"
                    onChange={(event: any) => {
                        portfolioConfig.name = event.target.value;
                        setPortfolioConfig(portfolioConfig);
                    }}
                />
                <PortfolioPopupTextRow
                    title="Portfolio Description"
                    onChange={(event: any) => {
                        portfolioConfig.description = event.target.value;
                        setPortfolioConfig(portfolioConfig);
                    }}
                />
                <PortfolioPopupOptionRow
                    selected={defaultCurrency}
                    title="Currency Specification"
                    options={['SGD', 'USD']}
                    onChange={(event: any) => {
                        portfolioConfig.currency = event.target.value;
                        setPortfolioConfig(portfolioConfig);
                    }}
                />
            </PortfolioPopup>
        </>
    );
}
