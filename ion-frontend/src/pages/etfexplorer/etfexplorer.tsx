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
import { getETFAssetTypes, getETFInfos } from 'data/ingestion/autocomplete';
import { UploadDataType } from 'components/Tables/DataTable/type';
import { DataTable } from 'components/Tables/DataTable';
import { ETFInfoDTO } from 'data/schema/autocomplete';

export default function ETFExplorer() {
    const [categories, setCategories] = React.useState<string[]>([]);
    const [categoryData, setCategoryData] = React.useState<UploadDataType>({} as UploadDataType);
    const [categorySelected, setCategorySelected] = React.useState<string>('All');

    function getInfos() {
        getETFInfos({
            filter: [{ asset_class: categorySelected }],
            sort: [{ ticker: 1 }],
        }).then(res => {
            setCategoryData({
                file_name: '',
                file_rows: res.data.length,
                dtypes: {},
                content_header: Object.keys(res.data[0]).map((column: string) => {
                    return { id: column, headerName: column };
                }),
                content_body: res.data,
            });
        });
    }

    React.useEffect(() => {
        getETFAssetTypes().then(res => {
            setCategories(res.data);
        });
        getInfos();
    }, []);

    const handleClick = (label: string) => {
        setCategorySelected(label);
        getInfos();
    };

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
                                    key={label}
                                    value={label}
                                    onClick={() => handleClick(label)}
                                    control={<Radio size="small" sx={{ padding: 0.5 }} />}
                                    label={<Typography variant="subtitle2">{label}</Typography>}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={10} sx={{ paddingRight: 2 }}>
                    {categoryData.content_body ? (
                        <DataTable hideBasel stickyHeader boldHeader data={categoryData} />
                    ) : null}
                </Grid>
            </Grid>
        </>
    );
}
