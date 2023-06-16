import { ENDPOINTS } from 'endpoints/endpoints';
import { dataIngestionRequest } from 'services/request';

export interface FredEntry {
    id: number;
    parent_id: number;
    name: string;
    last_updated: string;
}

export type FredParentNodeDTO = { parent_node: FredEntry; child_node: FredEntry[] }[];

export const getFredParentNodes = () => {
    return dataIngestionRequest.get<FredParentNodeDTO>(
        ENDPOINTS.PRIVATE.FRED_PARENT_NODES_ENDPOINT
    );
};

export interface FredChildNodeDTO {
    type: 'series' | 'category';
    data: FredEntry[];
}

export const getFredChildNodes = (category_id: number) => {
    return dataIngestionRequest.post<FredChildNodeDTO>(
        ENDPOINTS.PRIVATE.FRED_CHILD_NODES_ENDPOINT,
        {
            category_id: category_id,
        }
    );
};
