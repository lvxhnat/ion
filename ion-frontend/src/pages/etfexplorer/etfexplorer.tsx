import * as React from 'react';
import * as S from './style';

import { CssBaseline } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { getETFAssetTypes, getETFInfos } from 'data/ingestion/autocomplete';
import { UploadDataType } from 'components/Tables/DataTable/type';
import { DataTable } from 'components/Tables/DataTable';
import Navigation from 'components/Navigation';
import { getETFInfo } from 'data/ingestion/etf';
import { ETFDataSchema } from 'data/schema/etf';
import { getETFCandles } from 'data/ingestion/candles';
import { FinnhubCandlesSchema } from 'data/schema/candles';
import ETFViewer from './etfviewer';

export default function ETFExplorer() {
    const [selection, setSelection] = React.useState<string>();
    const [ticker, setTicker] = React.useState<string>('QQQ');
    const [etfData, setETFData] = React.useState<ETFDataSchema>();
    const [etfCandlesData, setETFCandlesData] = React.useState<FinnhubCandlesSchema>([]);
    const [categories, setCategories] = React.useState<string[]>([]);
    const [categoryData, setCategoryData] = React.useState<UploadDataType>({} as UploadDataType);
    const [categorySelected, setCategorySelected] = React.useState<string>('All');

    React.useEffect(() => {
        getETFAssetTypes().then(res => {
            setCategories(res.data);
        });
        getInfos();
    }, []);

    React.useEffect(() => {
        getETFInfo(ticker).then(res => {
            setETFData(res.data);
        });
        getETFCandles(ticker).then(res => {
            if (res.data) setETFCandlesData(res.data[0]);
        });
    }, [ticker]);

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
                content_body: res.data.map(entry => {
                    let newEntry: any = { ...entry };
                    if (newEntry.id) delete newEntry.id;
                    newEntry.id = newEntry.ticker;
                    return newEntry;
                }),
            });
        });
    }

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
            <Navigation />
            <Grid container columns={25}>
                {categoryData.content_body && !selection ? (
                    <>
                        <Grid item xs={3}>
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
                                            label={
                                                <Typography variant="subtitle2">{label}</Typography>
                                            }
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={22} sx={{ paddingRight: 2 }}>
                            <DataTable
                                rowOnClickFunctions={(entryId: string) => {
                                    setSelection(entryId);
                                    setTicker(entryId);
                                }}
                                hideBasel
                                stickyHeader
                                boldHeader
                                data={categoryData}
                            />
                        </Grid>
                    </>
                ) : null}
                {selection ? (
                    <div style={{ padding: 15, width: '100%' }}>
                        <ETFViewer
                            ticker={ticker}
                            etfData={etfData}
                            setSelection={setSelection}
                            etfCandlesData={etfCandlesData}
                        />
                    </div>
                ) : null}
            </Grid>
        </>
    );
}
