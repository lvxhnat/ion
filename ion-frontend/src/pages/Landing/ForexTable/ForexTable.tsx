import { ENDPOINTS } from 'common/constant/endpoints'
import React, { useEffect } from 'react'
import { forexStreamStore } from 'store/prices/prices'
import ForexTableRow from './ForexTableRow'
import { OandaFXSocketConnection, unpackOandaFXStream } from './_helpers/oanda/oanda'

export default function ForexTable() {

    const setForexStream = forexStreamStore((store: any) => store.setForexStream)

    useEffect(() => {
        const url = process.env.REACT_APP_WEBSOCKET_URL
        if (url) {
            const oandaWS = new OandaFXSocketConnection({
                socketURL: url + ENDPOINTS.PRIVATE.OANDA_FX_STREAMING_ENDPOINT,
                name: "OandaFXSocketConnection"
            })
            oandaWS.listen((x: any) => setForexStream(unpackOandaFXStream(x)))
        }
    })

    return (
        <div>
            <ForexTableRow />
        </div>
    )
}
