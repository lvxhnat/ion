export interface OandaPriceStreamObjectTypes {
    type: string 
    time: string 
    bids: Array<{price: string, liquidity: number}>
    asks: Array<{price: string, liquidity: number}>
    closeoutBid: string 
    closeoutAsk: string
    status: string
    tradeable: boolean
    instrument: string
}