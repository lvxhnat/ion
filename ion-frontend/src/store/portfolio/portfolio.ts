import { PortfolioTableEntry } from 'endpoints/schema/database/postgres/portfolio/props';
import { create } from 'zustand';

interface PortfolioProps extends PortfolioTableEntry { }

type PortfoliosProps = PortfolioProps[];

interface PortfolioStoreTypes {
    portfolios: PortfolioTableEntry[];
    selectedPortfolio: PortfolioTableEntry | {};
    setPortfolio: (config: PortfolioProps) => void;
    setPortfolios: (config: PortfoliosProps) => void;
    setSelectedPortfolio: (config: PortfolioProps) => void;
}

export const usePortfolioStore = create<PortfolioStoreTypes>(set => ({
    portfolios: [],
    selectedPortfolio: {},
    setPortfolio: (props: PortfolioProps) => {
        return set((state: PortfolioStoreTypes) => {
            return {
                portfolios: [...state.portfolios, props],
            };
        });
    },
    setPortfolios: (props: PortfoliosProps) => set({ portfolios: props }),
    setSelectedPortfolio: (props: PortfolioProps) => set({ selectedPortfolio: props }),
}));
