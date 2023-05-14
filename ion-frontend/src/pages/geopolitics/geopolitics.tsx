import * as React from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import Navigation from 'components/Navigation'
import Geopoliticview from 'components/Analysis/Geopoliticview/Geopoliticview'

export default function Geopolitics() {
  return (
    <div>
      <CssBaseline />
      <Navigation />
      <Geopoliticview />
    </div>
  )
}
