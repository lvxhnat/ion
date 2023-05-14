import * as React from 'react'

import Typography from '@mui/material/Typography'

import { CountryFlags } from 'common/constant/countries'
import { useGeopoliticStore } from 'store/geopolitics/geopolitics'

export default function GeopoliticMetadata() {
    const selection: keyof typeof CountryFlags | null = useGeopoliticStore(state => state.selection)
  return (
    <div>
        {
            selection ? 
            <div style={{ display: 'flex', gap: 5 }}>
                <img src={CountryFlags[selection].url} style={{ width: '25px'}} />
                <Typography variant="subtitle2"> {CountryFlags[selection].country} </Typography>
            </div> : 
            null
        }
    </div>
  )
}
