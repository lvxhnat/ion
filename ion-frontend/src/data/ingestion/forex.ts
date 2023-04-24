import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';
import { OandaFXSocketConnection } from 'data/clients/oanda';
import { ForexHistoricalDTO } from 'data/schema/tickers';

export const getHistoricalForex = (props: {
    symbol: string;
    granularity: string;
    period?: string;
    count?: number;
}) => {
    const dI: any = {};
    if (props.period) dI.period = props.period;
    if (props.count) dI.count = props.count;
    return dataIngestionRequest.post<ForexHistoricalDTO[]>(
        ENDPOINTS.PRIVATE.FOREX_HISTORICAL_ENDPOINT,
        {
            symbol: props.symbol,
            granularity: props.granularity,
            ...dI,
        }
    );
};

export const getWebsocketForex = () => {
    return new OandaFXSocketConnection({
        socketURL: process.env.REACT_APP_WEBSOCKET_URL + ENDPOINTS.PRIVATE.FOREX_STREAMING_ENDPOINT,
        name: 'ForexWebSocket',
    });
};
