import * as React from 'react';
import * as S from './style';

import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import EqualizerIcon from '@mui/icons-material/Equalizer';

import { TbMathIntegralX } from 'react-icons/tb';

import { ColorsEnum } from 'common/theme';
import { useTickerDataStore } from 'store/prices/watchlist';
import { useThemeStore } from 'store/theme';
import { TickerSearch } from 'components/Search/Search';

const ModifiedStudiesButton = (props: { [others: string]: any }) => {
    return (
        <S.ButtonWrapper {...props}>
            <TbMathIntegralX />
            <Typography variant="subtitle2"> Studies </Typography>
        </S.ButtonWrapper>
    );
};

const LabContainerMetricRow = () => {
    return (
        <S.LabContainerMetricTableRow>
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
                <Typography variant="subtitle2">ADX</Typography>
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

const LabContainerStrategyRow = () => {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid ' + ColorsEnum.warmgray1,
                borderTop: 0,
                borderRight: 0,
            }}
        >
            <S.LabContainerStrategyRow header style={{ width: '20%' }}>
                <Typography variant="subtitle2">Price</Typography>
            </S.LabContainerStrategyRow>
            <S.LabContainerStrategyRow style={{ width: '80%' }}>
                <Typography variant="subtitle2">Price</Typography>
            </S.LabContainerStrategyRow>
        </div>
    );
};

const LabContainer = (props: { show: boolean; setShow: (show: boolean) => void }) => {
    const [showCancel, setShowCancel] = React.useState<boolean>(false);
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
                <S.LabContainerMetricsTableWrapper>
                    {[...Array(30)].map(_ => (
                        <LabContainerMetricRow />
                    ))}
                </S.LabContainerMetricsTableWrapper>
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
                    <LabContainerStrategyRow />
                    <LabContainerStrategyRow />
                    <LabContainerStrategyRow />
                    <LabContainerStrategyRow />
                </div>
            </div>
        </div>
    );
};

export default function ChartviewToolbar(props: { ticker: undefined | string }) {
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
            <LabContainer show={showLab} setShow={setShowLab} />
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
