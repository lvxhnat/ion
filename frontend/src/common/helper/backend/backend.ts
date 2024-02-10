import * as d3 from 'd3';

import { ASSET_TYPES } from 'common/constant';

import { emptyDefaultDataProps } from 'components/Charting/BaseChart/schema/schema';

import { getCandles } from 'endpoints/clients/candles';
import { getHistoricalForex } from 'endpoints/clients/forex';
import { getFredSeries } from 'endpoints/clients/fred';
import { TickerMetadataDTO, getTickerMetadata } from 'endpoints/clients/database/postgres/query';

export function fetchMetadata(ticker: string, assetType: keyof typeof ASSET_TYPES) {
    return getTickerMetadata({
        symbol: ticker,
        asset_class: assetType,
    }).then(res => {
        if (assetType === ASSET_TYPES.FOREX) {
            return {
                data: {
                    asset_class: ASSET_TYPES.FOREX,
                    last_updated: new Date().toLocaleString(),
                    name: ticker,
                    source: 'OANDA',
                    symbol: ticker,
                } as TickerMetadataDTO,
            };
        } else return { data: res.data as TickerMetadataDTO };
    });
}

export function fetchRawData(
    assetType: keyof typeof ASSET_TYPES,
    ticker: string,
    dateSelected: Date
) {
    if (assetType === ASSET_TYPES.FOREX) {
        return getHistoricalForex({
            symbol: ticker,
            granularity: 'D',
            fromDate: dateSelected,
        });
    } else if (assetType === ASSET_TYPES.EQUITY || assetType === ASSET_TYPES.ETF) {
        return getCandles({
            symbol: ticker,
            fromDate: dateSelected,
        });
    } else {
        return getFredSeries(ticker);
    }
}

export function fetchData(assetType: keyof typeof ASSET_TYPES, ticker: string, dateSelected: Date) {
    const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S');
    const dataPropParams = {
        ticker: ticker,
        data: emptyDefaultDataProps(),
    };

    let processData = (res: any) => {};

    if (assetType === ASSET_TYPES.FOREX) {
        processData = res => {
            dataPropParams.data.dataX = res.data.map((d: any) => parseTime(d.date)!);
            dataPropParams.data.dataY = res.data.map((d: any) => d.close);
            return { rawData: res.data, data: dataPropParams };
        };
    } else if (assetType === ASSET_TYPES.EQUITY || assetType === ASSET_TYPES.ETF) {
        processData = res => {
            dataPropParams.data.dataX = res.data.data.map((d: any) => parseTime(d.date)!);
            dataPropParams.data.dataY = res.data.data.map((d: any) => d.close);
            return { rawData: res.data.data, data: dataPropParams };
        };
    } else {
        processData = res => {
            dataPropParams.data.dataX = res.data.map((d: any) => parseTime(d.date)!);
            dataPropParams.data.dataY = res.data.map((d: any) => d.value);
            return { rawData: res.data, data: dataPropParams };
        };
    }

    return fetchRawData(assetType, ticker, dateSelected).then(res => processData(res));
}
