import * as React from 'react';
import * as d3 from 'd3';

import BaseLineChart from 'components/Charting/BaseChart';

import { dataIngestionRequest } from 'services/request';
import { DefaultDataProps } from 'components/Charting/BaseChart/schema/schema';
import { TableCellWrapper } from 'components/Tables/BaseTable/style';
import { ENDPOINTS } from 'common/constant/endpoints';

export default function ForexHistoricalCell(props: { forexPair: string }) {
    const [data, setData] = React.useState<DefaultDataProps>();

    React.useEffect(() => {
        const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S');

        dataIngestionRequest
            .post(ENDPOINTS.PRIVATE.OANDA_FX_HISTORICAL_ENDPOINT, {
                symbol: props.forexPair,
                period: '1M_S',
            })
            .then(data => {
                setData({
                    id: props.forexPair,
                    name: props.forexPair,
                    parent: true,
                    dataX: data.data.data.map((d: any) => parseTime(d.date)),
                    dataY: data.data.data.map((d: any) => d.mid_close),
                    color: 'white',
                    type: 'pureLine',
                });
            });
    }, []);

    return (
        <TableCellWrapper>
            {data ? (
                <BaseLineChart
                    baseId={`${props.forexPair}_historicalChart`}
                    defaultData={data}
                    width={100}
                    height={30}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                />
            ) : null}
        </TableCellWrapper>
    );
}
