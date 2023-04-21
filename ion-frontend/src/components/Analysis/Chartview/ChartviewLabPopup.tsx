import * as React from 'react';
import * as S from './style';

import HelpIcon from '@mui/icons-material/Help';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import EqualizerIcon from '@mui/icons-material/Equalizer';

import { ColorsEnum } from 'common/theme';
import {
    MetricCalculableFields,
    TickerMetricStoreFormat,
    useLiveMovesStore,
    useMetricStore,
    useTickerDataStore,
} from 'store/prices/watchlist';
import { removeLine } from 'components/Charting/BaseChart/plugins/addLine/addLine';
import { technicalIndicators, technicalIndicatorsParams } from './calculations/metrics';

const LabPopupMetricParams = (props: {ticker: string}) => {
    
    const [selectedMetricId, metrics] = useMetricStore(state => [state.selectedMetricId, state.metrics])
    const [view, setView] = React.useState<any>({});

    React.useEffect(() => {
        if (selectedMetricId && metrics[props.ticker]) {
            const availableMetrics = metrics[props.ticker].filter(entry => entry.metric === selectedMetricId)[0]
            if (availableMetrics) {
                setView(availableMetrics.metricParams);
            } else {
                setView({})
            }
        }
    }, [selectedMetricId])
    
    return (
        <>
            {
                (view) ? 
                    Object.keys(view).map((indicator: string) => {
                        return (
                            <div key={`LabPopupMetricParams_${indicator}`}>
                                {indicator} : {view[indicator]}
                            </div>
                        )
                    })
                 : null
            }
        </>
    )
}

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
                const movingAverage: number[] = technicalIndicators[props.indicator]({
                    arr: data[props.ticker].dataY
                });
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
    const removeLiveMovesMetric = useLiveMovesStore(state => state.removeLiveMovesMetric);
    const setselectedMetricId = useMetricStore(state => state.setselectedMetricId);

    return (
        <>
            {metrics && metrics.length !== 0 ? (
                metrics.map((entry: TickerMetricStoreFormat) => {
                    const indicatorId: string = entry.metric;
                    return entry.field === props.fieldType ? (
                        <S.LabPopupStrategyRow 
                            key={`${entry.field}_${entry.metric}`} 
                            onClick={() => setselectedMetricId({ metric: indicatorId })}
                        >
                            <S.LabPopupStrategyRowCell header style={{ width: '20%' }}>
                                <Typography variant="subtitle2">
                                    {props.fieldType.charAt(0).toUpperCase() +
                                        props.fieldType.slice(1)}
                                </Typography>
                            </S.LabPopupStrategyRowCell>
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
                                                const removeProps = {
                                                    ticker: props.ticker,
                                                    metric: indicatorId,
                                                };
                                                setselectedMetricId({ metric: "" })
                                                removeMetric(removeProps);
                                                removeLiveMovesMetric(removeProps);
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
                        </S.LabPopupStrategyRow>
                    ) : (
                        undefined
                    );
                })
            ) : (
                <S.LabPopupStrategyRowCell style={{ width: '80%' }} />
            )}
        </>
    );
};

export function LabPopup(props: {
    baseId: string;
    ticker: string;
    show: boolean;
    setShow: (show: boolean) => void;
}) {
    const [showCancel, setShowCancel] = React.useState<boolean>(false);

    return (
        <div
            style={{
                display: props.show ? 'block' : 'none',
                position: 'absolute',
                margin: '0 auto',
                top: '25%',
                width: 'calc(650px + 5vw)',
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
                <div style={{ width: '40%' }}>
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
                <div style={{ width: '30%' }}>
                    <LabPopupMetricParams ticker={props.ticker}/> 
                </div>
            </div>
            <div style={{ width: "100%", bottom: 0, position: 'absolute', backgroundColor: ColorsEnum.darkGrey, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
            </div>
        </div>
    );
};