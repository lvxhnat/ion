import * as d3 from 'd3';
import * as React from 'react';

import Header from './components/Header';
import BaseLineChart from '../BaseLineChart';
import { DefaultDataProps } from '../BaseLineChart/type';
import { GeneralTableTypeProp } from './components/Header/IndicatorPopup/ChoiceTable/configs';

export default function TSChart(): React.ReactElement {
    const [data, setData] = React.useState<DefaultDataProps>();
    const [indicatorData, setIndicatorData] = React.useState<DefaultDataProps[]>([]);

    const intervalsAvailable = ['1D', '1W', '1M', '3M', '6M', '1Y', '3Y', '5Y'];

    function setDataHook(item: GeneralTableTypeProp<number[]>) {
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
    const parseTime = d3.timeParse('%Y-%m-%d');

    React.useEffect(() => {
        d3.csv(
            'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv'
        )
            .catch()
            .then((d: any) => {
                setData({
                    id: 'base-line',
                    name: 'Base Line Chart',
                    parent: true,
                    dataX: d.map((d_: any) => parseTime(d_.date)).slice(0, 500),
                    dataY: d.map((d_: any) => parseFloat(d_.value)).slice(0, 500),
                    color: 'red',
                    type: 'areaLine',
                });
            })
            .catch(() => null);
    }, []);

    return (
        <>
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
        </>
    );
}
