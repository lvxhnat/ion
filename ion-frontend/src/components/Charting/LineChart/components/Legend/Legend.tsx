import * as React from 'react';
import * as S from './style';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { LegendDataType, LegendHeaderType, LegendProps, StyledTableCellProps } from './type';
import { ColorsEnum } from 'common/theme';
import { IconButton } from '@mui/material';
import { useThemeStore } from 'store/theme';

export function StyledTableCell({ children, isHeader, width, colSpan }: StyledTableCellProps) {
    return (
        <S.TableCellWrapper width={width} colSpan={colSpan ? colSpan : 1}>
            <S.TableCellLabel isHeader={isHeader}>
                {children}
            </S.TableCellLabel>
        </S.TableCellWrapper>
    )
}

const tableHeaders: Array<LegendHeaderType> = [
    { name: "", index: "remove", width: 5 },
    { name: "", index: "color", width: 10 },
    { name: "", index: "indicator", width: 85 },
]

function ColorBox(props: { color: string }) {
    return (
        <div style={{ backgroundColor: props.color, width: '30px', height: "10px" }} />
    )
}
export default function Legend(props: { data: LegendProps }) {
    const { mode } = useThemeStore()
    return (
        <TableContainer style={{ width: '100%' }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {tableHeaders.map((tableSpecification: LegendHeaderType) => {
                            return (
                                <StyledTableCell
                                    isHeader
                                    width={tableSpecification.width + "%"}
                                    key={`chartlegend_${tableSpecification.index}_header`}
                                >
                                    {tableSpecification.name}
                                </StyledTableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((legendData: LegendDataType) => {
                        return (
                            <>
                                <TableRow
                                    key={`${legendData.name}_${legendData.color}`}
                                >
                                    <StyledTableCell width="5%">
                                        <S.TableCellLabelWrapper>
                                            <IconButton disableRipple sx={{ padding: 0 }} onClick={legendData.f}>
                                                <RemoveRedEyeIcon sx={{ fontSize: "12px" }} />
                                            </IconButton>
                                        </S.TableCellLabelWrapper>
                                    </StyledTableCell>
                                    <StyledTableCell width="10%">
                                        <S.TableCellLabelWrapper>
                                            <ColorBox color={legendData.color} />
                                        </S.TableCellLabelWrapper>
                                    </StyledTableCell>
                                    <StyledTableCell width="85%">
                                        {legendData.name}
                                    </StyledTableCell>
                                </TableRow>
                                {legendData.indicators.map((subLegendData) => {
                                    return (
                                        <TableRow
                                            key={`${subLegendData.name}_${subLegendData.color}`}
                                            sx={{ backgroundColor: mode === "dark" ? ColorsEnum.darkGrey : ColorsEnum.bone }}
                                        >
                                            <StyledTableCell width="5%">
                                                <S.TableCellLabelWrapper>
                                                    <IconButton disableRipple sx={{ padding: 0 }} onClick={subLegendData.f}>
                                                        <RemoveRedEyeIcon sx={{ fontSize: "12px" }} />
                                                    </IconButton>
                                                </S.TableCellLabelWrapper>
                                            </StyledTableCell>
                                            <StyledTableCell width="10%">
                                                <S.TableCellLabelWrapper>
                                                    <ColorBox color={subLegendData.color} />
                                                </S.TableCellLabelWrapper>
                                            </StyledTableCell>
                                            <StyledTableCell width="85%">
                                                {subLegendData.name}
                                            </StyledTableCell>
                                        </TableRow>
                                    )
                                })}
                            </>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
