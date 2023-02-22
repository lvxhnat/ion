import * as d3 from 'd3';
import * as React from 'react';

import BaseLineChart from '../BaseChart';
import { GeneralTableTypeProp } from './components/Header/IndicatorPopup/ChoiceTable/configs';
import { DefaultDataProps } from '../BaseChart/schema/schema';
import { getHistoricalForex } from 'data/ingestion/forex';
import { OHLCDataSchema } from 'data/schema/common';
import { useChartStore } from 'store/chart/charting';

export default function TSChart(): React.ReactElement {
    const [data, setData] = React.useState<{ dataX: Date[]; dataY: number[] | OHLCDataSchema[] }>();
    const [indicatorData, setIndicatorData] = React.useState<DefaultDataProps[]>([]);
    const chartType = useChartStore(store => store.chartType);

    function setDataHook(item: GeneralTableTypeProp<number[] | OHLCDataSchema[]>) {
        setIndicatorData([
            ...indicatorData,
            {
                id: item.id,
                name: item.name,
                parent: false,
                dataX: data!.dataX,
                dataY: item.callback(data!.dataY),
                color: '#FFEDDE',
                type: 'line',
            },
        ]);
    }

    const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S');

    React.useEffect(() => {
        getHistoricalForex('EUR_USD', '1W').then((d: any) => {
            setData({
                dataX: d.data.data.slice(200, 400).map((d_: any) => parseTime(d_.date)),
                dataY: d.data.data.slice(200, 400).map((d_: any) => {
                    return {
                        high: parseFloat(d_.mid_high),
                        low: parseFloat(d_.mid_low),
                        open: parseFloat(d_.mid_open),
                        close: parseFloat(d_.mid_close),
                    };
                }),
            });
        });
    }, []);

    return (
        <div>
            {data ? (
                <BaseLineChart
                    baseId={`svg-container`}
                    defaultData={{
                        id: 'base-line',
                        name: 'Base Line Chart',
                        parent: true,
                        dataX: data.dataX,
                        dataY: data.dataY,
                        color: 'red',
                        type: chartType,
                    }}
                    data={indicatorData}
                    zeroAxis
                    showGrid
                    showAxis
                    showLegend
                    showNormalised
                    showTooltip
                />
            ) : null}
        </div>
    );
}
