import * as React from 'react';
import * as S from '../style';

import { TickerSearch } from 'components/Search/Search';
import { ChartviewProps } from '../type';
import { useBaseChartStore } from 'store/chartview/basechart';
import { ASSET_TYPES } from 'common/constant';
import { addChart } from 'components/Charting/BaseChart/actions';
import { getChartviewBaseChartId } from 'common/constant/ids';
import { fetchData, fetchMetadata } from '../general/endpoints';
import { stringToColour } from 'common/helper/general';
import { Typography } from '@mui/material';
import { TickerMetadataDTO } from 'endpoints/clients/database/postgres/query';
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri';

const HandleHideChart = () => {};

export default function ChartviewSidePanel(props: ChartviewProps) {
    const [charts, addChartPlot] = useBaseChartStore(state => [state.charts, state.addChartPlot]);
    const [tickerMetadata, setTickerMetadata] = React.useState<{
        [ticker: string]: TickerMetadataDTO;
    }>({});

    const handleTickerSearchSelect = (ticker: string, assetType: keyof typeof ASSET_TYPES) => {
        const newTickerId = getChartviewBaseChartId(ticker);
        const chartColor = stringToColour(newTickerId);

        addChartPlot({
            parentTicker: props.ticker!,
            plot: {
                baseId: newTickerId,
                ticker: ticker,
                color: chartColor,
                type: 'line',
            },
        });

        if (props.ticker && charts[props.ticker]) {
            fetchData(assetType, ticker, new Date('2022-01-01')).then((res: any) => {
                addChart({
                    id: newTickerId,
                    baseId: getChartviewBaseChartId(props.ticker),
                    x: charts[props.ticker!].x,
                    y: charts[props.ticker!].y,
                    dataX: charts[props.ticker!].dataX,
                    dataY: res.data.data.dataY,
                    color: chartColor,
                    type: 'line',
                    normalise: true,
                    showEndTags: true,
                });
            });

            fetchMetadata(ticker, assetType).then(res => {
                setTickerMetadata({ ...tickerMetadata, [ticker]: res.data });
            });
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <S.TickerSearchWrapper>
                <TickerSearch
                    setSelectedOption={(ticker, assetType, _) =>
                        handleTickerSearchSelect(ticker, assetType)
                    }
                />
            </S.TickerSearchWrapper>
            <S.LineInfoTable>
                {charts[props.ticker!]
                    ? charts[props.ticker!].plots.map(entry => {
                          return (
                              <S.LineInfoRow key={`${props.ticker}_${entry.ticker}`}>
                                  <S.ColoredBox style={{ backgroundColor: entry.color }} />
                                  <Typography variant="subtitle2">{entry.ticker}</Typography>
                                  <Typography variant="subtitle2">
                                      {tickerMetadata[entry.ticker]
                                          ? tickerMetadata[entry.ticker].name
                                          : null}
                                  </Typography>
                              </S.LineInfoRow>
                          );
                      })
                    : null}
            </S.LineInfoTable>
        </div>
    );
}
