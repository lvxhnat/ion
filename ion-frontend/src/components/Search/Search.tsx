import * as S from './style';
import * as React from 'react';

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useDebounce } from 'common/hooks/useDebounce';
import { useThemeStore } from 'store/theme';
import { ColorsEnum } from 'common/theme';
import { typographyTheme } from 'common/theme/typography';

interface SearchProps {
    placeholder?: string;
    fullWidth?: boolean;
    callback?: (search: string) => void;
}

const SelectArrowWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    '&:hover': {
        backgroundColor: ColorsEnum.warmgray1,
    },
}));

const TableRowItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'default',
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
    fontSize: typographyTheme.subtitle2.fontSize,
}));

type TableRowInputProps = {
    overtColors: boolean;
    disableHover?: boolean;
    theme?: any,
}
  
const TableRowWrapper = styled('div')<TableRowInputProps>(({ theme, overtColors, disableHover }) => ({
    display: 'flex',
    width: '100%',
    padding: 2,
    backgroundColor: overtColors ? ColorsEnum.warmgray1 : ColorsEnum.darkGrey,
    '&:hover': disableHover ? undefined : {
        backgroundColor: ColorsEnum.beer,
        color: ColorsEnum.black,
    },
}));

export function TickerSearch() {
    const { mode } = useThemeStore();
    const [showMenu, setShowMenu] = React.useState<boolean>(false);

    const primaryColor: string = mode === 'dark' ? ColorsEnum.black : ColorsEnum.white;

    return (
        <>
            <div
                style={{
                    width: 'max(100px, 20%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid ' + primaryColor,
                }}
            >
                <input
                    type="text"
                    placeholder="Enter Symbol"
                    style={{
                        width: '100%',
                        backgroundColor: primaryColor,
                        border: 'none',
                        outline: 'none',
                        padding: 5,
                        color: mode === 'dark' ? ColorsEnum.white : ColorsEnum.white,
                        fontSize: typographyTheme.subtitle2.fontSize,
                    }}
                />
                <SelectArrowWrapper onClick={() => setShowMenu(!showMenu)}>
                    <ArrowDropDownIcon fontSize="small" />
                </SelectArrowWrapper>
            </div>
            <div
                style={{
                    display: showMenu ? 'block' : 'none',
                    backgroundColor: ColorsEnum.darkGrey,
                    width: 450,
                    padding: 5,
                    position: 'absolute',
                    zIndex: 10,
                }}
            >
                <TableRowWrapper overtColors={false} disableHover={true}>
                    <TableRowItemWrapper style={{ width: '15%', fontWeight: 'bold' }}>Symbol</TableRowItemWrapper>
                    <TableRowItemWrapper style={{ width: '85%', fontWeight: 'bold' }}>Description</TableRowItemWrapper>
                </TableRowWrapper>
                {[...Array(8).keys()].map((_, index: number) => (
                    <TableRowWrapper overtColors={index % 2 === 0}>
                        <TableRowItemWrapper style={{ width: '15%' }}>/ETF</TableRowItemWrapper>
                        <TableRowItemWrapper style={{ width: '85%' }}>
                            This is an ETF that focuses.
                        </TableRowItemWrapper>
                    </TableRowWrapper>
                ))}
            </div>
        </>
    );
}

const Search: React.FC<SearchProps> = ({ callback, placeholder, fullWidth }) => {
    const [search, setSearch] = React.useState<string>('');

    const searchDebounce = useDebounce(search);
    React.useEffect(() => {
        callback != null && callback(searchDebounce.trim());
    }, [callback, searchDebounce]);

    return (
        <S.SearchWrapper>
            <TextField
                placeholder={placeholder}
                id="text-field-search"
                type="text"
                size="small"
                fullWidth={fullWidth}
                InputProps={{
                    style: {
                        fontSize: '14px',
                    },
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="medium" />
                        </InputAdornment>
                    ),
                    ...(search && {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    disableRipple
                                    aria-label="toggle password visibility"
                                    onClick={() => setSearch('')}
                                    edge="end"
                                >
                                    <CloseIcon fontSize="medium" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }),
                }}
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </S.SearchWrapper>
    );
};

export default Search;
