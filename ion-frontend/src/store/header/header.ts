import create from 'zustand';

interface HeaderTypes {
    data: string;
}

interface HeaderStoreTypes {
    header: HeaderTypes;
    setHeader: (config: TopHeaderStoreProps) => void;
}

interface TopHeaderStoreProps {
    data: string;
}

export const useHeaderStore = create<HeaderStoreTypes>(set => ({
    header: { data: '' },
    setHeader: (props: TopHeaderStoreProps) =>
        // If streamObject is empty (heartbeat message or market closed), then we do not perform any actions
        set({ header: { data: props.data } }),
}));
