import * as React from 'react';
import * as S from './style';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { LegendDataType, LegendHeaderType, LegendProps, StyledTableCellProps } from './type';
import { ColorsEnum } from 'common/theme';
import { IconButton } from '@mui/material';
import { useThemeStore } from 'store/theme';

export function StyledTableCell({ children, isHeader, width, colSpan, isText }: StyledTableCellProps) {
	if (isText) {
		return (
			<S.TableCellWrapper width={width} colSpan={colSpan ? colSpan : 1}>
				<S.TableCellLabel isHeader={isHeader}>
					{children}
				</S.TableCellLabel>
			</S.TableCellWrapper>
		);
	} else {
		return (
			<S.TableCellWrapper width={width} colSpan={colSpan ? colSpan : 1}>
				{children}
			</S.TableCellWrapper>
		);
	}

}

const tableHeaders: Array<LegendHeaderType> = [
	{ name: '', index: 'remove', width: 5 },
	{ name: '', index: 'color', width: 10 },
	{ name: '', index: 'indicator', width: 85 },
];

function ColorBox(props: { color: string }) {
	return (
		<div style={{ backgroundColor: props.color, width: '10px', height: "10px" }} />
	)
}
export default function Legend(props: { data: LegendProps }) {
	const { mode } = useThemeStore()
	return (
		<TableContainer style={{ width: '100%' }}>
			<Table size="small">
				<TableBody>
					{props.data.map((legendData: LegendDataType, index: number) => {
						return (
							<React.Fragment key={`legendFragment_${index}`}>
								<TableRow key={`${legendData.name}_${legendData.color}_header_${index}`}>
									<StyledTableCell key={`${legendData.name}_${index}_color`} width="10%" isText={false}>
										<ColorBox color={legendData.color} />
									</StyledTableCell>
									<StyledTableCell isText key={`${legendData.name}_${index}_legendName`} width="85%">
										{legendData.name}
									</StyledTableCell>
									<StyledTableCell key={`${legendData.name}_${index}_removeIcon`} width="5%">
										<IconButton disableRipple sx={{ padding: 0 }} onClick={legendData.f}>
											<RemoveRedEyeIcon sx={{ fontSize: "12px" }} />
										</IconButton>
									</StyledTableCell>
								</TableRow>
								{legendData.indicators.map((subLegendData, index: number) => {
									return (
										<TableRow key={`${subLegendData.name}_${subLegendData.color}_body_${index}`}>
											<StyledTableCell width="10%" key={`${legendData.name}_${index}_sub_color`}>
												<ColorBox color={subLegendData.color} />
											</StyledTableCell>
											<StyledTableCell isText width="85%" key={`${legendData.name}_${index}_sub_legendName`}>
												{subLegendData.name}
											</StyledTableCell>
											<StyledTableCell width="5%" key={`${legendData.name}_${index}_sub_removeIcon`}>
												<IconButton disableRipple sx={{ padding: 0 }} onClick={subLegendData.f}>
													<RemoveRedEyeIcon sx={{ fontSize: "12px" }} />
												</IconButton>
											</StyledTableCell>
										</TableRow>
									)
								})}
							</React.Fragment>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
