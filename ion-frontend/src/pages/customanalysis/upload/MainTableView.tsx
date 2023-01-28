import * as React from 'react';
import * as S from '../style';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { DataTableSkeleton, DataTable } from 'components/Tables/DataTable';
import { DataTableHeaderDefinition } from 'components/Tables/DataTable/type';
import { useAnalysisStore, useRetrievingStateStore } from 'store/customanalysis/customanalysis';
import DatasetFlow from './DatasetFlow';
import ColumnPanel, { ColumnPanelSkeleton } from './DatasetType';

export default function MainTableView() {
    const [fileData] = useAnalysisStore();
    const [dataTableRetrievingState] = useRetrievingStateStore();
    console.log(dataTableRetrievingState);

    return (
        <div
            style={{
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                paddingTop: 10,
            }}
        >
            <S.DatasetFlowWrapper>
                <DatasetFlow labels={fileData.file_name ? [fileData.file_name] : []} />
            </S.DatasetFlowWrapper>
            <Grid container columns={15}>
                <Grid item xs={11}>
                    {!dataTableRetrievingState ? (
                        fileData.content_body.length !== 0 ? (
                            <DataTable
                                stickyHeader
                                data={fileData}
                                rowCount={fileData.file_rows}
                                rowsPerPage={50}
                                defaultColumnWidth={100}
                            />
                        ) : null
                    ) : (
                        <DataTableSkeleton />
                    )}
                </Grid>
                <Grid item xs={4}>
                    <Box
                        sx={{
                            height: '100%',
                            overflowY: 'scroll',
                            '&::-webkit-scrollbar': { width: 0 },
                        }}
                    >
                        {!dataTableRetrievingState ? (
                            fileData.content_header.map(
                                (entry: DataTableHeaderDefinition, index: number) => (
                                    <ColumnPanel
                                        key={`columnPanel_${index}`}
                                        name={entry.headerName}
                                    />
                                )
                            )
                        ) : (
                            <ColumnPanelSkeleton />
                        )}
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}
