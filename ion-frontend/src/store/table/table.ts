import { UploadDataType } from 'components/Tables/DataTable/type';
import { create } from 'zustand';

interface FieldsDeclaredType {
    rows: Set<number>;
    columns: Set<number>;
}

interface AnalysisStoreTypes {
    data: UploadDataType;
    dragStarted: boolean;
    fieldsDeclared: FieldsDeclaredType;
    dataTableRetrievingState: boolean;
    setData: (data: UploadDataType) => void;
    setDragStarted: (dragStarted: boolean) => void;
    setFieldsDeclared: (fieldsDeclared: FieldsDeclaredType) => void;
    setDataTableRetrievingState: (state: boolean) => void;
}

export const analysisStore = create<AnalysisStoreTypes>(set => ({
    data: {
        file_name: '',
        file_rows: 0,
        content_body: [],
        content_header: [],
        dtypes: {},
    },
    dataTableRetrievingState: false,
    fieldsDeclared: {
        rows: new Set(),
        columns: new Set(),
    }, // Store for the current fields chosen by the user, done by the drag action.
    dragStarted: false, // Store for whether or not a drag action has started
    setData: (data: UploadDataType) => set({ data: data }),
    setDragStarted: (dragStarted: boolean) => set({ dragStarted: dragStarted }),
    setDataTableRetrievingState: (state: boolean) => ({ state: state }),
    setFieldsDeclared: (fieldsDeclared: FieldsDeclaredType) =>
        set({ fieldsDeclared: fieldsDeclared }),
}));

export const useAnalysisStore = (): [UploadDataType, (data: UploadDataType) => void] =>
    analysisStore(state => [state.data, state.setData]);

export const useAnalysisDragStore = (): [boolean, (dragStarted: boolean) => void] =>
    analysisStore(state => [state.dragStarted, state.setDragStarted]);

export const useRetrievingStateStore = (): [boolean, (state: boolean) => void] =>
    analysisStore(state => [state.dataTableRetrievingState, state.setDataTableRetrievingState]);

export const useAnalysisFieldsDeclared = (): [
    FieldsDeclaredType,
    (fieldsDeclared: FieldsDeclaredType) => void
] => analysisStore(state => [state.fieldsDeclared, state.setFieldsDeclared]);

interface UploadStoreTypes {
    page: number;
    setPage: (page: number) => void;
}

export const uploadStore = create<UploadStoreTypes>(set => ({
    page: 0,
    setPage: (page: number) => set({ page: page }),
}));

export const useUploadPage = (): [number, (page: number) => void] =>
    uploadStore(state => [state.page, state.setPage]);