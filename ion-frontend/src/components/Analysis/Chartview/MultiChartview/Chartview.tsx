import * as React from 'react';
import * as S from '../style';

import { ChartviewProps } from '../type';
import { fetchData } from '../general/endpoints';

import { useTickerDataStore } from 'store/chartview/chartview';
import { getChartviewBaseChartId } from 'common/constant/ids';

import BaseLineChart from 'components/Charting/BaseChart';
import ChartviewSidePanel from './ChartviewSidePanel';

export default function Chartview(props: ChartviewProps) {
    const [data, setData] = useTickerDataStore(state => [state.data, state.setData]);

    React.useEffect(() => {
        if (props.assetType && props.ticker && !data[props.ticker]) {
            fetchData(props.assetType, props.ticker.toUpperCase(), new Date('2022-01-01')).then(
                (res: any) => setData(res.data)
            );
        }
    }, []);

    return (
        <S.Item>
            <S.MutliCharviewPanel>
                <S.MutliCharviewLeftSidebar>
                    {props.ticker && data[props.ticker] ? (
                        <BaseLineChart
                            showAxis
                            showGrid
                            normalise
                            showAverage
                            showTooltip
                            showEndTags
                            baseId={`${getChartviewBaseChartId(props.ticker)}`}
                            defaultData={data[props.ticker]}
                        />
                    ) : null}
                </S.MutliCharviewLeftSidebar>
                <S.MutliCharviewRightSidebar>
                    <ChartviewSidePanel {...props} />
                </S.MutliCharviewRightSidebar>
            </S.MutliCharviewPanel>
        </S.Item>
    );
}
