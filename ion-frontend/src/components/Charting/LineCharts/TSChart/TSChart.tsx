import * as d3 from 'd3';
import * as React from 'react';

import Header from './components/Header';
import BaseLineChart from '../BaseLineChart';
import { DefaultDataProps } from '../BaseLineChart/type';

export default function TSChart(): React.ReactElement {
    const [data, setData] = React.useState<DefaultDataProps>();

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
            <Header />
            {data ? (
                <BaseLineChart defaultData={data} showGrid showAxis showNormalised showTooltip />
            ) : null}
        </>
    );
}
