import create from 'zustand';

interface PortfolioSpecificationType {
    ticker: string;
    type: string;
}

interface PortfolioTypes {
    data: PortfolioSpecificationType[];
}

interface PortfolioStoreTypes {
    portfolio: PortfolioTypes;
    setPortfolio: (config: PortfolioStoreProps) => void;
}

interface PortfolioStoreProps {
    data: PortfolioSpecificationType;
}

export const useHeaderStore = create<PortfolioStoreTypes>(set => ({
    portfolio: { data: [] as PortfolioSpecificationType[] },
    setPortfolio: (props: PortfolioStoreProps) =>
        // If streamObject is empty (heartbeat message or market closed), then we do not perform any actions
        set((state: PortfolioStoreTypes) => {
            return { portfolio: { data: [...state.portfolio.data, props.data] } };
        }),
}));
