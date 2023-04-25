import * as d3 from 'd3';
import * as React from 'react';
import * as S from '../style';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Tooltip from '@mui/material/Tooltip';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import BaseLineChart from 'components/Charting/BaseChart';
import { EquityHistoricalDTO } from 'endpoints/schema/tickers';
import WidgetContainer from 'components/WidgetContainer';
import { ETFDataSchema } from 'endpoints/schema/etf';
import { ColorsEnum } from 'common/theme';
import Info from './info';
import { Skeleton } from '@mui/material';

export function ModifiedTable(props: { entry: any; title: string }) {
    if (props.entry)
        return (
            <div style={{ paddingTop: 10, width: '100%' }}>
                <Typography variant="subtitle1">
                    <b>{props.title}</b>
                </Typography>
                <Table style={{ width: '100%' }}>
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
                                              <Typography
                                                  noWrap
                                                  variant="subtitle2"
                                                  key={`${cell_id_1}_typo`}
                                              >
                                                  {column}
                                              </Typography>
                                          </TableCell>
                                          <TableCell sx={{ padding: 0.5 }} key={cell_id_2}>
                                              <Typography
                                                  noWrap
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
    else return <div></div>;
}

export interface ETFViewerProps {
    ticker: string;
    loading: boolean;
    etfData: ETFDataSchema | undefined;
    setSelection: Function;
    etfCandlesData: EquityHistoricalDTO[] | undefined;
}

export default function ETFViewer(props: ETFViewerProps) {
    if (props.etfCandlesData && props.etfData && !props.loading) {
        const diff =
            props.etfCandlesData[props.etfCandlesData.length - 1].close -
            props.etfCandlesData[props.etfCandlesData.length - 2].close;
        const pctDiff = (100 * diff) / props.etfCandlesData[props.etfCandlesData.length - 2].close;
        const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S');
        return (
            <>
                <Grid container columns={20}>
                    <Grid item xs={6}>
                        <S.TitleWrapper>
                            <S.IconButtonWrapper
                                disableRipple
                                onClick={() => props.setSelection(undefined)}
                            >
                                <ChevronLeftIcon fontSize="small" />
                            </S.IconButtonWrapper>
                            <S.TickerWrapper>
                                <Typography variant="subtitle2" align="center">
                                    <b>{props.ticker}</b>
                                </Typography>
                            </S.TickerWrapper>
                            <Tooltip sx={{ padding: 1 }} title={props.etfData.base_info.etf_name}>
                                <Typography
                                    variant="h2"
                                    component="div"
                                    style={{ display: 'inline-block' }}
                                >
                                    {props.etfData.base_info.etf_name}
                                </Typography>
                            </Tooltip>
                        </S.TitleWrapper>
                        <div style={{ width: '100%' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'end', gap: 5 }}>
                                <Typography variant="h2" component="div">
                                    $
                                    {props.etfCandlesData[
                                        props.etfCandlesData.length - 1
                                    ].close.toFixed(3)}
                                </Typography>
                                <Typography variant="subtitle2"> USD </Typography>
                                <Typography variant="subtitle2" style={{ paddingLeft: 10 }}>
                                    {diff.toFixed(3)}
                                </Typography>
                                <Typography variant="subtitle2">{pctDiff.toFixed(2)}%</Typography>
                                <Typography
                                    variant="h3"
                                    component="div"
                                    style={{
                                        color:
                                            pctDiff > 0 ? ColorsEnum.upHint : ColorsEnum.downHint,
                                        transform: pctDiff > 0 ? undefined : 'rotate(180deg)',
                                    }}
                                >
                                    <ArrowUpwardIcon fontSize="inherit" />
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={14}>
                        <Typography variant="subtitle1" sx={{ padding: 1 }}>
                            {props.etfData.info.analyst_report}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container columns={20} columnSpacing={5}>
                    <Grid item xs={6}>
                        <ModifiedTable
                            entry={props.etfData.info.historical_trade_data}
                            title="Historical Trading Data"
                        />
                        <ModifiedTable
                            entry={props.etfData.holdings.top_holdings}
                            title="Top Holdings"
                        />
                        <ModifiedTable entry={props.etfData.dividends} title="Dividends" />
                    </Grid>
                    <Grid item xs={14}>
                        <Grid container columnSpacing={2} columns={20}>
                            <div style={{ width: '100%' }}>
                                <WidgetContainer title="past_1y_historical">
                                    {props.etfCandlesData.length !== 0 ? (
                                        <BaseLineChart
                                            showAxis
                                            showAverage
                                            showTooltip
                                            baseId={`svg-container`}
                                            strokeWidth="0.2px"
                                            defaultData={{
                                                id: 'base-line',
                                                name: 'Base Line Chart',
                                                parent: true,
                                                dataX: props.etfCandlesData.map(
                                                    (entry: EquityHistoricalDTO) =>
                                                        parseTime(entry.date) as Date
                                                ),
                                                dataY: props.etfCandlesData.map(
                                                    (entry: EquityHistoricalDTO) => entry.close
                                                ),
                                                color: 'white',
                                                type: 'line',
                                            }}
                                        />
                                    ) : null}
                                </WidgetContainer>
                            </div>
                            <Info {...props} />
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    } else
        return (
            <Grid container columns={20}>
                <Skeleton variant="rectangular" animation="wave" />
            </Grid>
        );
}
