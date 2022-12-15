import * as React from 'react';
import * as d3 from 'd3';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { ColorsEnum } from 'common/theme';
import { StyledTableRow } from '../BaseTable/StyledTableRow';
import { StyledTableCell, StyledChartCell } from '../BaseTable/StyledTableCell';
import { getTableQuery } from 'data/ingestion/postgres';
import BaseLineChart from 'components/Charting/BaseChart';

export default function TreasuryTables(props: { table: string }) {
    const [data, setData] = React.useState<any[]>([]);
    const [visData, setVisData] = React.useState<any>({});

    React.useEffect(() => {
        getTableQuery(props.table).then(data => {
            setData(data.data);
            let columnNames = Object.keys(data.data[0]);
            let obj: { [index: string]: Array<number | null> } = {};

            columnNames.map((columnName: string) => (obj[columnName] = []));
            data.data.map((data: any) => {
                columnNames.map((columnName: string, index: number) => {
                    let item = obj[columnName];
                    let entry = data[columnName];
                    if (index == 0) {
                        entry = new Date(entry);
                    }
                    item.push(entry);
                    obj[columnName] = item;
                });
            });
            setVisData(obj);
        });
    }, []);

    return (
        <TableContainer style={{ width: '100%' }}>
            <Table style={{ minWidth: 150 }} aria-label="a dense table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: ColorsEnum.coolgray8 }}>
                        {data.length !== 0
                            ? Object.keys(data[0]).map((column: string, index: number) => {
                                  return (
                                      <StyledTableCell isHeader key={`treasury_header_${index}`}>
                                          {column}
                                      </StyledTableCell>
                                  );
                              })
                            : null}
                    </TableRow>
                    <TableRow>
                        {data.length !== 0
                            ? Object.keys(data[0]).map((column: string, index: number) => {
                                  return (
                                      <StyledChartCell key={`treasury_header_${index}`}>
                                          {index !== 0 ? (
                                              <BaseLineChart
                                                  baseId={`${column}_treasury_chart`}
                                                  defaultData={{
                                                      id: column,
                                                      name: column,
                                                      parent: true,
                                                      dataX: visData._date,
                                                      dataY: visData[column],
                                                      color: 'white',
                                                      type: 'pureLine',
                                                  }}
                                                  width={120}
                                                  height={30}
                                                  margin={{
                                                      top: 0,
                                                      right: 0,
                                                      bottom: 0,
                                                      left: 0,
                                                  }}
                                              />
                                          ) : null}
                                      </StyledChartCell>
                                  );
                              })
                            : null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length !== 0
                        ? data.map((data, index: number) => (
                              <StyledTableRow key={`treasury_row_${index}`}>
                                  {Object.keys(data).map((dataKey: string, index: number) => {
                                      let res: string;
                                      if (index === 0) {
                                          const date: Date = new Date(data[dataKey]);
                                          res = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
                                      } else {
                                          res = data[dataKey];
                                      }
                                      return (
                                          <StyledTableCell key={`treasury_cell_${dataKey}`}>
                                              <label>{res}</label>
                                          </StyledTableCell>
                                      );
                                  })}
                              </StyledTableRow>
                          ))
                        : null}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
