import { CountryFlags } from 'common/constant/countries';
import { create } from 'zustand';

export interface GeopoliticStoreType {
    selection: keyof typeof CountryFlags | null;
    setSelection: (selection: keyof typeof CountryFlags) => void;
}

export const useGeopoliticStore = create<GeopoliticStoreType>(set => ({
    selection: null,
    setSelection: (selection: keyof typeof CountryFlags) => set({ selection: selection }),
}));
