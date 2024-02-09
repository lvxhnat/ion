import BaseSocket from 'common/sockets/BaseSocket';
import { ForexStreamType } from 'pages/Landing/forextable/type';

function unpackOandaFXStream(oandaStreamObject: string): ForexStreamType | null {
    const priceStream: any = JSON.parse(oandaStreamObject);
    if (priceStream.type === 'HEARTBEAT') return null;
    else {
        const closeoutBid: number = parseFloat(priceStream.closeoutBid);
        const closeoutAsk: number = parseFloat(priceStream.closeoutAsk);
        return {
            instrument: priceStream.instrument,
            closeoutBid,
            closeoutAsk,
            spread: Math.abs(closeoutBid - closeoutAsk).toFixed(5),
        };
    }
}

export class OandaFXSocketConnection extends BaseSocket {
    listen(callback: (...args: any[]) => void) {
        this._socket.addEventListener('message', function (event: any) {
            callback(unpackOandaFXStream(event.data));
        });
    }
}
