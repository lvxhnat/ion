import * as React from 'react';

import { MdDelete } from 'react-icons/md';
import { HiOutlinePencil } from 'react-icons/hi';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { StyledTableCell } from '../BaseTable/StyledTableCell';
import { StyledTableRow } from '../BaseTable/StyledTableRow';
import { ColorsEnum } from 'common/theme';
import { CountryFlags } from 'common/constant/countries';

export interface MainDataTableHeaderType {
    id: string;
    name: string;
    type: 'value' | 'flag' | 'remove' | 'edit';
    width?: number;
}

export type MainDataTableBodyType = { [key: string]: any };

export default function MainDataTable(props: {
    id: string;
    tableHeaders: MainDataTableHeaderType[];
    tableBody: MainDataTableBodyType[];
    handleRowClick?: (entry: MainDataTableBodyType) => void;
    handleRowEdit?: (entry: MainDataTableBodyType) => void;
    handleRowRemove?: (id: string) => void;
}) {
    return (
        <TableContainer style={{ width: '100%' }}>
            <Table style={{ minWidth: 150 }} aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {props.tableHeaders.map((headerSpecification: MainDataTableHeaderType) => {
                            let headerName: string = headerSpecification.name;
                            if (headerSpecification.type === 'remove') headerName = '';
                            if (headerSpecification.type === 'edit') headerName = '';
                            return (
                                <StyledTableCell
                                    isHeader
                                    width={headerSpecification.width + '%'}
                                    key={headerSpecification.id}
                                >
                                    {headerName}
                                </StyledTableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableBody.map((entry: MainDataTableBodyType, index: number) => {
                        let rowColor = 'transparent';
                        if (index % 2 === 0) { rowColor = ColorsEnum.darkGrey };
                        return (
                            <StyledTableRow
                                key={`MainDataTableRow_${index}`}
                                style={{ backgroundColor: rowColor }}
                                onClick={() =>
                                    props.handleRowClick ? props.handleRowClick(entry) : undefined
                                }
                            >
                                {props.tableHeaders.map((columnEntry: MainDataTableHeaderType) => {
                                    let component: any;

                                    if (columnEntry.type === 'flag') {
                                        component = (
                                            <img
                                                width="20"
                                                src={
                                                    CountryFlags[
                                                        entry[
                                                            columnEntry.name as keyof typeof entry
                                                        ] as keyof typeof CountryFlags
                                                    ].url
                                                }
                                                alt={entry[columnEntry.name as keyof typeof entry]}
                                            />
                                        );
                                    } else if (columnEntry.type === 'remove') {
                                        component = (
                                            <HiOutlinePencil
                                                style={{ fontSize: 15 }}
                                                onClick={() =>
                                                    props.handleRowRemove
                                                        ? props.handleRowRemove(
                                                              entry[props.id as keyof typeof entry]
                                                          )
                                                        : undefined
                                                }
                                            />
                                        );
                                    } else if (columnEntry.type === 'edit') {
                                        component = (
                                            <MdDelete
                                                style={{ fontSize: 15 }}
                                                onClick={() =>
                                                    props.handleRowRemove
                                                        ? props.handleRowRemove(
                                                              entry[props.id as keyof typeof entry]
                                                          )
                                                        : undefined
                                                }
                                            />
                                        );
                                    } else {
                                        component = (
                                            <Typography variant="subtitle2" noWrap>
                                                {entry[columnEntry.name as keyof typeof entry]}
                                            </Typography>
                                        );
                                    }

                                    return (
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
                                                {component}
                                            </div>
                                        </StyledTableCell>
                                    );
                                })}
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
