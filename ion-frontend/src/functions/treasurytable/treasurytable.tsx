import * as S from './style';
import * as React from 'react';
import { TreasuryTableProps } from './type';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

import { ColorsEnum } from 'common/theme';
import { StyledTableRow } from '../../components/Tables/BaseTable/StyledTableRow';
import {
    StyledTableCell,
    StyledChartCell,
} from '../../components/Tables/BaseTable/StyledTableCell';
import { getTableQuery } from 'data/ingestion/postgres';
import BaseLineChart from 'components/Charting/BaseChart';

export default function TreasuryTable(props: TreasuryTableProps) {
    const [data, setData] = React.useState<any>({});

    const processString = (colName: string) =>
        colName
            .slice(1, colName.length)
            .split('_')
            .map((token: string) => token.charAt(0).toUpperCase() + token.slice(1))
            .join(' ');

    React.useEffect(() => {
        getTableQuery(props.table).then(data => {
            let columnNames = Object.keys(data.data[0]);
            let obj: { [index: string]: Array<number | null> } = {};
            columnNames.map((columnName: string) => (obj[columnName] = []));
            data.data.map((data: any) => {
                columnNames.map((columnName: string, index: number) => {
                    let item = obj[columnName];
                    let entry = data[columnName];
                    if (index == 0) {
                        entry = new Date(entry);
                    }
                    item.push(entry);
                    obj[columnName] = item;
                });
            });
            setData(obj);
        });
    }, [props.table]);

    return (
        <S.StyledTableContainer style={{ width: '100%' }}>
            <Table style={{ minWidth: 150 }} aria-label="a dense table" stickyHeader>
                <TableHead>
                    <TableRow sx={{ backgroundColor: ColorsEnum.coolgray8 }}>
                        <StyledTableCell isHeader key={`treasury_header_0`}>
                            item
                        </StyledTableCell>
                        <StyledTableCell isHeader key={`treasury_header_1`}>
                            rate
                        </StyledTableCell>
                        <StyledTableCell width="30%" isHeader key={`treasury_header_2`}>
                            p50d
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(data).map((column: string, index: number) => {
                        // Set size ensures that the array does not consist of all nulls
                        if (column !== '_date' && new Set(data[column]).size !== 1) {
                            return (
                                <StyledTableRow key={`treasury_row_${index}`}>
                                    <StyledTableCell key={`tLabel_${index}`}>
                                        {' '}
                                        {processString(column)}{' '}
                                    </StyledTableCell>
                                    <StyledTableCell key={`tRate_${index}`}>
                                        {' '}
                                        {data[column][0]}%{' '}
                                    </StyledTableCell>
                                    <StyledChartCell key={`tChart_${index}`}>
                                        {index !== 0 ? (
                                            <BaseLineChart
                                                baseId={`${column}_treasury_chart`}
                                                defaultData={{
                                                    id: column,
                                                    name: column,
                                                    parent: true,
                                                    dataX: data._date,
                                                    dataY: data[column],
                                                    color: 'white',
                                                    type: 'pureLine',
                                                }}
                                                width={120}
                                                height={20}
                                                margin={{
                                                    top: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    left: 0,
                                                }}
                                            />
                                        ) : null}
                                    </StyledChartCell>
                                </StyledTableRow>
                            );
                        }
                    })}
                </TableBody>
            </Table>
        </S.StyledTableContainer>
    );
}
