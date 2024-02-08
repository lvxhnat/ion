import * as React from 'react';
import * as S from '../style';
import { v4 as uuidv4 } from 'uuid';

import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { TbMathIntegralX, TbClick } from 'react-icons/tb';
import { BiLayerPlus } from 'react-icons/bi';
import { FaChartArea, FaChartLine, FaBroom } from 'react-icons/fa';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { MdDraw, MdCancel, MdOutlineUndo, MdOutlineBackupTable } from 'react-icons/md';

import { useThemeStore } from 'store/theme';
import { useMetricStore, useTickerDataStore } from 'store/chartview/chartview';

import ChartviewLabPopup from './ChartviewLabPopup';
import { ColorsEnum } from 'common/theme';
import { TickerSearch } from 'components/Search/Search';
import { removeChart } from 'components/Charting/BaseChart/actions';
import { CHARTIDS } from 'components/Charting/BaseChart/config';
import { useBaseChartStore } from 'store/chartview/basechart';
import { getChartviewBaseChartId } from 'common/constant/ids';
import { addChart } from 'components/Charting/BaseChart/actions';
import { addLineTracker } from 'components/Charting/BaseChart/plugins';
import { useNavigate } from 'react-router-dom';
import { ASSET_TYPES, ROUTES, SOURCE_TYPES } from 'common/constant';
import { TickerMetadataDTO, getWatchlistAssets } from 'endpoints/clients/database/postgres/query';
import DropdownButton from 'components/Button/DropdownButton';
import DateRangeSelector from 'components/Select/DateRangeSelector/DateRangeSelector';
import { deleteTable, insertTable } from 'endpoints/clients/database/postgres/general';
import { PostgresTablesEnum } from 'endpoints/schema/database/postgres/props';
import { fetchRawData } from '../general/endpoints';

const AddToWatchlist = (props: { ticker: string; assetType: string }) => {
    const [watchlistAdded, setWatchlistAdded] = React.useState<boolean>(false);

    React.useEffect(() => {
        getWatchlistAssets({ symbol: props.ticker }).then(res => {
            setWatchlistAdded(!!res.data);
        });
    }, [props.ticker]);

    const handleWatchlist = () => {
        setWatchlistAdded(!watchlistAdded);
        getWatchlistAssets({ symbol: props.ticker }).then(res => {
            if (!res.data) {
                insertTable({
                    tableName: PostgresTablesEnum.WATCHLIST,
                    entry: {
                        uuid: uuidv4(),
                        symbol: props.ticker,
                        date_added: new Date(),
                        asset_type: props.assetType as keyof typeof ASSET_TYPES,
                        source: SOURCE_TYPES.ALPHAVANTAGE as keyof typeof SOURCE_TYPES,
                    },
                });
            } else {
                deleteTable({
                    tableName: PostgresTablesEnum.WATCHLIST,
                    id: props.ticker,
                });
            }
        });
    };

    return (
        <S.ButtonWrapper onClick={handleWatchlist}>
            {watchlistAdded ? <BsBookmarkFill /> : <BsBookmark />}
        </S.ButtonWrapper>
    );
};

const DrawLinesButton = (props: { ticker: string; baseId: string }) => {
    const [charts, setChart] = useBaseChartStore(state => [state.charts, state.setChartConfigs]);
    const metrics = useMetricStore(state => state.metrics)[props.ticker];

    const handleDrawLine = () => {
        const chartConfigs = charts[props.ticker];
        if (chartConfigs) {
            addLineTracker({
                x: chartConfigs.x,
                y: chartConfigs.y,
                ticker: props.ticker,
                baseId: props.baseId,
                metrics: metrics,
                draw: charts[props.ticker].draw,
            });
            chartConfigs.draw = !chartConfigs.draw;
            setChart({
                ticker: props.ticker,
                configs: chartConfigs,
            });
        }
    };

    const handleUndoDraw = () => {
        removeChart({
            baseId: props.baseId,
            class: CHARTIDS.DRAW_LINE_CLASS,
        });
    };

    const handleCleanLines = () => {
        removeChart({
            baseId: props.baseId,
            class: CHARTIDS.DRAW_LINE_CLASS,
            selectAll: true,
        });
    };

    return (
        <DropdownButton
            options={[
                {
                    children: charts[props.ticker] ? (
                        <>
                            <MdCancel />
                            <Typography variant="subtitle2">Disable Draw</Typography>
                        </>
                    ) : (
                        <>
                            <MdDraw />
                            <Typography variant="subtitle2">Draw Line</Typography>
                        </>
                    ),
                    onClick: handleDrawLine,
                },
                {
                    children: (
                        <>
                            <MdOutlineUndo /> <Typography variant="subtitle2">Undo Draw</Typography>
                        </>
                    ),
                    onClick: handleUndoDraw,
                },
                {
                    children: (
                        <>
                            <FaBroom /> <Typography variant="subtitle2">Clean Lines</Typography>
                        </>
                    ),
                    onClick: handleCleanLines,
                },
            ]}
            children={
                <>
                    {charts[props.ticker] ? <MdDraw /> : <TbClick />}
                    <Typography variant="subtitle2">
                        {charts[props.ticker] ? 'Drawing' : 'Draw'}
                    </Typography>
                </>
            }
        />
    );
};

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
    assetType: keyof typeof ASSET_TYPES;
}) => {
    const [OHLCAvail, setOHLCAvail] = React.useState<boolean>(false);
    const [OHLCData, setOHLCData] = React.useState<
        { open: number; high: number; low: number; close: number }[]
    >([]);
    const [OHLCSelect, setOHLCSelect] = React.useState<boolean>(false);
    const [chart, setChart] = useBaseChartStore(state => [state.charts, state.setChartConfigs]);

    const data = useTickerDataStore(state => state.data)[props.ticker];

    React.useEffect(() => {
        fetchRawData(props.assetType, props.ticker, new Date('2022-01-01'))?.then((res: any) => {
            if ('open' in res.data[0]) {
                setOHLCAvail(true);
                setOHLCData(
                    res.data.map((entry: any) => {
                        return {
                            open: entry.open,
                            high: entry.high,
                            low: entry.low,
                            close: entry.close,
                        };
                    })
                );
            }
        });
    }, []);

    const handleClick = () => {
        const chartConfigs = chart[props.ticker];
        if (chartConfigs) {
            setOHLCSelect(!OHLCSelect);
            const chartType = !OHLCSelect ? 'ohlc' : 'line';
            chartConfigs.type = chartType;

            setChart({
                ticker: props.ticker,
                configs: chartConfigs,
            });
            const baseId = getChartviewBaseChartId(props.ticker);
            removeChart({ baseId: baseId, selectAll: true, id: chartType });
            addChart({
                x: chartConfigs.x,
                y: chartConfigs.y,
                id: data.id,
                baseId: baseId,
                type: chartType,
                color: 'white',
                dataX: chartConfigs.dataX,
                dataY: data.dataY,
            });
        }
    };

    return OHLCAvail ? (
        <S.ButtonWrapper onClick={handleClick} {...props}>
            {OHLCSelect ? (
                <>
                    <FaChartLine />
                    <Typography variant="subtitle2"> OHLC</Typography>
                </>
            ) : (
                <>
                    <FaChartLine />
                    <Typography variant="subtitle2"> Line</Typography>
                </>
            )}
        </S.ButtonWrapper>
    ) : null;
};

export default function ChartviewToolbar(props: {
    baseId: string;
    showSidebar: boolean;
    tickerMetadata: TickerMetadataDTO;
    setShowSidebar: (show: boolean) => void;
    setDateSelected: (date: Date) => void;
}) {
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
        <S.TickerSearchWrapper>
            {props.tickerMetadata ? (
                <TickerSearch
                    tickerMetadata={props.tickerMetadata}
                    setSelectedOption={(ticker: string, asset_type: string) =>
                        navigate(`${ROUTES.SECURITIES}/${asset_type.toLowerCase()}/${ticker}`)
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
            <div
                style={{
                    gap: 2,
                    padding: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                {ticker && data[ticker] ? (
                    <>
                        <DateRangeSelector onClick={props.setDateSelected} />
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
                                <Typography variant="subtitle2"> Table </Typography>
                            </S.ButtonWrapper>
                        </Tooltip>
                        <Tooltip title="Deep dive analysis by layering datasets" followCursor>
                            <S.ButtonWrapper
                                style={{
                                    backgroundColor: props.showSidebar
                                        ? ColorsEnum.darkGrey
                                        : ColorsEnum.warmgray2,
                                }}
                                onClick={() =>
                                    navigate(ROUTES.CHARTDASHBOARD, {
                                        state: { ticker: ticker, assetType: assetType },
                                    })
                                }
                            >
                                <BiLayerPlus />
                                <Typography variant="subtitle2"> Layer </Typography>
                            </S.ButtonWrapper>
                        </Tooltip>
                        <ChartTypeButton
                            ticker={ticker}
                            baseId={props.baseId}
                            assetType={assetType}
                        />
                        <DrawLinesButton ticker={ticker} baseId={props.baseId} />
                        <ModifiedStudiesButton onClick={() => setShowLab(true)} />
                        <AddToWatchlist ticker={ticker} assetType={assetType} />
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
        </S.TickerSearchWrapper>
    );
}
