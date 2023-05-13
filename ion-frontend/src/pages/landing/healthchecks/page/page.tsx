import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import Navigation from 'components/Navigation';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { StyledTableCell } from 'components/Tables/BaseTable/StyledTableCell';
import { StyledTableRow } from 'components/Tables/BaseTable/StyledTableRow';

export default function Page() {
    return (
        <>
            <CssBaseline />
            <Navigation />
            <Typography variant="subtitle2" style={{ padding: 5 }}>
                Variables store information, like passwords and secret keys, that you can use in job
                scripts. Each project can define a maximum of 8000 variables. <br />
                <br />
                · Protected: Only exposed to protected branches or protected tags. <br />
                · Masked: Hidden in job logs. Must match masking requirements. <br />· Expanded:
                Variables with $ will be treated as the start of a reference to another variable.
            </Typography>
            <Table style={{ minWidth: 150 }} aria-label="a dense table" stickyHeader>
                <TableHead>
                    <TableRow>
                        <StyledTableCell isHeader key={`healthchecks_header_0`}>
                            Type
                        </StyledTableCell>
                        <StyledTableCell isHeader key={`healthchecks_header_1`}>
                            Key
                        </StyledTableCell>
                        <StyledTableCell isHeader key={`healthchecks_header_2`}>
                            Value
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </>
    );
}
