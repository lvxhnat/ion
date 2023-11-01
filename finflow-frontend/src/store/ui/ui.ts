import { create } from 'zustand';

interface DrawerStoreTypes {
    drawerOpen: boolean;
    setDrawerOpen: (drawerOpen: boolean) => void;
}

export const useDrawerStore = create<DrawerStoreTypes>(set => ({
    drawerOpen: false,
    setDrawerOpen: (drawerOpen: boolean) => set({ drawerOpen: drawerOpen }),
}));
