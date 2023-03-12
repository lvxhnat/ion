import { Types } from 'common/theme/components/icons';

export interface IngestionDataType {
    file_name: string;
    file_rows: number;
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
