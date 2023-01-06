import * as React from 'react';
import * as S from '../style';

import * as d3 from 'd3';
import Drop from './Drop';
import BaseChart from 'components/Charting/BaseChart';
import { dataIngestionRequest } from 'services/request';
import { REQUEST_ENDPOINTS } from 'data/endpoints/forex';

export default function MainPanel() {
    const [data, setData] = React.useState<any>();

    React.useEffect(() => {
        const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S');

        dataIngestionRequest
            .post(REQUEST_ENDPOINTS.OANDA_HISTORICAL.ENDPOINT, {
                symbol: 'EUR_USD',
                period: '1M_S',
            })
            .then(data => {
                setData({
                    id: 'EUR_USD',
                    name: 'EUR_USD',
                    parent: true,
                    dataX: data.data.data.map((d: any) => parseTime(d.date)),
                    dataY: data.data.data.map((d: any) => d.mid_close),
                    color: 'white',
                    type: 'pureLine',
                });
            });
    }, []);

    return (
        <S.MainPanel>
            <Drop />
            <S.MainPanelChartWrapper>
                {data ? (
                    <BaseChart
                        baseId={`treasury_chart`}
                        defaultData={data}
                        zeroAxis
                        showGrid
                        showAxis
                        showLegend
                        showNormalised
                        showTooltip
                    />
                ) : null}
            </S.MainPanelChartWrapper>
        </S.MainPanel>
    );
}
