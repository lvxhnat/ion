import * as React from 'react';

import { getCandles } from 'data/ingestion/candles';
import { FinnhubCandlesEntrySchema } from 'data/schema/candles';

import BaseLineChart from 'components/Charting/BaseChart';
import useWindowDimensions from 'common/helper/general';
/**
 * Provides a historical chart view of a single security selected.
 * @returns
 */
export default function Chartview() {
    const { height, width } = useWindowDimensions();
    const [chartData, setChartData] = React.useState<any>();

    const symbol = 'SPY';

    React.useEffect(() => {
        getCandles(symbol).then(res => {
            const data = res.data[0];
            console.log(data);
            setChartData({
                id: symbol,
                name: symbol,
                parent: true,
                dataX: data.map((obj: FinnhubCandlesEntrySchema) => new Date(obj.date)),
                dataY: data.map((obj: FinnhubCandlesEntrySchema) => obj.close),
                color: 'white',
                type: 'pureLine',
            });
        });
    }, []);

    return (
        <div>
            {chartData ? (
                <BaseLineChart
                    showLegend
                    showAxis
                    showTooltip
                    showAverage
                    baseId={`${symbol}_tickerChart`}
                    defaultData={chartData}
                    width={width}
                    height={height/1.5}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                />
            ) : null}
        </div>
    );
}
