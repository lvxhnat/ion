import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';
import { Types } from 'common/theme/components/icons';

export interface IngestionDataType {
    file_name: string;
    content_header: string[];
    content_body: any[][];
    dtypes: {
        [header: string]: IngestionDtypeObjectType;
    };
}

export interface IngestionDtypeObjectType {
    name: string;
    types: { [column in Types]: number };
    nullable: boolean;
    type_guessed: Types;
}

export const ingestFile = (file: FormData, configs: any) => {
    return dataIngestionRequest.post<IngestionDataType>(
        ENDPOINTS.PRIVATE.INGEST_DATA,
        file,
        configs
    );
};

export interface UserUploadObjectType {
    file_format: string;
    file_name: string;
    file_size: number;
    table_id: string;
    upload_date: string;
    user_id: string;
}

export const retrieveUserUploads = (user_id: string) => {
    return dataIngestionRequest.post<UserUploadObjectType[]>(ENDPOINTS.PRIVATE.QUERY_USER_UPLOADS, {
        user_id: user_id,
    });
};
