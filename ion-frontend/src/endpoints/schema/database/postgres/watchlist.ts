import { SOURCE_TYPES } from 'common/constant';

export interface WatchlistTableEntry {
    symbol: string;
    source: keyof typeof SOURCE_TYPES;
    date_added: Date;
}
