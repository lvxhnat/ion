export const allowedTreasuryTables = [
    'us_bill_rates',
    'us_real_longterm',
    'us_real_yield_curve',
    'us_longterm_rates',
    'us_treasury_yield',
] as const;

export interface TreasuryTableProps {
    table: typeof allowedTreasuryTables[number];
    height?: string;
}
