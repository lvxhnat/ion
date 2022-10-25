import { ENDPOINTS } from 'common/constant/endpoints'
import React, { useEffect } from 'react'
import { OandaFXSocketConnection } from './_helpers/oanda/oanda'

export default function ForexTable() {

    useEffect(() => {
        const url = process.env.REACT_APP_WEBSOCKET_URL
        if (url) {
            const oandaWS = new OandaFXSocketConnection({
                socketURL: url + ENDPOINTS.PRIVATE.OANDA_FX_STREAMING_ENDPOINT,
                name: "OandaFXSocketConnection"
            })
        }
    })

    return (
        <div>ForexTable</div>
    )
}
