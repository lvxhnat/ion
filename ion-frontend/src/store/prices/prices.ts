import { ForexTableDataType } from 'pages/Landing/ForexTable/type'
import create from 'zustand'

function omit(obj: any, key: string) {
    delete obj[key];
    return obj
}
export const forexStreamStore = create((set) => ({
    forexStream: {},
    setForexStream: (streamObject: ForexTableDataType) =>
        // If streamObject is empty (heartbeat message or market closed), then we do not perform any actions 
        set((state: any) => (streamObject ? { forexStream: { ...state.forexStream, [streamObject.instrument]: omit(streamObject, 'instrument'), } } : null )),
}))