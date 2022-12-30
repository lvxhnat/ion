import { DataType } from 'components/Tables/DataTable/type';
import create from 'zustand';

interface AnalysisStoreTypes {
    data: DataType;
    setData: (data: DataType) => void;
}

export const analysisStore = create<AnalysisStoreTypes>(set => ({
    data: {
        file_name: '',
        content_body: [],
        content_header: [],
    },
    setData: (data: DataType) => set({ data: data }),
}));

export const useAnalysisStore = (): [DataType, (data: DataType) => void] =>
    analysisStore(state => [state.data, state.setData]);
