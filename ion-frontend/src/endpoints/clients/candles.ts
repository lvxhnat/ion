import moment from 'moment';
import { ENDPOINTS } from 'endpoints/endpoints';
import { EquityHistoricalDTO } from 'endpoints/schema/tickers';
import { dataIngestionRequest } from 'services/request';

export const getCandles = (props: { symbol: string | string[]; fromDate?: Date }) => {
    let params: any = { symbol: props.symbol };
    if (props.fromDate) params['from_date'] = moment(props.fromDate).format('YYYY-MM-DD');
    return dataIngestionRequest.post<EquityHistoricalDTO>(
        ENDPOINTS.PRIVATE.EQUITY_HISTORICAL_ENDPOINT,
        params
    );
};
