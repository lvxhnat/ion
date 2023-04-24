import { create } from 'zustand';

export interface PortfolioSpecificationType {
    name: string;
    description: string;
    currency: string;
}
interface PortfolioProps {
    name: string;
    description: string;
    currency: string;
}

interface PortfolioStoreTypes {
    portfolios: PortfolioSpecificationType[];
    setPortfolios: (config: PortfolioProps) => void;
}

export const usePortfolioStore = create<PortfolioStoreTypes>(set => ({
    portfolios: [],
    setPortfolios: (props: PortfolioProps) => {
        return set((state: PortfolioStoreTypes) => {
            return {
                portfolios: [
                    ...state.portfolios,
                    {
                        name: props.name,
                        description: props.description,
                        currency: props.currency,
                    },
                ],
            };
        });
    },
}));
