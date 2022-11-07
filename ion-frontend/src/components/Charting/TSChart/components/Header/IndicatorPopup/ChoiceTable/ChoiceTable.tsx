import * as React from 'react';
import * as S from './style';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number,
) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

enum INDICATOR_TYPES {
    MOMENTUM = 'Momentum Indicators'
}

export default function ChoiceTable() {
	const [selection, setSelection] = React.useState(INDICATOR_TYPES.MOMENTUM);

	return (
		<>
			<S.ChipWrapper>
				<S.StyledChip clickable size="small" label={INDICATOR_TYPES.MOMENTUM} variant={selection === INDICATOR_TYPES.MOMENTUM ? 'filled' : 'outlined'} onClick={() => console.log('E')} />
			</S.ChipWrapper>
			<TableContainer>
				<Table size="small">
					<TableBody>
						{rows.map((row) => (
							<TableRow
								hover
								key={row.name}
								onClick={() => console.log(row)}
								sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { cursor: 'pointer' } }}
							>
								<TableCell component="th" scope="row" style={{ fontSize: '12px' }}>
									{row.name}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
