import * as React from 'react';
import * as S from './style';

import HelpIcon from '@mui/icons-material/Help';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import EqualizerIcon from '@mui/icons-material/Equalizer';

import { TbMathIntegralX } from 'react-icons/tb';

import { ColorsEnum } from 'common/theme';
import {
    MetricCalculableFields,
    TickerMetricStoreFormat,
    useMetricStore,
    useTickerDataStore,
} from 'store/prices/watchlist';
import { useThemeStore } from 'store/theme';
import { TickerSearch } from 'components/Search/Search';
import { removeLine } from 'components/Charting/BaseChart/plugins/addLine/addLine';
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
    const addMetric = useMetricStore(state => state.addMetric);

    const windowSize = 9;
    const indicatorId = `${props.indicator}_${windowSize}`;

    return (
        <S.LabContainerMetricTableRow
            onClick={() => {
                const movingAverage: number[] = technicalIndicators[props.indicator](
                    data[props.ticker].dataY
                );
                addMetric({
                    ticker: props.ticker,
                    value: {
                        metric: indicatorId,
                        field: 'price',
                        value: movingAverage,
                    },
                });
            }}
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
const LabPopupStrategyRow = (props: {
    baseId: string;
    ticker: string;
    fieldType: MetricCalculableFields;
}) => {
    const [metrics, removeMetric] = useMetricStore(state => [
        state.metrics[props.ticker],
        state.removeMetric,
    ]);

    return (
        <S.LabPopupStrategyRow>
            <S.LabPopupStrategyRowCell header style={{ width: '20%' }}>
                <Typography variant="subtitle2">
                    {props.fieldType.charAt(0).toUpperCase() + props.fieldType.slice(1)}
                </Typography>
            </S.LabPopupStrategyRowCell>
            {metrics && metrics.length !== 0 ? (
                metrics.map((entry: TickerMetricStoreFormat) => {
                    const indicatorId: string = entry.metric;
                    return (
                        <React.Fragment key={`${indicatorId}_labPopupStrategyRow`}>
                            <S.LabPopupStrategyRowCell
                                style={{ width: '60%', justifyContent: 'flex-start' }}
                            >
                                <Typography variant="subtitle2">
                                    {entry.field === props.fieldType ? indicatorId : null}
                                </Typography>
                            </S.LabPopupStrategyRowCell>
                            <S.LabPopupStrategyRowCell
                                style={{ width: '20%', justifyContent: 'flex-end' }}
                            >
                                {entry.field === props.fieldType ? (
                                    <S.CloseIconWrapper
                                        onClick={() => {
                                            removeMetric({
                                                ticker: props.ticker,
                                                metric: indicatorId,
                                            });
                                            removeLine({
                                                baseId: props.baseId,
                                                id: indicatorId,
                                            });
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </S.CloseIconWrapper>
                                ) : null}
                            </S.LabPopupStrategyRowCell>
                        </React.Fragment>
                    );
                })
            ) : (
                <S.LabPopupStrategyRowCell style={{ width: '80%' }} />
            )}
        </S.LabPopupStrategyRow>
    );
};

const LabPopup = (props: {
    baseId: string;
    ticker: string;
    show: boolean;
    setShow: (show: boolean) => void;
}) => {
    const [showCancel, setShowCancel] = React.useState<boolean>(false);

    return (
        <div
            style={{
                display: props.show ? 'block' : 'none',
                position: 'absolute',
                margin: '0 auto',
                top: '25%',
                width: 'calc(550px + 5vw)',
                height: 'calc(350px + 5vh)',
                maxWidth: 700,
                maxHeight: 450,
                borderRadius: 10,
                backgroundColor: ColorsEnum.black,
            }}
        >
            <S.LabPopupContainerWrapper>
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
            </S.LabPopupContainerWrapper>

            <div style={{ display: 'flex', maxHeight: 500, overflowY: 'hidden' }}>
                <S.LabPopupMetricsTableWrapper>
                    {Object.keys(technicalIndicators).map((indicator: string) => (
                        <LabPopupMetricRow
                            key={`${props.ticker}_${indicator}_labPopupMetricRow`}
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
                    <LabPopupStrategyRow
                        baseId={props.baseId}
                        ticker={props.ticker}
                        fieldType="price"
                    />
                    <LabPopupStrategyRow
                        baseId={props.baseId}
                        ticker={props.ticker}
                        fieldType="volume"
                    />
                    <LabPopupStrategyRow
                        baseId={props.baseId}
                        ticker={props.ticker}
                        fieldType="lower"
                    />
                </div>
            </div>
        </div>
    );
};

export default function ChartviewToolbar(props: { ticker: string | undefined; baseId: string }) {
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
            <div></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <ModifiedStudiesButton onClick={() => setShowLab(true)} />
            </div>
        </div>
    );
}
