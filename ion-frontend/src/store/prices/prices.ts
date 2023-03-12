import { ForexStreamType, FormattedForexStreamType } from 'functions/forextable/type';
import { create } from 'zustand';

interface ForexStreamStoreTypes {
    forexStream: { [ticker: string]: FormattedForexStreamType };
    setForexStream: (config: ForexStreamType) => void;
}

function omit(obj: any, key: string) {
    delete obj[key];
    return obj;
}

export const forexStreamStore = create<ForexStreamStoreTypes>(set => ({
    forexStream: {},
    setForexStream: (streamObject: ForexStreamType) =>
        // If streamObject is empty (heartbeat message or market closed), then we do not perform any actions
        set((state: ForexStreamStoreTypes) => {
            // Check if the stream object is null or not
            const prev: FormattedForexStreamType | null = streamObject
                ? state.forexStream[streamObject.instrument]
                : null;

            return streamObject
                ? {
                      forexStream: {
                          ...state.forexStream,
                          [streamObject.instrument]: {
                              ...omit(streamObject, 'instrument'),
                              // Compare the previous value with the current value, and return -1, 0 or 1
                              bid_change: prev ? streamObject.closeoutBid - prev.closeoutBid : 0,
                              ask_change: prev ? streamObject.closeoutAsk - prev.closeoutAsk : 0,
                          },
                      },
                  }
                : {};
        }),
}));
