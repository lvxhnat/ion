import * as React from 'react';
import * as S from '../style';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import DataTable from 'components/Tables/DataTable/DataTable';
import { DataTableHeaderDefinition } from 'components/Tables/DataTable/type';
import { useAnalysisStore } from 'store/customanalysis/customanalysis';
import DatasetFlow from './DatasetFlow';
import ColumnPanel from './DatasetType';

export default function MainTableView() {
    const [fileData] = useAnalysisStore();
    return (
        <div
            style={{
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                paddingTop: 10,
            }}
        >
            <DatasetFlow labels={fileData.file_name ? [fileData.file_name] : []} />
            <Grid container columns={15}>
                <Grid item xs={11}>
                    {fileData.content_body.length !== 0 ? (
                        <DataTable
                            stickyHeader
                            data={fileData}
                            rowsPerPage={50}
                            defaultColumnWidth={100}
                        />
                    ) : null}
                </Grid>
                <Grid item xs={4}>
                    <Box
                        sx={{
                            height: '60vh',
                            overflowY: 'scroll',
                            '&::-webkit-scrollbar': { width: 0 },
                        }}
                    >
                        {fileData.content_header.map((entry: DataTableHeaderDefinition) => (
                            <ColumnPanel
                                key={`${entry.headerName}_columnPanel`}
                                name={entry.headerName}
                            />
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}
