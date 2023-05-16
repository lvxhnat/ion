import { PortfolioTableEntry } from 'endpoints/schema/database/postgres/portfolio/props';
import { create } from 'zustand';

interface PortfolioProps extends PortfolioTableEntry { }

type PortfoliosProps = PortfolioProps[];

interface PortfolioStoreTypes {
    portfolios: PortfolioTableEntry[];
    selectedPortfolio: PortfolioTableEntry | {};
    addPortfolio: (props: PortfolioProps) => void;
    deletePortfolio: (uuid: string) => void;
    setPortfolios: (config: PortfoliosProps) => void;
    setSelectedPortfolio: (config: PortfolioProps) => void;
    clearSelectedPortfolio: () => void;
}

export const usePortfolioStore = create<PortfolioStoreTypes>(set => ({
    selectedPortfolio: {},
    setSelectedPortfolio: (props: PortfolioProps | {}) => set({ selectedPortfolio: props }),
    clearSelectedPortfolio: () => set({ selectedPortfolio: {} }),
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
                portfolios: state.portfolios.filter((entry) => entry.uuid !== uuid)
            }
        })
    },
    setPortfolios: (props: PortfoliosProps) => set({ portfolios: props }), // Refresh entire portfolio store
}));
