import * as React from 'react';

import { CssBaseline, Grid } from '@mui/material';
import Navigation from 'components/Navigation';
import Createbar from './createbar';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: '100%',
    color: theme.palette.text.secondary,
}));

function FormRow() {
    return (
        <React.Fragment>
            <Grid item xs={4}>
                <Item>Item</Item>
            </Grid>
            <Grid item xs={4}>
                <Item>Item</Item>
            </Grid>
            <Grid item xs={4}>
                <Item>Item</Item>
            </Grid>
        </React.Fragment>
    );
}

export default function Page() {
    const [selectedGridId, setSelectedGridId] = React.useState<[number, number]>([0, 0]);
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <CssBaseline />
            <Navigation />
            <Createbar gridSelector={[selectedGridId, setSelectedGridId]} />
            <Box sx={{ flexGrow: 1, height: '100%', padding: 1 }}>
                <Grid container spacing={1} style={{ height: '100%' }}>
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
                                            <Grid item xs={4} key={`containerGridItem_${c_index}`}>
                                                <Item>Item</Item>
                                            </Grid>
                                        );
                                    }
                                )}
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </div>
    );
}
