import * as React from 'react';
import * as S from './style';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { LegendHeaderType, StyledTableCellProps } from './type';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export function StyledTableCell({ children, isHeader, width }: StyledTableCellProps) {
    return (
        <S.TableCellWrapper width={width}>
            <S.TableCellLabel isHeader={isHeader}>
                {children}
            </S.TableCellLabel>
        </S.TableCellWrapper>
    )
}

const tableHeaders: Array<LegendHeaderType> = [
    { name: "color", index: "color", width: 10 },
    { name: "indicator", index: "indicator", width: 75 },
]

export default function Legend() {
    return (
        <TableContainer style={{ width: '100%' }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {tableHeaders.map((tableSpecification: LegendHeaderType) => {
                            return (
                                <StyledTableCell
                                    isHeader
                                    width={tableSpecification.width + "%"}
                                    key={`chartlegend_${tableSpecification.index}_header`}
                                >
                                    {tableSpecification.name}
                                </StyledTableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                        </TableRow>
                    ))} */}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
