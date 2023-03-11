import * as React from 'react';

export interface Data {
    portfolioId: string;
    portfolioName: string;
    assetClasses: string;
    status: string;
    benchmark: string;
    privelage: string;
    currencies: string;
    num: number;
    lastUpdated: Date;
    createdAt: Date;
}

export interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

export interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: 'asc' | 'desc';
    orderBy: string;
    rowCount: number;
}