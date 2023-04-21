import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';
import { TbMathIntegralX } from 'react-icons/tb';

import { useThemeStore } from 'store/theme';
import {useTickerDataStore} from 'store/prices/watchlist';

import { ColorsEnum } from 'common/theme';
import { TickerSearch } from 'components/Search/Search';
import { LabPopup } from './ChartviewLabPopup';

const ModifiedStudiesButton = (props: { [others: string]: any }) => {
    return (
        <S.ButtonWrapper {...props}>
            <TbMathIntegralX />
            <Typography variant="subtitle2"> Studies </Typography>
        </S.ButtonWrapper>
    );
};

export default function ChartviewTolbar(props: { ticker: string | undefined; baseId: string }) {
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
                            variant="subtitle1"
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
