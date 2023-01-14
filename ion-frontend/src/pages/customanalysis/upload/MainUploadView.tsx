import * as React from 'react';
import * as S from '../style';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { ImTable2 } from 'react-icons/im';

import { ColorsEnum } from 'common/theme';
import { ingestFile, retrieveUserUploads } from 'data/ingestion/ingestion';
import { useAnalysisStore } from 'store/customanalysis/customanalysis';
import { DataTableHeaderDefinition, UploadDataType } from 'components/Tables/DataTable/type';

export default function MainUploadView() {
    const [_, setFileData] = useAnalysisStore();
    const [progress, setProgress] = React.useState<number>(0);
    const [fileMetaData, setFileMetaData] = React.useState<{
        [fileName: string]: {
            fileType: string;
            fileSize: number;
            lastModified: string;
        };
    }>({});
    const [selectedFiles, setSelectedFiles] = React.useState<string[]>([]);

    React.useEffect(() => {
        retrieveUserUploads('2100e95a-14fa-4716-a056-2aad204994f2').then(data => {
            data.data.map(entry => {
                fileMetaData[entry.file_name] = {
                    fileType: entry.file_format,
                    fileSize: entry.file_size,
                    lastModified: entry.upload_date,
                };
            });
        });
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            setFileMetaData({
                [selectedFile.name]: {
                    fileType: selectedFile.type,
                    fileSize: selectedFile.size,
                    lastModified: 'TEST', // selectedFile.lastModified <- number
                },
                ...fileMetaData,
            });

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
        }
    };

    return (
        <S.Panel style={{ display: 'block' }}>
            <S.PanelRow style={{ paddingBottom: 0 }}>
                <Typography variant="subtitle1" align="left" style={{ width: '100%' }}>
                    <strong>Connections</strong>
                </Typography>
                <label htmlFor="file-upload">
                    <Typography
                        variant="subtitle1"
                        align="right"
                        sx={{ color: 'blue', '.&hover': { cursor: 'pointer' } }}
                    >
                        Add
                    </Typography>
                </label>
                <input
                    required
                    type="file"
                    accept=".csv"
                    id="file-upload"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </S.PanelRow>
            <S.PanelRow>
                <LinearProgress
                    sx={{ width: '100%' }}
                    color="inherit"
                    variant="determinate"
                    value={progress}
                />
            </S.PanelRow>

            {selectedFiles.map((column: string) => {
                const selectedFileMetaData = fileMetaData[column];

                return (
                    <S.PanelRow>
                        <S.ConnectionFlag>
                            <Typography component="div" variant="subtitle2">
                                <>
                                    {fileMetaData.fileName} &nbsp;{' '}
                                    {fileMetaData
                                        ? `(${(selectedFileMetaData.fileSize / 1000000).toFixed(
                                              2
                                          )}MB)`
                                        : null}
                                </>
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                component="div"
                                sx={{ color: ColorsEnum.coolgray3 }}
                            >
                                {selectedFileMetaData.fileType}
                            </Typography>
                        </S.ConnectionFlag>
                    </S.PanelRow>
                );
            })}

            <Divider sx={{ paddingTop: 1 }} />

            <Typography variant="subtitle1" sx={{ paddingLeft: 1, paddingTop: 1 }}>
                <strong>Files</strong>
            </Typography>
            {Object.keys(fileMetaData).map((filename: string) => (
                <S.PanelRow key={filename}>
                    <S.SelectableRow>
                        <ImTable2 />
                        <Typography variant="subtitle2">{filename}</Typography>
                    </S.SelectableRow>
                </S.PanelRow>
            ))}
        </S.Panel>
    );
}
