import * as React from 'react';
import * as S from './style';

import HelpIcon from '@mui/icons-material/Help';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import EqualizerIcon from '@mui/icons-material/Equalizer';

import { TbMathIntegralX } from 'react-icons/tb';

import { ColorsEnum } from 'common/theme';
import {
    AllowedMetricCategories,
    useMetricStore,
    useTickerDataStore,
} from 'store/prices/watchlist';
import { useThemeStore } from 'store/theme';
import { TickerSearch } from 'components/Search/Search';
import { technicalIndicators } from './calculations/metrics';

const ModifiedStudiesButton = (props: { [others: string]: any }) => {
    return (
        <S.ButtonWrapper {...props}>
            <TbMathIntegralX />
            <Typography variant="subtitle2"> Studies </Typography>
        </S.ButtonWrapper>
    );
};

/**
 * This component represents a row in the metric table that can be used to add metrics into the chart.
 * @param props
 * @returns
 */
const LabPopupMetricRow = (props: {
    baseId: string;
    ticker: string;
    indicator: keyof typeof technicalIndicators;
}) => {
    const data = useTickerDataStore(state => state.data);

    return (
        <S.LabContainerMetricTableRow
            onClick={() =>
                technicalIndicators[props.indicator]({
                    baseId: props.baseId,
                    dataX: data[props.ticker].dataX,
                    dataY: data[props.ticker].dataY,
                    window: 9,
                })
            }
        >
            <div
                style={{
                    width: '80%',
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    gap: 5,
                }}
            >
                <EqualizerIcon fontSize="inherit" />
                <Typography variant="subtitle2">{props.indicator}</Typography>
            </div>
            <div
                style={{
                    width: '20%',
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                }}
            >
                <HelpIcon fontSize="inherit" />
            </div>
        </S.LabContainerMetricTableRow>
    );
};

/**
 * This component represents the metrics that have currently been added into the chart
 * @param props
 * @returns
 */
const LabPopupStrategyRow = (props: { ticker: string; metricType: AllowedMetricCategories }) => {
    const metrics = useMetricStore(state => state.metrics)[props.ticker];

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${ColorsEnum.warmgray1}`,
                borderTop: 0,
                borderRight: 0,
            }}
        >
            <S.LabPopupStrategyRow header style={{ width: '20%' }}>
                <Typography variant="subtitle2">
                    {props.metricType.charAt(0).toUpperCase() + props.metricType.slice(1)}
                </Typography>
            </S.LabPopupStrategyRow>
            <S.LabPopupStrategyRow style={{ width: '80%' }}>
                <Typography variant="subtitle2">
                    {metrics ? metrics[props.metricType].join(' *') : null}
                </Typography>
            </S.LabPopupStrategyRow>
        </div>
    );
};

const LabPopup = (props: {
    baseId: string;
    ticker: string;
    show: boolean;
    setShow: (show: boolean) => void;
}) => {
    const [showCancel, setShowCancel] = React.useState<boolean>(false);
    const setMetrics = useMetricStore(state => state.setMetrics);

    React.useEffect(() => {
        setMetrics({ ticker: props.ticker, metrics: null });
    }, []);

    return (
        <div
            style={{
                display: props.show ? 'block' : 'none',
                position: 'absolute',
                marginTop: '5%',
                width: 'calc(550px + 5vw)',
                height: 'calc(350px + 5vh)',
                maxWidth: 700,
                maxHeight: 450,
                borderRadius: 10,
                backgroundColor: ColorsEnum.black,
            }}
        >
            <div
                style={{
                    height: 25,
                    width: '100%',
                    display: 'flex',
                    padding: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    backgroundColor: ColorsEnum.coolgray6,
                    color: ColorsEnum.black,
                }}
            >
                <div style={{ gap: 2, display: 'flex', width: '33%', paddingLeft: 5 }}>
                    <S.LabOpenButtonWrapper
                        onMouseOver={() => setShowCancel(true)}
                        onMouseOut={() => setShowCancel(false)}
                        onClick={() => props.setShow(false)}
                        style={{ backgroundColor: ColorsEnum.coolgray2 }}
                    >
                        <CloseIcon
                            style={{ display: showCancel ? 'block' : 'none' }}
                            fontSize="inherit"
                        />
                    </S.LabOpenButtonWrapper>
                    <S.LabOpenButtonWrapper />
                    <S.LabOpenButtonWrapper />
                </div>
                <div style={{ display: 'flex', width: '67%' }}>
                    <Typography variant="subtitle1" style={{ marginLeft: '10%' }}>
                        Edit Studies and Strategies
                    </Typography>
                </div>
            </div>

            <div style={{ display: 'flex', maxHeight: 500, overflowY: 'hidden' }}>
                <S.LabPopupMetricsTableWrapper>
                    {Object.keys(technicalIndicators).map((indicator: string) => (
                        <LabPopupMetricRow
                            ticker={props.ticker}
                            baseId={props.baseId}
                            indicator={indicator as keyof typeof technicalIndicators}
                        />
                    ))}
                </S.LabPopupMetricsTableWrapper>
                <div style={{ width: '70%' }}>
                    <div
                        style={{
                            backgroundColor: ColorsEnum.warmgray1,
                            padding: 2,
                            paddingLeft: 5,
                        }}
                    >
                        <Typography variant="subtitle2"> Added studies and strategies </Typography>
                    </div>
                    <LabPopupStrategyRow ticker={props.ticker} metricType="price" />
                    <LabPopupStrategyRow ticker={props.ticker} metricType="volume" />
                    <LabPopupStrategyRow ticker={props.ticker} metricType="lower" />
                </div>
            </div>
        </div>
    );
};

export default function ChartviewToolbar(props: { ticker: undefined | string; baseId: string }) {
    const { mode } = useThemeStore();
    const data = useTickerDataStore(state => state.data);
    const [showLab, setShowLab] = React.useState<boolean>(false);

    return (
        <div
            style={{
                width: '100%',
                backgroundColor: mode === 'dark' ? ColorsEnum.warmgray1 : ColorsEnum.coolgray4,
                padding: '2px',
                display: 'flex',
                justifyContent: 'center',
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
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'flex-start',
                }}
            >
                {props.ticker && data[props.ticker] ? (
                    <>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            style={{ paddingLeft: 10, paddingRight: 10 }}
                        >
                            {props.ticker}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            style={{
                                paddingLeft: 10,
                                paddingRight: 10,
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                        >
                            {data[props.ticker].dataY[data[props.ticker].dataY.length - 1].toFixed(
                                2
                            )}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            component="div"
                            style={{
                                paddingLeft: 10,
                                paddingRight: 10,
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <ModifiedStudiesButton onClick={() => setShowLab(true)} />
            </div>
        </div>
    );
}
