import { PortfolioTableEntry } from 'endpoints/schema/database/postgres/portfolio/props';
import { create } from 'zustand';

interface PortfolioProps extends PortfolioTableEntry {}

interface PortfolioStoreTypes {
    portfolios: PortfolioTableEntry[];
    setPortfolios: (config: PortfolioProps) => void;
}

export const usePortfolioStore = create<PortfolioStoreTypes>(set => ({
    portfolios: [],
    setPortfolios: (props: PortfolioProps) => {
        return set((state: PortfolioStoreTypes) => {
            return {
                portfolios: [...state.portfolios, props],
            };
        });
    },
}));
