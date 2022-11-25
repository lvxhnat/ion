import * as d3 from 'd3';
import * as React from 'react';

import Header from './components/Header';
import BaseLineChart from '../BaseChart';
import { GeneralTableTypeProp } from './components/Header/IndicatorPopup/ChoiceTable/configs';
import { ionIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';
import { DefaultDataProps, OHLCDataSchema } from '../BaseChart/schema/schema';

export default function TSChart(): React.ReactElement {
    const [data, setData] = React.useState<DefaultDataProps>();
    const [indicatorData, setIndicatorData] = React.useState<DefaultDataProps[]>([]);

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

    // Parse the time in data
    const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S');

    React.useEffect(() => {
        ionIngestionRequest
            .post(ENDPOINTS.PRIVATE.OANDA_FX_HISTORICAL_ENDPOINT, {
                symbol: 'EUR_USD',
                period: '1W',
            })
            .then((d: any) => {
                console.log(d);
                setData({
                    id: 'base-line',
                    name: 'Base Line Chart',
                    parent: true,
                    dataX: d.data.data.map((d_: any) => parseTime(d_.date)),
                    dataY: d.data.data.map((d_: any) => {
                        return {
                            high: parseFloat(d_.mid_high),
                            low: parseFloat(d_.mid_low),
                            open: parseFloat(d_.mid_open),
                            close: parseFloat(d_.mid_close),
                        };
                    }),
                    color: 'red',
                    type: 'candleStick',
                });
            });
    }, []);

    return (
        <div>
            <Header setData={setDataHook} baseId={`svg-container`} />
            {data ? (
                <BaseLineChart
                    baseId={`svg-container`}
                    defaultData={data}
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
