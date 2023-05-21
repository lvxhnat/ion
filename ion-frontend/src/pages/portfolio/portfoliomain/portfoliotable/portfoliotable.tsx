import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { usePortfolioStore } from 'store/portfolio/portfolio';
import { StyledTableCell } from 'components/Tables/BaseTable/StyledTableCell';
import { StyledTableRow } from 'components/Tables/BaseTable/StyledTableRow';
import { CurrencyToCountry } from 'common/constant/countries';
import { PortfolioTableEntry } from 'endpoints/schema/database/postgres/portfolio/props';
import { formatDate } from 'common/constant/dates';
import { ColorsEnum } from 'common/theme';

export default function PortfolioTable() {
    const portfolios: PortfolioTableEntry[] = usePortfolioStore(state => state.portfolios);
    const [portfolioSelected, setPortfolioSelected, clearSelectedPortfolio] = usePortfolioStore(
        state => [state.selectedPortfolio, state.setSelectedPortfolio, state.clearSelectedPortfolio]
    );

    const tableHeaders: {
        name: keyof PortfolioTableEntry;
        id: string;
        width: number;
        type: 'string' | 'number' | 'date';
    }[] = [
        { name: 'name' as keyof PortfolioTableEntry, id: 'name', width: 15, type: 'string' },
        {
            name: 'description' as keyof PortfolioTableEntry,
            id: 'description',
            width: 40,
            type: 'string',
        },
        { name: 'currency' as keyof PortfolioTableEntry, id: 'currency', width: 5, type: 'string' },
        {
            name: 'creation_date' as keyof PortfolioTableEntry,
            id: 'creation_date',
            width: 20,
            type: 'date',
        },
        {
            name: 'last_updated' as keyof PortfolioTableEntry,
            id: 'last_updated',
            width: 20,
            type: 'date',
        },
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
                    {portfolios.map((entry: PortfolioTableEntry, index: number) => {
                        let rowColor = 'transparent';
                        if (index % 2) rowColor = ColorsEnum.darkGrey;
                        if ('uuid' in portfolioSelected && portfolioSelected.uuid === entry.uuid) {
                            rowColor = ColorsEnum.warmgray1;
                        }
                        return (
                            <StyledTableRow
                                style={{ backgroundColor: rowColor }}
                                key={`${entry.name}_row`}
                                onClick={() =>
                                    ('uuid' in portfolioSelected && entry.uuid === portfolioSelected.uuid)
                                        ? clearSelectedPortfolio()
                                        : setPortfolioSelected(entry)
                                }
                            >
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
                                            <Typography variant="subtitle2" noWrap>
                                                {columnEntry.type === 'date'
                                                    ? formatDate(entry[columnEntry.name] as Date)
                                                    : (entry[columnEntry.name] as string)}
                                            </Typography>
                                        </div>
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
