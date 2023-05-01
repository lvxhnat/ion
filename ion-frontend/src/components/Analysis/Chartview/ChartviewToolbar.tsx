import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';
import { TbMathIntegralX } from 'react-icons/tb';
import { FaChartArea, FaChartLine } from 'react-icons/fa';

import { useThemeStore } from 'store/theme';
import { useChartStore, useTickerDataStore } from 'store/prices/watchlist';

import { ColorsEnum } from 'common/theme';
import { TickerSearch } from 'components/Search/Search';
import { LabPopup } from './ChartviewLabPopup';
import { ChartTypes } from 'components/Charting/BaseChart/type';

const ModifiedStudiesButton = (props: { [others: string]: any }) => {
    return (
        <S.ButtonWrapper {...props}>
            <TbMathIntegralX />
            <Typography variant="subtitle2"> Studies </Typography>
        </S.ButtonWrapper>
    );
};

const ChartTypeButton = (props: { 
    baseId: string;
    ticker: string;
    chartType: ChartTypes;
}) => {

    const [showArea, setShowArea] = React.useState<boolean>(false);
    const [chart, setChart] = useChartStore(state => [state.charts[props.ticker], state.setChart]);

    const handleClick = () => {
        setShowArea(!showArea)
        setChart({
            ticker: props.ticker, 
            chart: {
                color: chart.color, 
                type: (!showArea) ? 'area' : 'line',
            }
        })
    }

    return (
        <S.ButtonWrapper onClick={handleClick} {...props}>
            {showArea ? <FaChartArea /> : <FaChartLine />}
        </S.ButtonWrapper>
    )
}

export default function ChartviewToolbar(props: {
    baseId: string;
    ticker: string | undefined;
    assetType: string | undefined;
}) {
    const { mode } = useThemeStore();
    const data = useTickerDataStore(state => state.data);
    const [showLab, setShowLab] = React.useState<boolean>(false);

    return (
        <div
            style={{
                width: '100%',
                backgroundColor: mode === 'dark' ? ColorsEnum.warmgray1 : ColorsEnum.coolgray4,
                padding: '1px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {props.ticker ? (
                <LabPopup
                    baseId={props.baseId}
                    show={showLab}
                    setShow={setShowLab}
                    ticker={props.ticker}
                />
            ) : undefined}
            <TickerSearch selectedTicker={props.ticker} />
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 10,
                    paddingLeft: 10,
                }}
            >
                {props.ticker && props.assetType && data[props.ticker] ? (
                    <>
                        <Typography
                            variant="subtitle2"
                            component="div"
                            style={{
                                backgroundColor: ColorsEnum.warmgray2,
                                borderRadius: 5,
                                paddingLeft: 5,
                                paddingRight: 5,
                            }}
                        >
                            {props.assetType?.charAt(0).toUpperCase() + props.assetType?.slice(1)}
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            {props.ticker}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            style={{
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                        >
                            {data[props.ticker].dataY[data[props.ticker].dataY.length - 1].toFixed(
                                2
                            )}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            style={{
                                color:
                                    data[props.ticker].dataY[data[props.ticker].dataY.length - 1] >
                                    data[props.ticker].dataY[data[props.ticker].dataY.length - 2]
                                        ? ColorsEnum.upHint
                                        : ColorsEnum.downHint,
                            }}
                        >
                            {(
                                (100 *
                                    (data[props.ticker].dataY[data[props.ticker].dataY.length - 1] -
                                        data[props.ticker].dataY[
                                            data[props.ticker].dataY.length - 2
                                        ])) /
                                data[props.ticker].dataY[data[props.ticker].dataY.length - 2]
                            ).toFixed(2)}
                            %
                        </Typography>
                    </>
                ) : undefined}
            </div>
            <div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                {props.ticker ? <ChartTypeButton ticker={props.ticker} baseId={props.baseId} chartType='area'/> : undefined}
                <ModifiedStudiesButton onClick={() => setShowLab(true)} />
            </div>
        </div>
    );
}
