import * as React from 'react';

import { CssBaseline } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Header from 'components/Header';
import { getETFAssetTypes } from 'data/ingestion/autocomplete';

export default function ETFExplorer() {
    const [categories, setCategories] = React.useState<string[]>([]);
    const [categorySelected, setCategorySelected] = React.useState<string>('All');

    React.useEffect(() => {
        getETFAssetTypes().then(res => {
            setCategories(res.data);
        });
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategorySelected((event.target as HTMLInputElement).value);
    };

    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container>
                <Grid item xs={2}>
                    <FormControl sx={{ padding: 2 }}>
                        <FormLabel id="demo-form-control-label-placement">
                            <Typography variant="subtitle1">Asset Class</Typography>
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-form-control-label-placement"
                            name="position"
                            value={categorySelected}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value={'All'}
                                control={<Radio size="small" sx={{ padding: 0.5 }} />}
                                label={<Typography variant="subtitle2">All</Typography>}
                            />
                            {categories.map((label: string) => (
                                <FormControlLabel
                                    value={label}
                                    control={<Radio size="small" sx={{ padding: 0.5 }} />}
                                    label={<Typography variant="subtitle2">{label}</Typography>}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={9}></Grid>
            </Grid>
        </>
    );
}
