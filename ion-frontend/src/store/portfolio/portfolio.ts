import { PortfolioTableEntry } from 'endpoints/schema/database/postgres/portfolio';
import { create } from 'zustand';

interface PortfolioProps extends PortfolioTableEntry { }

type PortfoliosProps = PortfolioProps[];

interface PortfolioStoreTypes {
    portfolios: PortfolioTableEntry[];
    selectedPortfolio: PortfolioTableEntry;
    addPortfolio: (props: PortfolioProps) => void;
    deletePortfolio: (uuid: string) => void;
    setPortfolios: (config: PortfoliosProps) => void;
    setSelectedPortfolio: (config: PortfolioProps) => void;
    clearSelectedPortfolio: () => void;
}

export const usePortfolioStore = create<PortfolioStoreTypes>(set => ({
    selectedPortfolio: {} as PortfolioTableEntry,
    setSelectedPortfolio: (props: PortfolioProps) => set({ selectedPortfolio: props }),
    clearSelectedPortfolio: () => set({ selectedPortfolio: {} as PortfolioTableEntry }),
    portfolios: [],
    addPortfolio: (props: PortfolioProps) => {
        return set((state: PortfolioStoreTypes) => {
            return {
                portfolios: [...state.portfolios, props],
            };
        });
    },
    deletePortfolio: (uuid: string) => {
        return set((state: PortfolioStoreTypes) => {
            return {
                portfolios: state.portfolios.filter(entry => entry.uuid !== uuid),
            };
        });
    },
    setPortfolios: (props: PortfoliosProps) => set({ portfolios: props }), // Refresh entire portfolio store
}));
