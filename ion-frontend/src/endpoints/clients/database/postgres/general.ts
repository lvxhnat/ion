import { request } from 'services/request';
import { ENDPOINTS } from 'endpoints/endpoints';
import { PostgresTableSchemas } from 'endpoints/schema/database/postgres/props';

export const queryTable = (props: { tableName: string; id: string }) => {
    return request("data-ingestion").post(ENDPOINTS.PRIVATE.QUERY_POSTGRES_ENDPOINT, {
        table: props.tableName,
    });
};

export const getTable = (props: { tableName: string }) => {
    return request("data-ingestion").get(
        `${ENDPOINTS.PRIVATE.BASE_POSTGRES_ENDPOINT}${props.tableName}`
    );
};

export const insertTable = (props: { tableName: string; entry: PostgresTableSchemas }) => {
    return request("data-ingestion").post(
        `${ENDPOINTS.PRIVATE.BASE_POSTGRES_ENDPOINT}${props.tableName}`,
        props.entry
    );
};

/**
 * Id indicates the value in the unique definition column that we want to use to delete the entry in the table
 */
export const deleteTable = (props: { tableName: string; id: string }) => {
    return request("data-ingestion").delete(
        `${ENDPOINTS.PRIVATE.BASE_POSTGRES_ENDPOINT}${props.tableName}`,
        { params: { id: props.id } } // params not data
    );
};

export const updateTable = (props: {
    tableName: string;
    id: string;
    entry: PostgresTableSchemas;
}) => {
    return request("data-ingestion").put(
        `${ENDPOINTS.PRIVATE.BASE_POSTGRES_ENDPOINT}${props.tableName}`,
        {
            data: {
                id: props.id,
                entry: props.entry,
            },
        }
    );
};
