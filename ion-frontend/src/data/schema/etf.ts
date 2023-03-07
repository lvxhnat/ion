import { Modify } from 'common/types';

export interface ETFDataSchema {
    base_info: any;
    info: ETFInfoSchema;
    expense: ETFExpenseSchema;
    holdings: ETFHoldingsSchema;
    holdings_analysis: { [key: string]: string }[];
    performance: ETFVerticalTableSchema;
    dividends: ETFVerticalTableSchema;
    technicals: ETFTechnicalsSchema;
    realtime_rankings: ETFVerticalTableSchema;
}

interface ETFTechnicalsSchema {
    indicators: { [key: string]: string };
    voltaility: ETFHorizontalTableSchema;
}

interface ETFHoldingsSchema {
    top_holdings: ETFVerticalTableSchema;
    holding_comparison: ETFVerticalTableSchema;
    size_comparison: ETFVerticalTableSchema;
}

interface ETFExpenseSchema {
    tax_analysis: ETFHorizontalTableSchema;
    expense_ratio_analysis: ETFVerticalTableSchema;
}

interface ETFInfoSchema {
    vitals: ETFListSchema;
    dbtheme: ETFListSchema;
    fact_set: ETFHorizontalTableSchema;
    analyst_report: string;
    trade_data: { [key: string]: string };
    historical_trade_data: { [key: string]: string };
    alternative_etfs: ETFVerticalTableSchema;
    other_alternative_etfs: ETFVerticalTableSchema;
}

interface ETFBaseDataSchema {
    type: 'list' | 'table-horizontal' | 'table-vertical';
    header: string;
    data: any;
}

export interface ETFVerticalTableSchema
    extends Modify<
        ETFBaseDataSchema,
        {
            type: 'table-vertical';
            header: string;
            data: { [key: string]: string }[];
        }
    > {}

export interface ETFHorizontalTableSchema
    extends Modify<
        ETFBaseDataSchema,
        {
            type: 'table-horizontal';
            header: string;
            data: { [key: string]: string[] };
        }
    > {}

export interface ETFListSchema
    extends Modify<
        ETFBaseDataSchema,
        {
            type: 'list';
            header: string;
            data: { [key: string]: { text: string; link: string } };
        }
    > {}
