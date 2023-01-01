import { DataType } from 'components/Tables/DataTable/type';
import create from 'zustand';

interface FieldsDeclaredType {
    rows: Set<number>;
    columns: Set<number>;
}

interface AnalysisStoreTypes {
    data: DataType;
    fieldsDeclared: FieldsDeclaredType;
    dragStarted: boolean;
    setData: (data: DataType) => void;
    setDragStarted: (dragStarted: boolean) => void;
    setFieldsDeclared: (fieldsDeclared: FieldsDeclaredType) => void;
}

export const analysisStore = create<AnalysisStoreTypes>(set => ({
    data: {
        file_name: '',
        content_body: [],
        content_header: [],
    },
    fieldsDeclared: {
        rows: new Set(),
        columns: new Set(),
    }, // Store for the current fields chosen by the user, done by the drag action.
    dragStarted: false, // Store for whether or not a drag action has started
    setData: (data: DataType) => set({ data: data }),
    setDragStarted: (dragStarted: boolean) => set({ dragStarted: dragStarted }),
    setFieldsDeclared: (fieldsDeclared: FieldsDeclaredType) =>
        set({ fieldsDeclared: fieldsDeclared }),
}));

export const useAnalysisStore = (): [DataType, (data: DataType) => void] =>
    analysisStore(state => [state.data, state.setData]);

export const useAnalysisDragStore = (): [boolean, (dragStarted: boolean) => void] =>
    analysisStore(state => [state.dragStarted, state.setDragStarted]);

export const useAnalysisFieldsDeclared = (): [
    FieldsDeclaredType,
    (fieldsDeclared: FieldsDeclaredType) => void
] => analysisStore(state => [state.fieldsDeclared, state.setFieldsDeclared]);
