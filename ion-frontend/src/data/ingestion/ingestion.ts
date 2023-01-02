import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';
import { UploadColumnTypes } from 'components/Tables/DataTable/type';

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
    types: { [column in UploadColumnTypes]: number };
    nullable: boolean;
    type_guessed: UploadColumnTypes;
}

export const ingestFile = (file: FormData, configs: any) => {
    return dataIngestionRequest.post<IngestionDataType>(
        ENDPOINTS.PRIVATE.INGEST_DATA,
        file,
        configs
    );
};
