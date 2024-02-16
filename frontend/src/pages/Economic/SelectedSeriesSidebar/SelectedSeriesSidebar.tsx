import * as React from 'react';
import * as S from '../style';
import Typography from '@mui/material/Typography';

import { FredSeriesEntry } from 'endpoints/clients/fred';
import { ColorsEnum } from 'common/theme';
import { formatDate } from 'common/constant/dates';
import { getUniqueTickerId } from 'common/constant/ids';
import { SOURCE_TYPES } from 'common/constant';

interface SelectedSeriesSidebarProps {
    seriesSelected: FredSeriesEntry;
}

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
        </div>
    );
}
