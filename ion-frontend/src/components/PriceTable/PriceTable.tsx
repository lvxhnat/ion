import * as React from 'react';
import * as S from './style';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { StyledTableCellProps, TableBodyItem, TableBodySubItem, TableBodySpecification, TableHeaderItem, TableHeaderSpecification } from './type';

function StyledTableCell({ children, isHeader, rest }: StyledTableCellProps) {
    return (
        <TableCell {...rest}>
            <S.TableCellLabel isHeader={isHeader}>
                {children}
            </S.TableCellLabel>
        </TableCell>
    )
}

export default function PriceTable(props: {
    tableHeaders: TableHeaderSpecification,
    tableBody: TableBodySpecification,
}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 150 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {props.tableHeaders.map((headerSpecification: TableHeaderItem) => {
                            return (
                                <StyledTableCell isHeader key={headerSpecification.index} width={headerSpecification.width}>
                                    {headerSpecification.name}
                                </StyledTableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableBody.map((bodySpecification: TableBodyItem, index: number) => {
                        // index needs resolution to produce unqiue key 
                        return (
                            <S.StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {props.tableHeaders.map((headerSpecification: TableHeaderItem, index: number) => {
                                    const cellSubItem: TableBodySubItem = bodySpecification[headerSpecification.name];
                                    return (
                                        <StyledTableCell sx={{ backgroundColor: cellSubItem && cellSubItem.backgroundColor ? cellSubItem.backgroundColor : undefined }} key={`${headerSpecification.name}_${index}`} align="right">
                                            {cellSubItem ? cellSubItem.value : null}
                                        </StyledTableCell>
                                    )
                                })}
                            </S.StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
