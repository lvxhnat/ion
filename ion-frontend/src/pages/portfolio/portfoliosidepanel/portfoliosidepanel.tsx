import * as React from 'react';
import * as S from '../style';

import { v4 as uuid } from 'uuid';
import { GiMagicBroom } from 'react-icons/gi';
import { MdOutlineSsidChart, MdStop } from 'react-icons/md';
import Typography from '@mui/material/Typography';

import { usePortfolioStore } from 'store/portfolio/portfolio';

import { TickerSearch } from 'components/Search/Search';
import NoDataSkeleton from 'components/Skeletons/NoDataSkeleton';
import MainDataTable from 'components/Tables/MainDataTable';
import PopupButton from 'components/Button';
import { deleteTable, insertTable } from 'endpoints/clients/database/postgres/general';
import { MainDataTableHeaderType } from 'components/Tables/MainDataTable/MainDataTable';

import { PortfolioAssetTableEntry } from 'endpoints/schema/database/postgres/portfolio';
import { PostgresTablesEnum } from 'endpoints/schema/database/postgres/props';
import { getPortfolioAssets } from 'endpoints/clients/database/postgres/query';

/**
 * Initialise Portfolio Entry for insertion into portfolio_assets database
 * @param props
 * @returns
 */
const initialiseEntry = (props: {
    ticker: string;
    portfolio_id: string;
    asset_type: string;
}): PortfolioAssetTableEntry => {
    return {
        uuid: uuid(),
        asset_id: props.ticker,
        portfolio_id: props.portfolio_id,
        asset_type: props.asset_type,
        quantity: null,
        position: null,
        currency: null,
        account: null,
        price_purchased: null,
        fx_rate: null,
        transaction_date: null,
    };
};

export default function PortfolioSidePanel() {
    const [selectedOption, setSelectedOption] = React.useState<string>('');
    const [staticSelected, setStaticSelected] = React.useState<boolean>(false);
    const [selectedTickers, setSelectedTickers] = React.useState<PortfolioAssetTableEntry[]>([]);
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

    React.useEffect(() => {
        if ('uuid' in portfolioSelected) {
            getPortfolioAssets({
                id: portfolioSelected.uuid,
            }).then(res => {
                setSelectedTickers(res.data);
            });
        }
    }, [portfolioSelected]);

    const handleApply = () => {
        selectedTickers.map((entry: PortfolioAssetTableEntry) => {
            insertTable({
                tableName: PostgresTablesEnum.PORTFOLIO_ASSETS,
                entry: entry,
            });
        });
    };

    const handleCancel = () => {
        if ('uuid' in portfolioSelected) {
            getPortfolioAssets({
                id: portfolioSelected.uuid,
            }).then(res => {
                setSelectedTickers(res.data);
            });
        }
    };

    const handleRowRemove = (uuid: string) => {
        setSelectedTickers(selectedTickers.filter(entry => entry.uuid !== uuid));
        deleteTable({
            tableName: PostgresTablesEnum.PORTFOLIO_ASSETS,
            id: uuid,
        });
    };

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
                        }
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <S.ButtonWrapper onClick={() => setSelectedTickers([])}>
                        <GiMagicBroom />
                    </S.ButtonWrapper>
                </div>
            </S.OptionsWrapper>
            <S.PortfolioSidePanelBody>
                {selectedTickers.length === 0 ? (
                    <NoDataSkeleton text="No Tickers Available" />
                ) : (
                    <MainDataTable
                        id="asset_id"
                        handleRowRemove={handleRowRemove}
                        tableHeaders={staticTableHeaders}
                        tableBody={selectedTickers}
                    />
                )}
            </S.PortfolioSidePanelBody>
            <S.PortfolioSidePanelFooter>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                    <S.ButtonWrapper onClick={() => setStaticSelected(!staticSelected)}>
                        {staticSelected ? <MdStop /> : <MdOutlineSsidChart />}
                        <Typography variant="subtitle2">
                            {staticSelected ? 'Static' : 'Dynamic'}
                        </Typography>
                    </S.ButtonWrapper>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 5 }}>
                    <PopupButton buttonType="secondary" onClick={() => handleCancel()}>
                        Cancel
                    </PopupButton>
                    <PopupButton buttonType="primary" onClick={() => handleApply()}>
                        Apply
                    </PopupButton>
                </div>
            </S.PortfolioSidePanelFooter>
        </div>
    );
}
