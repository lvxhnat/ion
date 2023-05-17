import * as React from 'react';
import * as S from '../style';

import Typography from '@mui/material/Typography';

import { TickerSearch } from 'components/Search/Search';
import { usePortfolioStore } from 'store/portfolio/portfolio';
import { MdOutlineSsidChart, MdStop } from 'react-icons/md';
import NoDataSkeleton from 'components/Skeletons/NoDataSkeleton';
import MainDataTable from 'components/Tables/MainDataTable';
import { MainDataTableHeaderType } from 'components/Tables/MainDataTable/MainDataTable';

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
        quantity: 0,
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

    const staticTableHeaders: MainDataTableHeaderType[] = [
        { id: 'remove', name: 'remove', type: 'remove', width: 5 },
        { id: 'edit', name: 'edit', type: 'edit', width: 5 },
        { id: 'asset_id', name: 'asset_id', type: 'value' },
        { id: 'quantity', name: 'quantity', type: 'value' },
        { id: 'position', name: 'position', type: 'value' },
        { id: 'currency', name: 'currency', type: 'value' },
    ];
    const dynamicTableHeaders: MainDataTableHeaderType[] = [
        ...staticTableHeaders,
        { id: 'price_purchased', name: 'price_purchased', type: 'value' },
        { id: 'transaction_date', name: 'transaction_date', type: 'value' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <S.OptionsWrapper>
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
                            {staticSelected ? 'Static' : 'Dynamic'}
                        </Typography>
                    </S.ButtonWrapper>
                </div>
            </S.OptionsWrapper>
            <S.PortfolioSidePanelBody>
                {selectedTickers.length === 0 ? (
                    <NoDataSkeleton text="No Tickers Available" />
                ) : (
                    <MainDataTable
                        id="asset_id"
                        tableHeaders={staticTableHeaders}
                        tableBody={selectedTickers}
                    />
                )}
            </S.PortfolioSidePanelBody>
            <S.PortfolioSidePanelFooter> </S.PortfolioSidePanelFooter>
        </div>
    );
}
