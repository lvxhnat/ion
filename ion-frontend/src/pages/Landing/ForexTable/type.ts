export interface ForexTableDataType {
    time: Date
    instrument: string
    closeoutBid: number
    closeoutAsk: number
    bids?: Array<{price: string, liquidity: number}>
    asks?: Array<{price: string, liquidity: number}>
}