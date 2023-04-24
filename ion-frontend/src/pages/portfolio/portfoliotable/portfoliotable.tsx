import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from 'components/Tables/BaseTable/StyledTableCell';

import { PortfolioSpecificationType, usePortfolioStore } from 'store/portfolio/portfolio';
import { StyledTableRow } from 'components/Tables/BaseTable/StyledTableRow';
import { CurrencyToCountry } from 'common/constant/countries';
import Typography from '@mui/material/Typography';

export default function PortfolioTable() {
    const portfolios = usePortfolioStore(state => state.portfolios);

    const tableHeaders: { name: keyof PortfolioSpecificationType; id: string; width: number }[] = [
        { name: 'name' as keyof PortfolioSpecificationType, id: 'name', width: 20 },
        { name: 'description' as keyof PortfolioSpecificationType, id: 'description', width: 60 },
        { name: 'currency' as keyof PortfolioSpecificationType, id: 'currency', width: 20 },
    ];

    return (
        <TableContainer style={{ width: '100%' }}>
            <Table style={{ minWidth: 150 }} aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {tableHeaders.map(headerSpecification => {
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
                    {portfolios.map((entry: PortfolioSpecificationType) => (
                        <StyledTableRow key={`${entry.name}_row`}>
                            {tableHeaders.map(columnEntry => (
                                <StyledTableCell key={`${columnEntry.name}_label`}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: 5,
                                        }}
                                    >
                                        {columnEntry.name === 'currency' ? (
                                            <img
                                                width="20"
                                                src={`https://flagcdn.com/${
                                                    CurrencyToCountry[
                                                        entry[
                                                            columnEntry.name
                                                        ] as keyof typeof CurrencyToCountry
                                                    ]
                                                }.svg`}
                                                alt={entry[columnEntry.name]}
                                            />
                                        ) : undefined}
                                        <Typography variant="subtitle2">
                                            {entry[columnEntry.name]}
                                        </Typography>
                                    </div>
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
