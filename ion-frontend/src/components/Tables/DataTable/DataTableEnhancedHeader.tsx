import * as S from './style';
import * as React from 'react';

import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';

import { useUploadPage } from 'store/table/table';

export default function DataTableEnhancedHeader(props: {
    fileName: string;
    rowCount: number;
    rowsPerPage: number;
}) {
    const [page, setPage] = useUploadPage();
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(props.rowsPerPage);

    return (
        <S.TableHeader>
            <S.LeftTableHeaderPanel>
                <Typography variant="subtitle1" align="left">
                    <strong>{props.fileName}</strong>
                </Typography>
            </S.LeftTableHeaderPanel>
            <S.RightTableHeaderPanel>
                <TablePagination
                    rowsPerPageOptions={[props.rowsPerPage, 50, 100, 150, 200]}
                    component="div"
                    count={props.rowCount}
                    rowsPerPage={props.rowsPerPage}
                    page={page}
                    onPageChange={(e: unknown, newPage: number) => {
                        setPage(newPage);
                    }}
                    onRowsPerPageChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                    sx={{
                        fontSize: `calc(0.5rem + 0.3vw)`,
                        '.MuiTablePagination-selectLabel': {
                            fontSize: `calc(0.5rem + 0.3vw)`,
                        },
                        '.MuiTablePagination-displayedRows': {
                            fontSize: `calc(0.5rem + 0.3vw)`,
                        },
                    }}
                />
            </S.RightTableHeaderPanel>
        </S.TableHeader>
    );
}
