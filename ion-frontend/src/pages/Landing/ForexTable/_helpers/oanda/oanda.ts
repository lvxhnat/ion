import BaseSocket from "common/sockets/BaseSocket";
import { OandaPriceStreamObjectTypes } from "common/types/clients/oanda";
import { ForexTableDataType } from "../../type";

export function unpackOandaFXStream(oandaStreamObject: string): ForexTableDataType | null {
    const priceStream: OandaPriceStreamObjectTypes = JSON.parse(oandaStreamObject);
    if (priceStream.type == "HEARTBEAT") return null; 
    else {
        return {
            time: new Date(Date.parse(priceStream.time)), 
            instrument: priceStream.instrument, 
            closeoutBid: parseFloat(priceStream.closeoutBid),
            closeoutAsk: parseFloat(priceStream.closeoutAsk),
        }
    }
}

export class OandaFXSocketConnection extends BaseSocket { }
