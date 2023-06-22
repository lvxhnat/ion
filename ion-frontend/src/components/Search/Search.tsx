import * as S from './style';
import * as React from 'react';

import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useDebounce } from 'common/hooks/useDebounce';
import { useThemeStore } from 'store/theme';
import { ColorsEnum } from 'common/theme';
import { getTickerSearchAutocomplete } from 'endpoints/clients/autocomplete';
import { Typography } from '@mui/material';
import { TickerMetadataDTO } from 'endpoints/clients/database/postgres/ticker';
import { getUniqueTickerId } from 'common/constant/ids';

interface SearchProps {
    placeholder?: string;
    fullWidth?: boolean;
    callback?: (search: string) => void;
}

const assetMapping = {
    stock: {
        name: 'STK',
        color: ColorsEnum.royalred,
    },
    etf: {
        name: 'ETF',
        color: ColorsEnum.geekBlue,
    },
};

export function TickerSearch(props: {
    tickerMetadata?: TickerMetadataDTO;
    setSelectedOption?: (ticker: string, asset_type: string) => void;
}) {
    const { mode } = useThemeStore();
    const [showMenu, setShowMenu] = React.useState<boolean>(false);
    const [options, setOptions] = React.useState([]);
    const [query, setQuery] = React.useState<string>('');

    const width: string = '450px';

    const debounceSearchQuery = useDebounce(query, 500);
    React.useEffect(() => {
        if (debounceSearchQuery) {
            getTickerSearchAutocomplete(query).then(res => {
                setOptions(res.data);
            });
        }
    }, [debounceSearchQuery]);

    const primaryColor: string = mode === 'dark' ? ColorsEnum.black : ColorsEnum.white;

    return (
        <div style={{ width: width }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid ' + primaryColor,
                    borderRadius: '2px',
                    width: width,
                }}
            >
                <S.TickerSearchInput
                    type="text"
                    onChange={(event: any) => {
                        setShowMenu(true);
                        setQuery(event.target.value);
                    }}
                    placeholder={
                        props.tickerMetadata
                            ? getUniqueTickerId(props.tickerMetadata.source, props.tickerMetadata.symbol)
                            : 'Enter Symbol'
                    }
                />
                <S.SelectArrowWrapper
                    onClick={() => {
                        setShowMenu(!showMenu);
                    }}
                >
                    <ArrowDropDownIcon fontSize="small" />
                </S.SelectArrowWrapper>
            </div>
            <div
                style={{
                    display: showMenu ? 'block' : 'none',
                    backgroundColor: ColorsEnum.darkGrey,
                    padding: 5,
                    zIndex: 10,
                    position: 'absolute',
                    width: width,
                }}
            >
                <S.TableRowWrapper overtColors={false} disableHover={true}>
                    <S.TableRowItemWrapper style={{ width: '15%', fontWeight: 'bold' }}>
                        <Typography variant="subtitle2">Symbol</Typography>
                    </S.TableRowItemWrapper>
                    <S.TableRowItemWrapper style={{ width: '65%', fontWeight: 'bold' }}>
                        <Typography variant="subtitle2">Description</Typography>
                    </S.TableRowItemWrapper>
                    <S.TableRowItemWrapper style={{ width: '10%', fontWeight: 'bold' }}>
                        <Typography variant="subtitle2">Source</Typography>
                    </S.TableRowItemWrapper>
                    <S.TableRowItemWrapper
                        style={{ width: '10%', fontWeight: 'bold', justifyContent: 'center' }}
                    >
                        <Typography variant="subtitle2">Class</Typography>
                    </S.TableRowItemWrapper>
                </S.TableRowWrapper>
                {options.map((entry: any, index: number) => {
                    const assetSettings =
                        assetMapping[entry.asset_class.toLowerCase() as keyof typeof assetMapping];
                    return (
                        <S.TableRowWrapper
                            overtColors={index % 2 === 0}
                            key={`tickerSearch_S.TableRowWrapper_${index}`}
                            onClick={() =>
                                props.setSelectedOption
                                    ? props.setSelectedOption(entry.symbol, entry.asset_class)
                                    : null
                            }
                        >
                            <S.TableRowItemWrapper style={{ width: '15%' }}>
                                <Typography variant="subtitle2">{entry.symbol}</Typography>
                            </S.TableRowItemWrapper>
                            <S.TableRowItemWrapper style={{ width: '65%' }}>
                                <Typography variant="subtitle2" noWrap>
                                    {entry.name.toUpperCase()}
                                </Typography>
                            </S.TableRowItemWrapper>
                            <S.TableRowItemWrapper style={{ width: '10%' }}>
                                <Typography variant="subtitle2" align="left">
                                    {entry.source.slice(0, 3).toUpperCase()}
                                </Typography>
                            </S.TableRowItemWrapper>
                            <S.TableRowItemWrapper
                                style={{
                                    width: '10%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <S.ClassTagWrapper style={{ backgroundColor: assetSettings.color }}>
                                    {assetSettings.name}
                                </S.ClassTagWrapper>
                            </S.TableRowItemWrapper>
                        </S.TableRowWrapper>
                    );
                })}
            </div>
        </div>
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
