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

    currency: string | null;
    position: 'long' | 'short' | null;
    quantity: number | null;

    account: string | null;
    price_purchased: number | null;
    fx_rate: number | null;
    transaction_date: Date | null;
}