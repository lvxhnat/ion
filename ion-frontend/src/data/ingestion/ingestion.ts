import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';

interface IngestionDataType {
    file_name: string;
    content_header: string[];
    content_body: any[];
}

export const ingestFile = (file: FormData, configs: any) => {
    return dataIngestionRequest.post<IngestionDataType>(
        ENDPOINTS.PRIVATE.INGEST_DATA,
        file,
        configs
    );
};
