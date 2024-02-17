import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useChartDataStore } from 'pages/Economic/store';
import { styled } from '@mui/system';

export const StyledTableRow = styled(TableRow)({
    padding: 0,
});

export const StyledTableCell = styled(TableCell)({
    padding: 0,
});

export const StyledTable = styled(TableContainer)({
    '&::-webkit-scrollbar': { display: 'none' },
    background: 'transparent', 
})

export default function TableView() {   
    const [data, loading] = useChartDataStore(state => [state.chartData, state.loading])
    return  <StyledTable>
            <Table stickyHeader>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell> <Typography variant="subtitle2" align="center"> Date </Typography> </StyledTableCell>
                        <StyledTableCell> <Typography variant="subtitle2" align="center"> Value </Typography> </StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => { 
                        const date = new Date(row[0]).toLocaleDateString()
                        return (
                        <StyledTableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell component="th" scope="row">
                                <Typography variant="subtitle2" align="center">
                                    {date}
                                </Typography> 
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                            <Typography variant="subtitle2" align="center">
                                {row[1]}
                                </Typography> 
                            </StyledTableCell>
                        </StyledTableRow>
                    )})}
                </TableBody>
            </Table>
        </StyledTable>
}