import { ASSET_TYPES } from 'common/constant';

export interface ChartviewProps {
    ticker?: string;
    assetType?: keyof typeof ASSET_TYPES;
}
