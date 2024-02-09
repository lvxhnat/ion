import * as React from 'react';
import * as S from '../style';
import { v4 as uuidv4 } from 'uuid';

import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

import { FredSeriesEntry } from 'endpoints/clients/fred';
import { PostgresTablesEnum } from 'endpoints/schema/database/postgres/props';
import { getWatchlistAssets } from 'endpoints/clients/database/postgres/query';
import { deleteTable, insertTable } from 'endpoints/clients/database/postgres/general';

import { ColorsEnum } from 'common/theme';
import { formatDate } from 'common/constant/dates';
import { getUniqueTickerId } from 'common/constant/ids';
import { ASSET_TYPES, SOURCE_TYPES } from 'common/constant';

interface SelectedSeriesSidebarProps {
    seriesSelected: FredSeriesEntry;
}

const AddToWatchlistButton = (props: { symbol: string }) => {
    const [watchlistAdded, setWatchlistAdded] = React.useState<boolean>(false);

    React.useEffect(() => {
        getWatchlistAssets({ symbol: props.symbol }).then(res => {
            setWatchlistAdded(!!res.data);
        });
    }, [props.symbol]);

    const handleWatchlist = () => {
        setWatchlistAdded(!watchlistAdded);
        getWatchlistAssets({ symbol: props.symbol }).then(res => {
            if (!res.data) {
                insertTable({
                    tableName: PostgresTablesEnum.WATCHLIST,
                    entry: {
                        uuid: uuidv4(),
                        symbol: props.symbol,
                        date_added: new Date(),
                        asset_type: ASSET_TYPES.FRED as keyof typeof ASSET_TYPES,
                        source: SOURCE_TYPES.FRED as keyof typeof SOURCE_TYPES,
                    },
                });
            } else {
                deleteTable({
                    tableName: PostgresTablesEnum.WATCHLIST,
                    id: props.symbol,
                });
            }
        });
    };

    return (
        <S.ButtonWrapper selected={watchlistAdded} onClick={handleWatchlist}>
            {watchlistAdded ? <DoneIcon fontSize="inherit" /> : <AddIcon fontSize="inherit" />}
            <Typography variant="subtitle2">
                {watchlistAdded ? 'Added to Watchlist' : 'Add to Watchlist'}
            </Typography>
        </S.ButtonWrapper>
    );
};

export default function SelectedSeriesSidebar(props: SelectedSeriesSidebarProps) {
    return (
        <div style={{ padding: 10 }}>
            <Typography variant="body1" style={{ color: ColorsEnum.beer }}>
                {getUniqueTickerId(
                    SOURCE_TYPES.FRED as keyof typeof SOURCE_TYPES,
                    props.seriesSelected.id
                )}
            </Typography>
            <Typography
                variant="subtitle1"
                style={{
                    color: ColorsEnum.beer10,
                    paddingBottom: 15,
                }}
            >
                {' '}
                {props.seriesSelected.title} ({props.seriesSelected.units_short}){' '}
            </Typography>
            <Typography
                variant="subtitle2"
                style={{
                    color: ColorsEnum.warmgray2,
                    paddingBottom: 10,
                }}
            >
                {props.seriesSelected.notes}
            </Typography>
            <Typography
                variant="subtitle2"
                variantMapping={{
                    subtitle2: 'span', // or any other variant you want to use
                }}
            >
                <span style={{ fontWeight: 'bold' }}> Units: </span>
                {props.seriesSelected.units} ({props.seriesSelected.units_short})
            </Typography>
            <Typography
                component="div"
                variant="subtitle2"
                variantMapping={{
                    subtitle2: 'span', // or any other variant you want to use
                }}
            >
                <span style={{ fontWeight: 'bold' }}> Seasonal Adjustment: </span>
                {props.seriesSelected.seasonal_adjustment} (
                {props.seriesSelected.seasonal_adjustment_short})
            </Typography>
            <Typography variant="subtitle2">
                <span style={{ fontWeight: 'bold' }}> Series Search Popularity: </span>
                {props.seriesSelected.popularity}
            </Typography>

            <Typography variant="subtitle2" style={{ paddingTop: 10 }}>
                <span style={{ fontWeight: 'bold' }}> Observation Period: </span>
                {props.seriesSelected.observation_start} to {props.seriesSelected.observation_end}
            </Typography>
            <Typography variant="subtitle2">
                <span style={{ fontWeight: 'bold' }}> Observation Frequency: </span>
                {props.seriesSelected.frequency} ({props.seriesSelected.frequency_short})
            </Typography>
            <Typography
                variant="subtitle2"
                style={{
                    color: ColorsEnum.warmgray5,
                    paddingTop: 10,
                }}
            >
                <span style={{ fontWeight: 'bold' }}> Dataset Last Updated: </span>
                {formatDate(props.seriesSelected.last_updated)}
            </Typography>
            <div style={{ paddingTop: 10 }}>
                <AddToWatchlistButton symbol={props.seriesSelected.id} />
            </div>
        </div>
    );
}
