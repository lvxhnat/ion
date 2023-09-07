import * as React from 'react';
import { styled } from '@mui/system';

import { MdDelete } from 'react-icons/md';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useTickerDataStore } from 'store/chartview/chartview';
import { StyledTableCell } from 'components/Tables/BaseTable/StyledTableCell';
import { StyledTableRow } from 'components/Tables/BaseTable/StyledTableRow';
import BaseChartCell from 'components/Charting/BaseChartCell';
import TrendSlicer from 'components/Analysis/Tables/TrendSlicerCell';
import { emptyDefaultDataProps } from 'components/Charting/BaseChart/schema/schema';

import { ColorsEnum } from 'common/theme';
import { ASSET_TYPES } from 'common/constant';
import { WatchlistTableEntry } from 'endpoints/schema/database/postgres/watchlist';

export const StyledTableInnerCell = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
}));

export interface MainDataTableHeaderType {
    id: string;
    name: string;
    type: 'value' | 'flag' | 'remove' | 'edit';
    width?: number;
}

const colorChecker = (last: number, secondLast: number) => {
    return last - secondLast > 0 ? ColorsEnum.upHint : ColorsEnum.downHint;
};

const MainDataTableRow = (props: {
    index: number;
    entry: WatchlistTableEntry;
    handleRowClick?: (entry: WatchlistTableEntry) => void;
    handleRowEdit?: (entry: WatchlistTableEntry) => void;
    handleRowRemove?: (id: string) => void;
}) => {
    const data =
        useTickerDataStore(state => state.data)[props.entry.symbol] ?? emptyDefaultDataProps();

    let rowColor = 'transparent';
    if (props.index % 2 === 0) {
        rowColor = ColorsEnum.darkGrey;
    }

    return (
        <StyledTableRow
            key={`MainDataTableRow_${props.index}`}
            style={{ backgroundColor: rowColor }}
            onClick={() => (props.handleRowClick ? props.handleRowClick(props.entry) : undefined)}
        >
            <StyledTableCell>
                <StyledTableInnerCell>
                    <MdDelete
                        style={{ fontSize: 15 }}
                        onClick={() => {
                            props.handleRowRemove
                                ? props.handleRowRemove(props.entry.uuid)
                                : undefined;
                        }}
                    />
                </StyledTableInnerCell>
            </StyledTableCell>
            <StyledTableCell color={ColorsEnum.white}>{props.entry.asset_type}</StyledTableCell>
            <StyledTableCell color={colorChecker(data.dataY.slice(-1)[0], data.dataY.slice(-2)[0])}>
                {props.entry.symbol}
            </StyledTableCell>
            <BaseChartCell
                ticker={props.entry.symbol}
                assetType={props.entry.asset_type.toUpperCase() as keyof typeof ASSET_TYPES}
            />
            <StyledTableCell color={colorChecker(data.dataY.slice(-1)[0], data.dataY.slice(-2)[0])}>
                {data ? data.dataY.slice(-1)[0] : null}
            </StyledTableCell>
            <StyledTableCell color={colorChecker(data.dataY.slice(-1)[0], data.dataY.slice(-2)[0])}>
                {data
                    ? (
                          (100 * (data.dataY.slice(-1)[0] - data.dataY.slice(-2)[0])) /
                          data.dataY.slice(-2)[0]
                      ).toFixed(2) + '%'
                    : null}
            </StyledTableCell>
            <StyledTableCell color={colorChecker(data.dataY.slice(-1)[0], data.dataY.slice(-2)[0])}>
                {(data.dataY.slice(-1)[0] - data.dataY.slice(-2)[0]).toFixed(2)}
            </StyledTableCell>
            <StyledTableCell>
                <TrendSlicer timeSeries={data.dataY.slice(-10)} />
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default function MainDataTable(props: {
    id: string;
    tableBody: WatchlistTableEntry[];
    handleRowClick?: (entry: WatchlistTableEntry) => void;
    handleRowEdit?: (entry: WatchlistTableEntry) => void;
    handleRowRemove?: (id: string) => void;
}) {
    const tableHeaders: MainDataTableHeaderType[] = [
        { id: 'remove', name: 'remove', type: 'remove', width: 2 },
        { id: 'type', name: 'Type', type: 'value', width: 5 },
        { id: 'symbol', name: 'Symbol', type: 'value', width: 5 },
        { id: 'symbolTrend', name: 'Symbol Trend', type: 'value', width: 10 },
        { id: 'last', name: 'Last', type: 'value', width: 5 },
        { id: 'pctchange', name: '% Chg', type: 'value', width: 7 },
        { id: 'change', name: 'Change', type: 'value', width: 5 },
        { id: 'trend', name: 'Quote Trend', type: 'value', width: 10 },
        { id: 'currency', name: 'currency', type: 'value', width: 48 },
    ];

    return (
        <TableContainer style={{ width: '100%' }}>
            <Table style={{ minWidth: 150 }} aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {tableHeaders.map((headerSpecification: MainDataTableHeaderType) => {
                            if (
                                headerSpecification.type === 'remove' ||
                                headerSpecification.type === 'edit'
                            )
                                headerSpecification.name = '';
                            return (
                                <StyledTableCell
                                    isHeader
                                    width={headerSpecification.width + '%'}
                                    key={headerSpecification.id}
                                >
                                    {headerSpecification.name}
                                </StyledTableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableBody.map((entry: WatchlistTableEntry, index: number) => (
                        <MainDataTableRow
                            index={index}
                            entry={entry}
                            key={`${entry.symbol}-${index}`}
                            handleRowClick={props.handleRowClick}
                            handleRowEdit={props.handleRowEdit}
                            handleRowRemove={props.handleRowRemove}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
