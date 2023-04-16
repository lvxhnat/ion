import * as React from 'react';

import Typography from '@mui/material/Typography';
import { useLiveMovesStore } from 'store/prices/watchlist';
import { stringToColour } from 'common/helper/general';
import { ColorsEnum } from 'common/theme';

export default function ChartviewPriceShower(props: { ticker: string }) {
    let liveMoves: { [metric: string]: number | null } = useLiveMovesStore(
        state => state.liveMoves
    )[props.ticker];
    liveMoves = liveMoves ?? {};

    return (
        <div
            style={{
                display: 'flex',
                gap: 5,
                alignItems: 'center',
                justifyContent: 'flex-start',
                border: `1px solid ${ColorsEnum.coolgray1}`,
            }}
        >
            <Typography
                variant="subtitle2"
                component="div"
                style={{
                    color: 'white',
                    padding: 2,
                    paddingRight: 5,
                    borderRight: `1px solid ${ColorsEnum.coolgray1}`,
                }}
            >
                ${liveMoves['price']?.toFixed(2)}
            </Typography>
            {Object.keys(liveMoves).map((metricName: string) => {
                const metricNameArr = metricName.split('_');
                const idString = `${props.ticker}_${metricName}`;
                if (metricName !== 'price')
                    return (
                        <Typography
                            variant="subtitle2"
                            style={{
                                color: stringToColour(idString),
                                padding: 2,
                                paddingRight: 5,
                                borderRight: `1px solid ${ColorsEnum.coolgray1}`,
                            }}
                            key={idString}
                        >
                            {`${metricNameArr[0]} (${metricNameArr
                                .slice(1, metricNameArr.length)
                                .join(', ')}): ${liveMoves[metricName]?.toFixed(2)}`}
                        </Typography>
                    );
            })}
        </div>
    );
}
