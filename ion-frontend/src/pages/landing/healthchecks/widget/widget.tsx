import * as React from 'react';

import axios from 'axios';

import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { ColorsEnum } from 'common/theme';
import WidgetContainer from 'components/WidgetContainer';
import { StyledTableRow } from 'components/Tables/BaseTable/StyledTableRow';
import { TEST_ENDPOINTS } from 'endpoints/endpoints';
import { dataIngestionRequest } from 'services/request';
import { ROUTES } from 'common/constant';

const StyledTableCell = (props: {
    children: any;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined;
}) => (
    <TableCell style={{ padding: 0, border: 0, paddingRight: 5 }} align={props.align}>
        {props.children}
    </TableCell>
);

const StatusDot = (props: { status: number | undefined }): React.ReactElement => {
    return (
        <span
            style={{
                height: '8px',
                width: '8px',
                backgroundColor:
                    props.status === 200
                        ? ColorsEnum.upHint
                        : props.status === 500
                        ? ColorsEnum.downHint
                        : ColorsEnum.mainstreamYellow,
                borderRadius: '50%',
                display: 'inline-block',
            }}
        />
    );
};

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    width: '100%',
    maxHeight: 250,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': { width: 0 },
}));

export default function HealthChecks() {
    const [status, setStatus] = React.useState<{ [name: string]: number | undefined }>({});
    const [lastUpdated, setLastUpdated] = React.useState<string>();

    React.useEffect(() => {
        axios
            .all(
                Object.keys(TEST_ENDPOINTS).map((key: string) =>
                    dataIngestionRequest.get(
                        TEST_ENDPOINTS[key as keyof typeof TEST_ENDPOINTS].ENDPOINT
                    )
                )
            )
            .then(response => {
                Object.keys(TEST_ENDPOINTS).map((key: string, index: number) => {
                    status[key] = response[index].data.status;
                    setStatus({ ...status });
                    setLastUpdated(new Date().toLocaleString());
                });
            });
    }, []);

    return (
        <WidgetContainer title="health_checks" fullScreenRedirect={ROUTES.PUBLIC.HEALTHCHECK}>
            <StyledTableContainer>
                <Table style={{ minWidth: 150 }} aria-label="a dense table">
                    <TableBody>
                        {Object.keys(TEST_ENDPOINTS).map((key: string, index: number) => (
                            <StyledTableRow key={`${key}_${index}`}>
                                <StyledTableCell key={`${key}_label_${index}`} align="left">
                                    <Typography variant="subtitle2" style={{ paddingLeft: 10 }}>
                                        {TEST_ENDPOINTS[key as keyof typeof TEST_ENDPOINTS].NAME}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography
                                        variant="overline"
                                        style={{ textTransform: 'none' }}
                                    >
                                        Last Updated: {lastUpdated ? lastUpdated : '-'}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell key={`${key}_status_${index}`} align="right">
                                    <StatusDot status={status[key]} />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </WidgetContainer>
    );
}
