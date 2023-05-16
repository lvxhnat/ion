import * as React from 'react';
import * as S from '../style';

import Typography from '@mui/material/Typography';

import { TickerSearch } from 'components/Search/Search';
import { usePortfolioStore } from 'store/portfolio/portfolio';
import { MdOutlineSsidChart, MdStop } from 'react-icons/md';
import NoDataSkeleton from 'components/Skeletons/NoDataSkeleton';

interface SelectedTickerSchema {
    asset_id: string;
    portfolio_id: string;
    asset_type: string;
    quantity: number | null;
    position: 'long' | 'short' | null;
    currency: string | null;
    price_purchased: string | null;
    transaction_date?: Date | null;
    account?: string;
    fx_rate?: number;
}

const initialiseEntry = (props: {
    ticker: string;
    portfolio_id: string;
    asset_type: string;
}): SelectedTickerSchema => {
    return {
        asset_id: props.ticker,
        portfolio_id: props.portfolio_id,
        asset_type: props.asset_type,
        quantity: null,
        position: null,
        currency: null,
        price_purchased: null,
        transaction_date: null,
    };
};

export default function PortfolioSidePanel() {
    const [selectedOption, setSelectedOption] = React.useState<string>('');
    const [staticSelected, setStaticSelected] = React.useState<boolean>(false);
    const [selectedTickers, setSelectedTickers] = React.useState<SelectedTickerSchema[]>([]);
    const portfolioSelected = usePortfolioStore(state => state.selectedPortfolio);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <S.PortfolioSidePanelHeader>
                <TickerSearch
                    setSelectedOption={(ticker: string, asset_type: string) => {
                        setSelectedOption(ticker);
                        if ('uuid' in portfolioSelected) {
                            setSelectedTickers([
                                ...selectedTickers,
                                initialiseEntry({
                                    ticker: ticker,
                                    portfolio_id: portfolioSelected.uuid,
                                    asset_type: asset_type,
                                }),
                            ]);
                            setSelectedTickers;
                        }
                    }}
                />
                <div></div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <S.ButtonWrapper onClick={() => setStaticSelected(!staticSelected)}>
                        {staticSelected ? <MdStop /> : <MdOutlineSsidChart />}
                        <Typography variant="subtitle2">
                            {' '}
                            {staticSelected ? 'Static' : 'Dynamic'}
                        </Typography>
                    </S.ButtonWrapper>
                </div>
            </S.PortfolioSidePanelHeader>
            <S.PortfolioSidePanelBody>
                {selectedTickers.length === 0 ? (
                    <NoDataSkeleton text="No Tickers Available" />
                ) : (
                    selectedTickers.map((entry: SelectedTickerSchema) => {
                        return <div key={entry.portfolio_id}>{entry.portfolio_id}</div>;
                    })
                )}
            </S.PortfolioSidePanelBody>
            <S.PortfolioSidePanelFooter> </S.PortfolioSidePanelFooter>
        </div>
    );
}
