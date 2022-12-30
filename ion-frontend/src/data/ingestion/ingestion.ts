import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';

export const ingestFile = (file: FormData, configs: any) => {
    return dataIngestionRequest.post(ENDPOINTS.PRIVATE.INGEST_DATA, file, configs);
};
