import * as React from 'react';
import * as d3 from 'd3';
import Chloropleth from 'components/Charting/Chloropleth/Chloropleth';
import GeopoliticMetadata from './GeopoliticMetadata';

export default function Geopoliticview() {
    const [geo, setGeo] = React.useState<any>();

    React.useEffect(() => {
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then((data: any) => {
            data['features'] = data.features.filter((entry: any) => (entry.id !== 'ATA'))
            setGeo(data);
        })
    }, [])
  return (
    <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ width: '50%' }}> </div>
        <div style={{ width: '50%' }}>
            { geo ? <Chloropleth baseId={'geopolitics'} geoData={geo} /> : null }
            <GeopoliticMetadata />
        </div>
    </div>
  )
}
