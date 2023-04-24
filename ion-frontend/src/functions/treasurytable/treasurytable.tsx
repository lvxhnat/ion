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
import { queryTable } from 'endpoints/clients/database/postgres';
import BaseLineChart from 'components/Charting/BaseChart';

export default function TreasuryTable(props: TreasuryTableProps) {
    const [data, setData] = React.useState<any>({});

    const processString = (colName: string) =>
        colName
            .slice(1, colName.length)
            .split('__')
            .map((token: string) => token.charAt(0).toUpperCase() + token.slice(1))
            .join(' ');

    React.useEffect(() => {
        queryTable(props.table).then(data => {
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
        <S.StyledTableContainer style={{ width: '100%', height: props.height ?? 'auto' }}>
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
                    {Object.keys(data)
                        .slice(2, Object.keys(data).length)
                        .map((column: string, index: number) => {
                            // Set size ensures that the array does not consist of all nulls
                            if (new Set(data[column]).size !== 1) {
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
                                                <div style={{ height: '25px' }}>
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
                                                    />
                                                </div>
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
