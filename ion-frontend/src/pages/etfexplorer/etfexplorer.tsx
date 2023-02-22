import * as React from 'react';
import * as S from './style';

import { CssBaseline, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
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
import BaseLineChart from 'components/Charting/BaseChart';
import { getETFInfo } from 'data/ingestion/etf';
import { ETFDataSchema } from 'data/schema/etf';
import { getETFCandles } from 'data/ingestion/candles';
import { FinnhubCandlesEntrySchema, FinnhubCandlesSchema } from 'data/schema/candles';
import WidgetContainer from 'components/WidgetContainer';

function ModifiedTable(props: { entry: any; title: string }) {
    return (
        <div style={{ paddingTop: 10 }}>
            <Typography variant="subtitle1">
                <b>{props.title}</b>
            </Typography>
            <Table>
                {props.entry.type === 'table-vertical' ? (
                    <TableHead>
                        <TableRow>
                            {Object.keys(props.entry.data[0]).map((column: string) => (
                                <TableCell
                                    sx={{ padding: 0.5 }}
                                    key={`${props.title}_header_${column}`}
                                >
                                    <Typography
                                        key={`${props.title}_header_typo_${column}`}
                                        variant="subtitle2"
                                    >
                                        {' '}
                                        {column}{' '}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                ) : null}
                <TableBody>
                    {props.entry.type !== 'table-vertical'
                        ? Object.keys(props.entry.data).map((column: string, index: number) => {
                              const cell_id_2_content: string | null =
                                  props.entry.type === 'table-horizontal'
                                      ? props.entry.data[column][0]
                                      : props.entry.type === 'list'
                                      ? props.entry.data[column].text
                                      : null;

                              const cell_id_1: string = `${props.title}_${column}_${index}`;
                              const cell_id_2: string = `${cell_id_2_content}_${column}`;

                              return (
                                  <TableRow key={`${props.title}_mainrow_${index}`}>
                                      <TableCell sx={{ padding: 0.5 }} key={cell_id_1}>
                                          <Typography variant="subtitle2" key={`${cell_id_1}_typo`}>
                                              {column}
                                          </Typography>
                                      </TableCell>
                                      <TableCell sx={{ padding: 0.5 }} key={cell_id_2}>
                                          <Typography
                                              variant="subtitle2"
                                              align="right"
                                              key={`${cell_id_2}_typo`}
                                          >
                                              {cell_id_2_content}
                                          </Typography>
                                      </TableCell>
                                  </TableRow>
                              );
                          })
                        : props.entry.data.map((entry: any, index: number) => {
                              return (
                                  <TableRow key={`${props.title}_mainrow_${index}`}>
                                      {Object.keys(entry).map((column: string) => (
                                          <TableCell
                                              sx={{ padding: 0.5 }}
                                              key={`${column}_${index}`}
                                          >
                                              <Typography
                                                  key={`${column}_typo_${index}`}
                                                  variant="subtitle2"
                                              >
                                                  {entry[column]}
                                              </Typography>
                                          </TableCell>
                                      ))}
                                  </TableRow>
                              );
                          })}
                </TableBody>
            </Table>
        </div>
    );
}

export default function ETFExplorer() {
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
    }, []);

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
            <Grid container columns={20} sx={{ overflowY: 'hidden' }}>
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
                                    label={<Typography variant="subtitle2">{label}</Typography>}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={17} sx={{ paddingRight: 2 }}>
                    {etfData ? (
                        <>
                            <S.TitleWrapper>
                                <S.TickerWrapper>
                                    <Typography variant="subtitle2">
                                        <b>{ticker}</b>
                                    </Typography>
                                </S.TickerWrapper>
                                <Typography variant="h2" sx={{ padding: 1 }}>
                                    {etfData.info.vitals.data.Brand.text}
                                </Typography>
                            </S.TitleWrapper>
                            <Typography variant="subtitle1" sx={{ padding: 1 }}>
                                {etfData.info.analyst_report}
                            </Typography>
                            <Grid container columns={20} columnSpacing={2}>
                                <Grid item xs={4}>
                                    <ModifiedTable entry={etfData.info.vitals} title="Vitals" />
                                    <ModifiedTable
                                        entry={etfData.info.historical_trade_data}
                                        title="Historical Trading Data"
                                    />
                                </Grid>
                                <Grid item xs={16}>
                                    <Grid container columnSpacing={2}>
                                        <div style={{ width: '100%' }}>
                                            <WidgetContainer title="past_1y_historical">
                                                {etfCandlesData.length !== 0 ? (
                                                    <BaseLineChart
                                                        showAxis
                                                        showAverage
                                                        showTooltip
                                                        baseId={`svg-container`}
                                                        width={200}
                                                        height={30}
                                                        strokeWidth="0.2px"
                                                        margin={{
                                                            top: 2,
                                                            right: 0,
                                                            bottom: 2,
                                                            left: 8,
                                                        }}
                                                        defaultData={{
                                                            id: 'base-line',
                                                            name: 'Base Line Chart',
                                                            parent: true,
                                                            dataX: etfCandlesData.map(
                                                                (
                                                                    entry: FinnhubCandlesEntrySchema
                                                                ) => new Date(entry.date * 1000)
                                                            ),
                                                            dataY: etfCandlesData.map(
                                                                (
                                                                    entry: FinnhubCandlesEntrySchema
                                                                ) => entry.close
                                                            ),
                                                            color: 'white',
                                                            type: 'line',
                                                        }}
                                                    />
                                                ) : null}
                                            </WidgetContainer>
                                        </div>
                                        <Grid item xs={6}>
                                            <ModifiedTable
                                                entry={etfData.info.dbtheme}
                                                title="Database Theme"
                                            />
                                            <ModifiedTable
                                                entry={etfData.info.alternative_etfs}
                                                title="Alternative ETFs"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <ModifiedTable
                                                entry={etfData.info.fact_set}
                                                title="Factset Table"
                                            />
                                            <ModifiedTable
                                                entry={etfData.info.other_alternative_etfs}
                                                title="Other Alternative ETFs"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    ) : null}
                    {categoryData.content_body ? (
                        <DataTable hideBasel stickyHeader boldHeader data={categoryData} />
                    ) : null}
                </Grid>
            </Grid>
        </>
    );
}
