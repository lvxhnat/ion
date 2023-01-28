import * as React from 'react';

import Grid from '@mui/material/Grid';

import { DataTableSkeleton, DataTable } from 'components/Tables/DataTable';
import { useAnalysisStore, useRetrievingStateStore } from 'store/customanalysis/customanalysis';
import DatasetFlow from './DatasetFlow';
import ColumnPanel, { ColumnPanelSkeleton } from './DatasetType';

export default function MainTableView() {
    const [fileData] = useAnalysisStore();
    const [dataTableRetrievingState] = useRetrievingStateStore();

    return (
        <div style={{ paddingTop: 10 }}>
            <DatasetFlow labels={fileData.file_name ? [fileData.file_name] : []} />
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
                    {!dataTableRetrievingState ? <ColumnPanel /> : <ColumnPanelSkeleton />}
                </Grid>
            </Grid>
        </div>
    );
}
