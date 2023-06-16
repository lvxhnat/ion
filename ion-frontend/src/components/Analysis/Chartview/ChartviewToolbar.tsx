import * as React from 'react';
import * as S from './style';

import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { TbMathIntegralX, TbClick } from 'react-icons/tb';
import { FaChartArea, FaChartLine, FaBroom } from 'react-icons/fa';
import { MdDraw, MdCancel, MdOutlineUndo, MdOutlineBackupTable } from 'react-icons/md';

import { useThemeStore } from 'store/theme';
import { useChartStore, useMetricStore, useTickerDataStore } from 'store/chartview/chartview';

import ChartviewLabPopup from './ChartviewLabPopup';
import { ColorsEnum } from 'common/theme';
import { TickerSearch } from 'components/Search/Search';
import { removeLine } from 'components/Charting/BaseChart/plugins/editChart/removeLine';
import { CHARTIDS } from 'components/Charting/BaseChart/config';
import { useBaseChartStore } from 'store/chartview/basechart';
import { getChartviewBaseChartId } from './Chartview';
import { addChart } from 'components/Charting/BaseChart/actions';
import { addLineTracker } from 'components/Charting/BaseChart/plugins';
import { useNavigate } from 'react-router-dom';
import { ASSET_TYPES, ROUTES } from 'common/constant';
import { TickerMetadataDTO } from 'endpoints/clients/database/postgres/ticker';

const DrawLinesButton = (props: { ticker: string; baseId: string }) => {
    const [menu, setMenu] = React.useState<boolean>(false);
    const [charts, setChart] = useChartStore(state => [state.charts, state.setChart]);
    const metrics = useMetricStore(state => state.metrics)[props.ticker];
    const baseChartStoreState = useBaseChartStore(state => state.charts)[props.baseId];

    const ticker = props.ticker;

    if (charts[ticker])
        return (
            <div>
                <S.ButtonWrapper onClick={() => setMenu(!menu)}>
                    {charts[ticker].draw ? <MdDraw /> : <TbClick />}
                    <Typography variant="subtitle2">
                        {charts[ticker].draw ? 'Drawing' : 'Draw'}
                    </Typography>
                </S.ButtonWrapper>
                <div
                    style={{
                        zIndex: 10,
                        position: 'absolute',
                        display: menu ? 'block' : 'none',
                    }}
                >
                    <S.FlexRow
                        alternate
                        onClick={() => {
                            setChart({
                                ticker: ticker,
                                chart: {
                                    ...charts[ticker],
                                    draw: !charts[ticker].draw,
                                },
                            });
                            if (baseChartStoreState) {
                                const { x, y } = baseChartStoreState;
                                addLineTracker({
                                    x: x,
                                    y: y,
                                    ticker: ticker,
                                    baseId: props.baseId,
                                    metrics: metrics,
                                    draw: !charts[ticker].draw,
                                });
                                setMenu(false);
                            }
                        }}
                    >
                        {charts[ticker].draw ? (
                            <>
                                <MdCancel />
                                <Typography variant="subtitle2">Disable Draw</Typography>
                            </>
                        ) : (
                            <>
                                <MdDraw />
                                <Typography variant="subtitle2">Draw Line</Typography>
                            </>
                        )}
                    </S.FlexRow>
                    <S.FlexRow
                        onClick={() => {
                            removeLine({
                                baseId: props.baseId,
                                class: CHARTIDS.DRAW_LINE_CLASS,
                            });
                            setMenu(false);
                        }}
                    >
                        {' '}
                        <MdOutlineUndo /> <Typography variant="subtitle2">
                            Undo Draw
                        </Typography>{' '}
                    </S.FlexRow>
                    <S.FlexRow
                        alternate
                        onClick={() => {
                            removeLine({
                                baseId: props.baseId,
                                class: CHARTIDS.DRAW_LINE_CLASS,
                                selectAll: true,
                            });
                            setMenu(false);
                        }}
                    >
                        {' '}
                        <FaBroom /> <Typography variant="subtitle2">Clean Lines</Typography>{' '}
                    </S.FlexRow>
                </div>
            </div>
        );
    else return <div></div>;
};

const ModifiedStudiesButton = (props: { [others: string]: any }) => {
    return (
        <S.ButtonWrapper {...props}>
            <TbMathIntegralX />
            <Typography variant="subtitle2"> Studies </Typography>
        </S.ButtonWrapper>
    );
};

const ChartTypeButton = (props: { baseId: string; ticker: string }) => {
    const [showArea, setShowArea] = React.useState<boolean>(false);
    const [chart, setChart] = useChartStore(state => [state.charts[props.ticker], state.setChart]);

    const data = useTickerDataStore(state => state.data)[props.ticker];
    const baseChartStoreState = useBaseChartStore(state => state.charts)[props.baseId];

    const handleClick = () => {
        if (baseChartStoreState) {
            const { x, y, dataX } = baseChartStoreState;
            const chartType = !showArea ? 'area' : 'line';
            setShowArea(!showArea);
            setChart({
                ticker: props.ticker,
                chart: {
                    color: chart.color,
                    type: chartType,
                },
            });
            const baseId = getChartviewBaseChartId(props.ticker);
            removeLine({ baseId: baseId, id: data.id, selectAll: true });
            addChart({
                x: x,
                y: y,
                id: data.id,
                baseId: baseId,
                type: chartType,
                color: 'white',
                dataX: dataX,
                dataY: data.dataY,
            });
        }
    };

    return (
        <S.ButtonWrapper onClick={handleClick} {...props}>
            {showArea ? (
                <>
                    <FaChartArea />
                    <Typography variant="subtitle2"> Area </Typography>
                </>
            ) : (
                <>
                    <FaChartLine />
                    <Typography variant="subtitle2"> Line </Typography>
                </>
            )}
        </S.ButtonWrapper>
    );
};

export default function ChartviewToolbar(props: {
    baseId: string;
    showSidebar: boolean;
    tickerMetadata: TickerMetadataDTO;
    setShowSidebar: (show: boolean) => void;
}) {
    const { mode } = useThemeStore();
    const data = useTickerDataStore(state => state.data);
    const [showLab, setShowLab] = React.useState<boolean>(false);

    const ticker = props.tickerMetadata.symbol;
    const assetType = props.tickerMetadata.asset_class;
    const tickerName = props.tickerMetadata.name;

    const navigate = useNavigate();

    let absoluteChange: number | null = null;
    let pctChange: number | null = null;
    let changeColor: string = 'white';
    if (ticker && data[ticker] && data[ticker].dataY) {
        absoluteChange =
            data[ticker].dataY[data[ticker].dataY.length - 1] -
            data[ticker].dataY[data[ticker].dataY.length - 2];
        pctChange = (100 * absoluteChange) / data[ticker].dataY[data[ticker].dataY.length - 2];
        changeColor =
            data[ticker].dataY[data[ticker].dataY.length - 1] >
            data[ticker].dataY[data[ticker].dataY.length - 2]
                ? ColorsEnum.upHint
                : ColorsEnum.downHint;
    }
    let decimalPoints = 2;
    if (absoluteChange && Math.abs(absoluteChange) < 0.1) decimalPoints = 5;

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
            {props.tickerMetadata ? (
                <TickerSearch
                    tickerMetadata={props.tickerMetadata}
                    setSelectedOption={(ticker: string, asset_type: string) =>
                        navigate(
                            `${ROUTES.PUBLIC.SECURITIES}/${asset_type.toLowerCase()}/${ticker}`
                        )
                    }
                />
            ) : null}
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
                {ticker && assetType && data[ticker] ? (
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
                            {assetType?.charAt(0).toUpperCase() + assetType?.slice(1)}
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            {tickerName}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            style={{ color: 'white', fontWeight: 'bold' }}
                        >
                            {data[ticker].dataY[data[ticker].dataY.length - 1].toFixed(
                                decimalPoints
                            )}
                        </Typography>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <S.ChangeRows style={{ color: changeColor }}>
                                {absoluteChange?.toFixed(decimalPoints)}
                            </S.ChangeRows>
                            <S.ChangeRows style={{ color: changeColor }}>
                                {pctChange?.toFixed(2)}%
                            </S.ChangeRows>
                        </div>
                    </>
                ) : undefined}
            </div>
            <div></div>
            <div
                style={{
                    gap: 2,
                    padding: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                {ticker ? (
                    <>
                        <Tooltip title="Show Side Table" followCursor>
                            <S.ButtonWrapper
                                style={{
                                    backgroundColor: props.showSidebar
                                        ? ColorsEnum.darkGrey
                                        : ColorsEnum.warmgray2,
                                }}
                                onClick={() => props.setShowSidebar(!props.showSidebar)}
                            >
                                <MdOutlineBackupTable />
                            </S.ButtonWrapper>
                        </Tooltip>
                        <ChartTypeButton ticker={ticker} baseId={props.baseId} />
                        <DrawLinesButton ticker={ticker} baseId={props.baseId} />
                        <ModifiedStudiesButton onClick={() => setShowLab(true)} />
                    </>
                ) : undefined}
            </div>
            {ticker ? (
                <ChartviewLabPopup
                    baseId={props.baseId}
                    show={showLab}
                    setShow={setShowLab}
                    ticker={ticker}
                />
            ) : undefined}
        </div>
    );
}
