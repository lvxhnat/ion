import * as React from 'react';

import Typography from '@mui/material/Typography';

import {
    AllowedLiveMoveValueTypes,
    TickerMetricStoreFormat,
    useLiveMovesStore,
    useMetricStore,
} from 'store/prices/watchlist';
import { ColorsEnum } from 'common/theme';
import { technicalIndicators } from './calculations/metrics';
import { formatDate } from 'common/constant/dates';

export default function ChartviewPriceShower(props: { ticker: string }) {
    const metrics = useMetricStore(state => state.metrics[props.ticker]);
    return (
        <div
            style={{
                gap: 5,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                border: `1px solid ${ColorsEnum.coolgray1}`,
            }}
        >
            <ChartViewPriceShowerCell ticker={props.ticker} />
            {metrics
                ? metrics.map((entry: TickerMetricStoreFormat) => {
                      return (
                          <ChartViewMetricShowerCell
                              key={`${entry.metricId}_ChartViewMetricShowerCell`}
                              ticker={props.ticker}
                              entry={entry}
                          />
                      );
                  })
                : undefined}
        </div>
    );
}

const ChartViewMetricShowerCell = (props: { ticker: string; entry: TickerMetricStoreFormat }) => {
    const liveMoves: AllowedLiveMoveValueTypes = useLiveMovesStore(
        state => state.liveMoves[props.ticker][props.entry.metricId]
    );

    const formattedIndicatorString = `${
        technicalIndicators[props.entry.metric].shortName
    }(${Object.values(props.entry.metricParams).join(', ')})`;

    return (
        <Typography
            key={props.entry.metricId}
            variant="subtitle2"
            component="div"
            style={{
                color: props.entry.color,
                padding: 2,
                paddingRight: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRight: `1px solid ${ColorsEnum.coolgray1}`,
            }}
        >
            {formattedIndicatorString}: {(liveMoves as number)?.toFixed(2)}
        </Typography>
    );
};

const ChartViewPriceShowerCell = (props: { ticker: string }) => {
    const liveMoves = useLiveMovesStore(state => state.liveMoves);
    return (
        <Typography
            variant="subtitle2"
            component="div"
            style={{
                color: 'white',
                padding: 2,
                paddingLeft: 5,
                paddingRight: 5,
                borderRight: `1px solid ${ColorsEnum.coolgray1}`,
            }}
        >
            {liveMoves[props.ticker]
                ? `${formatDate(liveMoves[props.ticker]['date'] as Date)}: $${
                      liveMoves[props.ticker]['price'] as number
                  }`
                : undefined}
        </Typography>
    );
};
