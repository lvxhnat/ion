import BaseSocket from 'common/sockets/BaseSocket';
import { OandaPriceStreamObjectTypes } from 'common/types/clients/oanda';
import { ForexStreamType } from '../type';

export function unpackOandaFXStream(oandaStreamObject: string): ForexStreamType | null {
    const priceStream: OandaPriceStreamObjectTypes = JSON.parse(oandaStreamObject);
    if (priceStream.type === 'HEARTBEAT') return null;
    else {
        const closeoutBid: number = parseFloat(priceStream.closeoutBid);
        const closeoutAsk: number = parseFloat(priceStream.closeoutAsk);
        return {
            instrument: priceStream.instrument,
            closeoutBid,
            closeoutAsk,
            spread: parseFloat(Math.abs(closeoutBid - closeoutAsk).toFixed(5)),
        };
    }
}

export class OandaFXSocketConnection extends BaseSocket {}