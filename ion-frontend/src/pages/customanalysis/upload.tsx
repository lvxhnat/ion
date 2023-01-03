import * as React from 'react';
import * as S from './style';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';

import DataTable from 'components/Tables/DataTable/DataTable';
import { DataTableHeaderDefinition, UploadDataType } from 'components/Tables/DataTable/type';
import { ColorsEnum } from 'common/theme';
import { useAnalysisStore } from 'store/customanalysis/customanalysis';
import { ingestFile } from 'data/ingestion/ingestion';
import DatasetFlow from './upload/DatasetFlow';
import ColumnPanel from './upload/ColumnPanel';

export default function Upload() {
    const [selectedFile, setSelectedFile] = React.useState<File>();
    const [progress, setProgress] = React.useState<number>(0);
    const [fileData, setFileData] = useAnalysisStore();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setSelectedFile(e.target.files[0]);
    };

    const handleFileUploadClick = () => {
        if (!selectedFile) return;
        let formData = new FormData();
        formData.append('file', selectedFile);
        ingestFile(formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (data: any) => {
                //Set the progress value to show the progress bar
                setProgress(Math.round((100 * data.loaded) / data.total));
            },
        }).then(res => {
            const data = res.data;
            const formattedData: UploadDataType = {
                file_name: '',
                content_body: [],
                content_header: [],
                dtypes: {},
            };

            formattedData['content_body'] = data.content_body.map(
                (entry: any[], parent_index: number) => {
                    const d: { id: number; [col: string]: any } = { id: parent_index };
                    data.content_header.map((col: string, index: number) => {
                        d[col] = entry[index];
                    });
                    return d;
                }
            );
            formattedData['content_header'] = data.content_header.map(
                (col: string): DataTableHeaderDefinition => ({
                    id: col,
                    headerName: col,
                })
            );
            formattedData['file_name'] = data.file_name;
            formattedData['dtypes'] = data.dtypes;

            setFileData(formattedData);
        });
    };

    return (
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column', paddingTop: 10 }}>
            <DatasetFlow />
            <div style={{ padding: 10 }}>
                <input required type="file" accept=".csv" onChange={handleFileChange} />
                <button onClick={handleFileUploadClick}> Upload </button>
            </div>
            <div style={{ paddingTop: 5, paddingBottom: 10, color: ColorsEnum.bone }}>
                <LinearProgress color="inherit" variant="determinate" value={progress} />
            </div>
            <Grid container>
                <Grid item xs={10}>
                    {fileData.content_body.length !== 0 ? (
                        <DataTable
                            stickyHeader
                            data={fileData}
                            rowsPerPage={50}
                            defaultColumnWidth={100}
                        />
                    ) : null}
                </Grid>
                <Grid item xs={2}>
                    <Box
                        sx={{
                            height: '60vh',
                            overflowY: 'scroll',
                            '&::-webkit-scrollbar': { width: 0 },
                        }}
                    >
                        {fileData.content_header.map((entry: DataTableHeaderDefinition) => (
                            <ColumnPanel
                                name={entry.headerName}
                                type={fileData.dtypes[entry.headerName].type_guessed}
                            />
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}
