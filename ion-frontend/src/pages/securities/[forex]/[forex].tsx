import * as React from 'react';

import { CssBaseline, Grid } from '@mui/material';
import TSChart from 'components/Charting/TSChart';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { useHeaderStore } from 'store/header/header';
import { useParams } from 'react-router-dom';

interface ForexConfigProps {
    symbol: string;
    interval: string;
}

export default function Forex(): React.ReactElement {
    const [config, setConfig] = React.useState<ForexConfigProps>({} as ForexConfigProps);
    const setHeader = useHeaderStore(store => store.setHeader);
    const params = useParams();

    React.useEffect(() => {
        if (params.symbolId) {
            setHeader({ data: params.symbolId });
        }
        return () => setHeader({ data: '' });
    }, []);

    if (params.symbolId) {
        return (
            <Grid sx={{ overflow: 'hidden' }}>
                <CssBaseline />
                <Header />
                <TSChart />
                <Footer dataStreamProvider={'oanda'} />
            </Grid>
        );
    } else {
        return <></>;
    }
}
