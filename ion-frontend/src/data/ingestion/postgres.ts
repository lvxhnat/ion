import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';

export const getTableQuery = (table: string) => {
    return dataIngestionRequest.post(ENDPOINTS.PRIVATE.QUERY_POSTGRES_ENDPOINT, {
        table: table,
    });
};
