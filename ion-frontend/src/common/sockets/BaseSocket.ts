export default class BaseSocket {
    _socket: WebSocket;
    _connectionStates: { [index: number]: string } = {
        0: 'CONNECTING',
        1: 'OPEN',
        2: 'CLOSING',
        3: 'CLOSED',
    };

    _socketName: string;

    constructor({
        socketURL,
        socket,
        name,
    }: {
        socketURL?: string;
        socket?: WebSocket;
        name?: string;
    }) {
        if (!socketURL && (socket == null))
            throw new Error(
                'Ensure that socket is initialised with either a url or an existing socket.'
            );
        if (socketURL && (socket != null))
            console.warn(
                'Socket URL and Socket initialised. Prioritising initialised Socket connection.'
            );
        this._socket = (socket != null) ? socket : new WebSocket(socketURL!);
        this._socketName = name || this.#generateUUID();
    }

    /**
     * Ping and Check for Connection Status
     */
    checkConnectionStatus() {
        const connectionStatus: number = this._socket.readyState;
        console.log('WEBSOCKET STATUS IS CURRENTLY ' + this._connectionStates[connectionStatus]);
    }

    listen(callback: (...args: any[]) => void) {
        this._socket.addEventListener('message', function (event: any) {
            callback(event.data);
        });
    }

    close() {
        this._socket.close();
    }

    #generateUUID() {
        let d = new Date().getTime();
        let d2 =
            (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) ||
            0; // Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
    }
}
