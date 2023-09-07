import { ColorsEnum } from 'common/theme';
import React from 'react';

export default function TrendSlicer(props: { timeSeries: number[] }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {props.timeSeries.map((value: number, index: number) => {
                if (index !== 0) {
                    return (
                        <div
                            key={`trendSlicer-${index}-${value}`}
                            style={{
                                backgroundColor:
                                    value - props.timeSeries[index - 1] > 0
                                        ? ColorsEnum.upHint
                                        : ColorsEnum.downHint,
                                width: `${100 / props.timeSeries.length - 1}%`,
                                border: `1px solid black`,
                            }}
                        >
                            {` .  `}
                        </div>
                    );
                }
            })}
        </div>
    );
}
