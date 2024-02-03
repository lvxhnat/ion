import { request } from 'services/request';
import { ENDPOINTS } from 'endpoints/endpoints';
import { OandaFXSocketConnection } from 'endpoints/clients/oanda';
import { ForexHistoricalDTO } from 'endpoints/schema/tickers';

export const getHistoricalForex = (props: {
    symbol: string;
    granularity: string;
    period?: string;
    count?: number;
    fromDate?: Date;
}) => {
    const dI: any = {};
    return request("data-ingestion").post<ForexHistoricalDTO[]>(
        ENDPOINTS.PRIVATE.FOREX_HISTORICAL_ENDPOINT,
        {
            symbol: props.symbol,
            granularity: props.granularity,
            period: props.period,
            count: props.count,
            from_date: props.fromDate,
        }
    );
};

export const getWebsocketForex = () => {
    return new OandaFXSocketConnection({
        socketURL: process.env.REACT_APP_WEBSOCKET_URL + ENDPOINTS.PRIVATE.FOREX_STREAMING_ENDPOINT,
        name: 'ForexWebSocket',
    });
};
