import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'endpoints/endpoints';
import {
    DeleteTableParams,
    InsertTableParams,
    UpdateTableParams,
} from 'endpoints/schema/database/postgres/props';

export const queryTable = (props: { tableName: string }) => {
    return dataIngestionRequest.post(ENDPOINTS.PRIVATE.QUERY_POSTGRES_ENDPOINT, {
        table: props.tableName,
    });
};

export const getTable = (props: { tableName: string }) => {
    return dataIngestionRequest.get(
        `${ENDPOINTS.PRIVATE.BASE_POSTGRES_ENDPOINT}${props.tableName}`
    );
};

export const insertTable = (props: InsertTableParams) => {
    return dataIngestionRequest.post(
        `${ENDPOINTS.PRIVATE.BASE_POSTGRES_ENDPOINT}${props.tableName}`,
        props.entry
    );
};

/**
 * Id indicates the value in the unique definition column that we want to use to delete the entry in the table
 */
export const deleteTable = (props: DeleteTableParams) => {
    return dataIngestionRequest.delete(
        `${ENDPOINTS.PRIVATE.BASE_POSTGRES_ENDPOINT}${props.tableName}`,
        { params: { id: props.id } } // params not data
    );
};

export const updateTable = (props: UpdateTableParams) => {
    return dataIngestionRequest.put(
        `${ENDPOINTS.PRIVATE.BASE_POSTGRES_ENDPOINT}${props.tableName}`,
        {
            data: {
                id: props.id,
                entry: props.entry,
            },
        }
    );
};
