import { ASSET_TYPES } from 'common/constant';

export interface ETFInfoRequestProps {
    filter: { [field: string]: string }[];
    sort: { [field: string]: -1 | 1 }[];
}

export interface ETFInfoDTO {
    id: number;
    ticker: string;
    issuer: string;
    brand: string;
    structure: string;
    expense_ratio: string;
    inception: string;
    index_tracked: string;
    category: string;
    asset_class: typeof ASSET_TYPES;
    asset_class_size: string;
    asset_class_style: string;
    region_general: string;
    region_specific: string;
    segment: string;
    focus: string;
    niche: string;
    strategy: string;
    weighting_scheme: string;
    description: string;
}
