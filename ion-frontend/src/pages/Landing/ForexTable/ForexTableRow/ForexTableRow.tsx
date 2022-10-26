/**
 * Streams Forex Data into table rows using a plugin architecture
 */

import React from 'react'
import { forexStreamStore } from 'store/prices/prices'

export default function ForexTableRow() {
    const forexStream = forexStreamStore((store: any) => store.forexStream)
    console.log(forexStream)
    return (
        <div>

        </div>
    )
}
