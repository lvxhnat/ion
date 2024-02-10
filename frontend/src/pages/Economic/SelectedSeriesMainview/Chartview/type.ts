import { ASSET_TYPES } from 'common/constant';
import { FredSeriesEntry } from 'endpoints/clients/fred';

export interface ChartviewProps {
    ticker: string;
    assetType?: keyof typeof ASSET_TYPES;
    seriesSelected: FredSeriesEntry | undefined;
}
