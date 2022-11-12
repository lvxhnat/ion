import { ForexStreamType, FormattedForexStreamType } from 'pages/Landing/ForexTable/type';
import create from 'zustand';

function omit(obj: any, key: string) {
    delete obj[key];
    return obj;
}
export const forexStreamStore = create(set => ({
    forexStream: {},
    setForexStream: (streamObject: ForexStreamType) =>
        // If streamObject is empty (heartbeat message or market closed), then we do not perform any actions
        set((state: any) => {
            // Check if the stream object is null or not
            const prev: FormattedForexStreamType = streamObject
                ? state.forexStream[streamObject.instrument]
                : null;
            return streamObject
                ? {
                      forexStream: {
                          ...state.forexStream,
                          [streamObject.instrument]: {
                              ...omit(streamObject, 'instrument'),
                              // Compare the previous value with the current value, and return -1, 0 or 1
                              bid_change: prev
                                  ? streamObject.closeoutBid - prev.closeoutBid > 0
                                      ? 1
                                      : -1
                                  : 0,
                              ask_change: prev
                                  ? streamObject.closeoutAsk - prev.closeoutAsk > 0
                                      ? 1
                                      : -1
                                  : 0,
                          },
                      },
                  }
                : null;
        }),
}));
