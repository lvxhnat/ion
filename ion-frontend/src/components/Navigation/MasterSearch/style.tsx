import { styled } from '@mui/system';
import { ColorsEnum } from 'common/theme';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

interface TableCellProps {
    [x: string]: any;
    width: string;
    children?: any;
    style?: React.CSSProperties;
}

export const StyledTableCell: React.FC<TableCellProps> = props => {
    return (
        <TableCell
            width={props.width}
            sx={{
                padding: 0.5,
                border: 0,
                ...props.style,
            }}
        >
            {props.children}
        </TableCell>
    );
};

export const StyledSearchWrapper = styled('div')(({ theme }) => ({
    display: 'inline-block',
    position: 'relative',
    borderRadius: '4px',
}));

const searchbarWidth = `calc(400px + 4vw)`;

export const StyledSearch = styled('input')(({ theme }) => ({
    fontSize: `calc(0.7rem + 0.2vw)`,
    backgroundColor: theme.palette.mode === 'dark' ? ColorsEnum.darkGrey : ColorsEnum.white,
    padding: theme.spacing(0.5),
    paddingLeft: theme.spacing(2.5),
    border: '1px solid ' + ColorsEnum.coolgray4,
    color: theme.palette.mode === 'dark' ? ColorsEnum.white : ColorsEnum.black,
    outline: 'none',
    minWidth: searchbarWidth,
}));

export const TableWrapper = styled(Table)(({ theme }) => ({
    zIndex: 999,
    width: searchbarWidth,
    position: 'absolute',
    border: `1px solid ${ColorsEnum.warmgray1}`,
    backgroundColor: theme.palette.mode === 'dark' ? ColorsEnum.darkGrey : ColorsEnum.black,
}));

export const StyledSearchTag = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '20px',
    backgroundColor: ColorsEnum.coolgray4,
    clipPath: 'polygon(0 0, 20% 0, 60% 50%, 20% 100%, 0 100%)',
}));

export const SearchWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0.5),
}));

export const TableHeaderWrapper = styled(Typography)(({ theme }) => ({
    color: ColorsEnum.beer,
    paddingTop: `calc(0.1rem + 0.3vh)`,
    paddingLeft: `calc(0.1rem + 0.5vw)`,
}));

export const TableRowWrapper = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: 'rgb(3, 37, 76, 0.8) !important',
    },
    width: '100%',
}));
