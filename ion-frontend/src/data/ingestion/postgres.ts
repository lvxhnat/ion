import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';

export const getTableQuery = (table: string) => {
    return dataIngestionRequest.post(ENDPOINTS.PRIVATE.DB_QUERY, {
        table: table,
    });
};
