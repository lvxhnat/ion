import * as React from 'react';
import * as S from './style';

import HelpIcon from '@mui/icons-material/Help';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import EqualizerIcon from '@mui/icons-material/Equalizer';

import { ColorsEnum } from 'common/theme';
import {
    MetricCalculableFields,
    TechnicalIndicatorsKeys,
    TickerMetricStoreFormat,
    useLiveMovesStore,
    useMetricStore,
    useTickerDataStore,
} from 'store/prices/watchlist';
import { removeLine } from 'components/Charting/BaseChart/plugins/addLine/addLine';
import {
    getIndicatorIdFromMetric,
    getIndicatorMetricFromId,
    technicalIndicators,
} from './calculations/metrics';
import NumericChoice from './choice/numericchoice';
import PopupButton from 'components/Button';
import { DefaultDataProps } from 'components/Charting/BaseChart/schema/schema';
import { MovingAverageProps } from './calculations/schemas/props/schema';
import { stringToColour } from 'common/helper/general';
import Select from 'components/Select';
import OptionChoice from './choice/optionchoice';

/**
 * Generates the Right-most Panel shown on the Lab Popup, allowing users to modify the parameters of the functions used to calculate the time series.
 * @param props
 * @returns
 */
const LabPopupMetricParams = (props: { ticker: string }) => {
    const tickerData: DefaultDataProps = useTickerDataStore(state => state.data[props.ticker]);
    const [selectedMetricId, metrics, setMetric] = useMetricStore(state => [
        state.selectedMetricId,
        state.metrics,
        state.setMetric,
    ]);
    const [view, setView] = React.useState<TickerMetricStoreFormat>();

    React.useEffect(() => {
        if (selectedMetricId && metrics[props.ticker]) {
            const tickerView = metrics[props.ticker].filter(entry => entry.metricId === selectedMetricId)[0];
            // Theres no need to deep copy here as metricParams may not be present. Only once the metric is added, will there be metricParams.
            setView({...tickerView } ?? {});
        }
    }, [selectedMetricId, metrics]);

    const handleApplyClick = () => {
        if (view) {
            const metricId = getIndicatorIdFromMetric(props.ticker, view.metric, view.metricParams);
            setMetric({
                ticker: props.ticker,
                replacementId: view.metricId,
                value: {
                    metric: view.metric,
                    field: view.field,
                    metricId: metricId,
                    color: stringToColour(metricId),
                    metricParams: { ...view.metricParams },
                    value: getIndicatorMetricFromId(view.metric)({
                        arr: tickerData.dataY,
                        ...view.metricParams,
                    }),
                },
            });
        }
    };

    const handleResetClick = () => {
        const tickerView = metrics[props.ticker].filter(entry => entry.metricId === selectedMetricId)[0];
        setView({...tickerView, metricParams: {...tickerView.metricParams} } ?? {});
    };

    return (
        <div
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
            {view && view.metricParams
                ? Object.keys(view.metricParams).map((indicator: string) => {
                    const indicatorSchema = technicalIndicators[view.metric].schema[indicator]
                    if (indicatorSchema.type === 'integer') {
                        return (
                            <NumericChoice
                                key={`${indicator}_${props.ticker}`}
                                label={indicator}
                                min={indicatorSchema.format[0]}
                                max={indicatorSchema.format[1]}
                                value={view.metricParams[indicator as keyof MovingAverageProps]}
                                onChange={(event: any) => {
                                    view.metricParams[indicator as keyof MovingAverageProps] =
                                        event.target.value;
                                    setView(view);
                                }}
                            />
                        );
                    } else if (indicatorSchema.type === 'float') {
                        const diff = ((+indicatorSchema.format[1] - +indicatorSchema.format[0])/100).toString()
                        const step = 1/(10 ** (diff.length - (diff.indexOf(".") + 1)))
                        return (
                            <NumericChoice
                                key={`${indicator}_${props.ticker}`}
                                label={indicator}
                                step={step}
                                min={indicatorSchema.format[0]}
                                max={indicatorSchema.format[1]}
                                value={view.metricParams[indicator as keyof MovingAverageProps]}
                                onChange={(event: any) => {
                                    view.metricParams[indicator as keyof MovingAverageProps] =
                                        event.target.value;
                                    setView(view);
                                }}
                            />
                        );
                    } else {
                        return (
                            <OptionChoice 
                                label={indicator}
                                key={`${indicator}_${props.ticker}`}
                                value={view.metricParams[indicator as keyof MovingAverageProps]?.toString()}
                                options={indicatorSchema.format}
                                onChange={(event: any) => {
                                    view.metricParams[indicator as keyof MovingAverageProps] =
                                        event.target.value;
                                    setView(view);
                                }}
                            />
                        )
                    }
                  })
                : null}
            <S.BottomToolbar style={{ borderBottomLeftRadius: 0 }}>
                <PopupButton buttonType="secondary" onClick={handleResetClick}>
                    Reset
                </PopupButton>
                <PopupButton buttonType="primary" onClick={handleApplyClick}>
                    Apply
                </PopupButton>
            </S.BottomToolbar>
        </div>
    );
};

/**
 * This component represents the left most panel, for a row in the metric table that can be used to add metrics into the chart.
 * @param props
 * @returns
 */
const LabPopupMetricRow = (props: {
    baseId: string;
    ticker: string;
    metric: TechnicalIndicatorsKeys;
}) => {
    const data = useTickerDataStore(state => state.data);
    const addMetric = useMetricStore(state => state.addMetric);

    const addMetricToStrategy = (): void => {
        const defaultParams = { ...technicalIndicators[props.metric].defaultParams };
        const movingAverage: number[] = technicalIndicators[props.metric].function({
            arr: data[props.ticker].dataY,
            ...defaultParams,
        });
        const metricId = getIndicatorIdFromMetric(props.ticker, props.metric, defaultParams);
        addMetric({
            ticker: props.ticker,
            value: {
                field: 'price',
                value: movingAverage,
                metric: props.metric,
                metricParams: defaultParams,
                color: stringToColour(metricId),
                metricId: metricId,
            },
        });
    };

    return (
        <S.LabContainerMetricTableRow onClick={addMetricToStrategy}>
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
                <Typography variant="subtitle2">{props.metric}</Typography>
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
 * This component represents the metrics that have currently been added into the chart, or the component in the middle panel.
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
                    const indicatorId = entry.metricId;
                    const formattedIndicatorString = `${
                        technicalIndicators[entry.metric].shortName
                    }(${Object.values(entry.metricParams).join(', ')})`;
                    return entry.field === props.fieldType ? (
                        <S.LabPopupStrategyRow
                            key={`${entry.metricId}_LabPopupStrategyRow`}
                            onClick={() => setselectedMetricId({ metric: indicatorId })}
                        >
                            <S.LabPopupStrategyRowCell header style={{ width: '20%' }}>
                                <Typography variant="subtitle2">
                                    {props.fieldType.charAt(0).toUpperCase() +
                                        props.fieldType.slice(1)}
                                </Typography>
                            </S.LabPopupStrategyRowCell>
                            <React.Fragment key={`${entry.metricId}_LabPopupStrategyRowCell`}>
                                <S.LabPopupStrategyRowCell
                                    style={{ width: '65%', justifyContent: 'flex-start' }}
                                >
                                    <Typography variant="subtitle2" noWrap>
                                        {entry.field === props.fieldType
                                            ? formattedIndicatorString
                                            : null}
                                    </Typography>
                                </S.LabPopupStrategyRowCell>
                                <S.LabPopupStrategyRowCell
                                    style={{ width: '15%', justifyContent: 'flex-end' }}
                                >
                                    {entry.field === props.fieldType ? (
                                        <S.CloseIconWrapper
                                            onClick={() => {
                                                const removeProps = {
                                                    ticker: props.ticker,
                                                    metricId: entry.metricId,
                                                };
                                                setselectedMetricId({ metric: '' });
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
                    ) : undefined;
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
        <S.PopupContainer show={props.show}>
            <S.LabPopupHeaderWrapper>
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
            </S.LabPopupHeaderWrapper>
            <div style={{ display: 'flex', overflowY: 'hidden', flexGrow: 1 }}>
                <S.LabPopupMetricsTableWrapper>
                    {Object.keys(technicalIndicators).map((metric: TechnicalIndicatorsKeys) => (
                        <LabPopupMetricRow
                            key={`${props.ticker}_${metric}_labPopupMetricRow`}
                            ticker={props.ticker}
                            baseId={props.baseId}
                            metric={metric}
                        />
                    ))}
                </S.LabPopupMetricsTableWrapper>
                <div style={{ width: '40%' }}>
                    <S.PopupSubHeader>
                        <Typography variant="subtitle2"> Added studies and strategies </Typography>
                    </S.PopupSubHeader>
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
                <div style={{ width: '30%', display: 'flex', flexDirection: 'column' }}>
                    <S.PopupSubHeader style={{ backgroundColor: ColorsEnum.darkGrey }}>
                        <Typography variant="subtitle2"> Inputs and Options </Typography>
                    </S.PopupSubHeader>
                    <LabPopupMetricParams ticker={props.ticker} />
                </div>
            </div>
        </S.PopupContainer>
    );
}
