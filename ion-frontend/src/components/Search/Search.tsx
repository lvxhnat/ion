import * as S from './style';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDebounce } from 'common/hooks/useDebounce';

interface SearchProps {
    placeholder?: string;
    fullWidth?: boolean;
    callback?: (search: string) => void;
}

const Search: FC<SearchProps> = ({ callback, placeholder, fullWidth }) => {
    const [search, setSearch] = useState<string>('');

    const searchDebounce = useDebounce(search);
    useEffect(() => {
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
                            <SearchIcon style={{ fontSize: '18px' }} />
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
                                    <CloseIcon style={{ fontSize: '18px' }} />
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
