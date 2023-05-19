export interface PortfolioTableEntry {
    uuid: string;
    name: string;
    description: string;
    currency: string;
    creation_date: Date;
    last_updated: Date;
}

export interface PortfolioAssetTableEntry {
    uuid: string;
    portfolio_id: string;
    asset_id: string;
    asset_type: string;
    currency: string;
    quantity: number;
    position: 'long' | 'short';
    price_purchased: number;
    fx_rate: number | null;
    account: string | null;
    transaction_date: Date | null;
}