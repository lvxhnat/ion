import * as React from 'react';

import { CssBaseline, Grid } from '@mui/material';
import Navigation from 'components/Navigation';
import Createbar from './createbar';
import Box from '@mui/material/Box';
import { useWatchlistStore } from 'store/prices/watchlist';
import Chartview from 'components/Analysis/Chartview';

export default function Page() {
    const selectedGridId: [number, number] = useWatchlistStore(store => store.gridSelected);
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <CssBaseline />
            <Navigation />
            <Createbar />
            <Grid
                container
                spacing={1}
                style={{ height: '75vh', paddingLeft: 10, paddingRight: 10 }}
            >
                {[...Array(selectedGridId[0] + 1).keys()].map((_: number, r_index: number) => {
                    // This maps over the number of rows, followed by the number of columns required to generate the grid boxes.
                    return (
                        <Grid
                            container
                            item
                            spacing={1}
                            key={`containerGrid_${r_index}`}
                            columns={4 * (selectedGridId[1] + 1)}
                        >
                            {[...Array(selectedGridId[1] + 1).keys()].map(
                                (_: number, c_index: number) => {
                                    return (
                                        <Grid item xs={4} key={`containerGridItem_${c_index}`} 
                                        style={{ height: `${90/(selectedGridId[0] + 1)}vh`}}>
                                            {c_index === 0 ? (
                                                <Chartview ticker="SPY" />
                                            ) : (
                                                <Chartview />
                                            )}
                                        </Grid>
                                    );
                                }
                            )}
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}
