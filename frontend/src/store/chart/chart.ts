import { create } from "zustand";

export interface DefaultDataProps {
  id: string;
  name: string;
  parent: boolean;
  dataX: Date[];
  dataY: number[];
  color: string;
}

export const emptyDefaultDataProps = () => {
  return {
    id: "line",
    name: "",
    parent: true,
    dataX: [],
    dataY: [],
    color: "white",
  } as DefaultDataProps;
};

/**
 * Stores the ticker data that is shown on the grid (i.e. The ticker time series)
 */
export interface TickerDataStoreTypes {
  data: {
    [ticker: string]: DefaultDataProps;
  };
  setData: (props: { ticker: string; data: DefaultDataProps }) => void;
}

export const useTickerDataStore = create<TickerDataStoreTypes>((set) => ({
  data: {},
  setData: (props: { ticker: string; data: DefaultDataProps }) => {
    return set((state: TickerDataStoreTypes) => {
      return {
        data: {
          ...state.data,
          [props.ticker]: props.data,
        },
      };
    });
  },
}));
