import * as React from 'react';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { ingestFile } from 'data/ingestion/ingestion';
import DataTable from 'components/Tables/DataTable/DataTable';
import { DataTableHeaderDefinition } from 'components/Tables/DataTable/type';
import { ColorsEnum } from 'common/theme';

export default function Upload() {
    const [selectedFile, setSelectedFile] = React.useState<File>();
    const [progress, setProgress] = React.useState<number>(0);
    const [fileData, setFileData] = React.useState<{
        file_name: string;
        content_header: DataTableHeaderDefinition[];
        content_body: any;
    }>();

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
            if (data)
                data.content_body = data.content_body.map((entry: any, index: number) => {
                    entry.id = index;
                    return entry;
                });
            data.content_body = data.content_body.map((entry: any[], parent_index: number) => {
                const d: { [index: string]: number | string } = {};
                d['id'] = parent_index;
                data.content_header.map((col: string, index: number) => {
                    d[col] = entry[index];
                });
                return d;
            });
            data.content_header = data.content_header.map(
                (col: string): DataTableHeaderDefinition => ({
                    id: col,
                    headerName: col,
                })
            );
            setFileData(data);
        });
    };

    return (
        <div>
            <div style={{ padding: 10 }}>
                <input
                    required
                    type="file"
                    accept=".csv, .parquet, .tsv, .json"
                    onChange={handleFileChange}
                />
                <button onClick={handleFileUploadClick}> Upload </button>
            </div>
            <div style={{ paddingTop: 5, paddingBottom: 10, color: ColorsEnum.bone }}>
                <LinearProgress color="inherit" variant="determinate" value={progress} />
            </div>
            <Box sx={{ height: 500, width: '100%' }}>
                {fileData ? (
                    <DataTable
                        stickyHeader
                        rowsPerPage={25}
                        defaultColumnWidth={100}
                        rows={fileData.content_body}
                        columns={fileData.content_header}
                    />
                ) : null}
            </Box>
        </div>
    );
}
