import * as React from 'react';
import * as S from './style';

import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { TbMathIntegralX, TbClick } from 'react-icons/tb';
import { FaChartArea, FaChartLine, FaBroom } from 'react-icons/fa';
import { MdDraw, MdCancel, MdOutlineUndo, MdOutlineBackupTable } from 'react-icons/md';

import { useThemeStore } from 'store/theme';
import { useChartStore, useTickerDataStore } from 'store/chartview/chartview';

import ChartviewLabPopup from './ChartviewLabPopup';
import { ColorsEnum } from 'common/theme';
import { TickerSearch } from 'components/Search/Search';
import { removeLine } from 'components/Charting/BaseChart/plugins/editChart/removeChart';
import { CHARTIDS } from 'components/Charting/BaseChart/config';

const DrawLinesButton = (props: { ticker: string; baseId: string }) => {
    const [menu, setMenu] = React.useState<boolean>(false);
    const [charts, setChart] = useChartStore(state => [state.charts, state.setChart]);

    if (charts[props.ticker])
        return (
            <div>
                <S.ButtonWrapper onClick={() => setMenu(!menu)}>
                    {charts[props.ticker].draw ? <MdDraw /> : <TbClick />}
                    <Typography variant="subtitle2">
                        {charts[props.ticker].draw ? 'Drawing' : 'Draw'}
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
                                ticker: props.ticker,
                                chart: {
                                    ...charts[props.ticker],
                                    draw: !charts[props.ticker].draw,
                                },
                            });
                            setMenu(false);
                        }}
                    >
                        {charts[props.ticker].draw ? (
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

    const handleClick = () => {
        setShowArea(!showArea);
        setChart({
            ticker: props.ticker,
            chart: {
                color: chart.color,
                type: !showArea ? 'area' : 'line',
            },
        });
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
    ticker: string | undefined;
    assetType: string | undefined;
    showSidebar: boolean;
    setShowSidebar: (show: boolean) => void;
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
                            {props.ticker.toUpperCase()}
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
                {props.ticker ? (
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
                        <ChartTypeButton
                            ticker={props.ticker}
                            baseId={props.baseId}
                        />
                        <DrawLinesButton ticker={props.ticker} baseId={props.baseId} />
                        <ModifiedStudiesButton onClick={() => setShowLab(true)} />
                    </>
                ) : undefined}
            </div>
            {props.ticker ? (
                <ChartviewLabPopup
                    baseId={props.baseId}
                    show={showLab}
                    setShow={setShowLab}
                    ticker={props.ticker}
                />
            ) : undefined}
        </div>
    );
}
