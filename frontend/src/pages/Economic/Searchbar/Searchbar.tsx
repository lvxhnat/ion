import * as React from 'react';
import * as S from './style';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from 'common/hooks/useDebounce';
import { getSearchResults } from './requests';
import MenuItem from '@mui/material/MenuItem'; // For individual search results
import ClickAwayListener from '@mui/material/ClickAwayListener'; // To close dropdown when clicking away
import { Grid, Typography } from '@mui/material';
import GridTypography from 'components/Wrappers/GridTypography/GridTypography';
import { ColorsEnum } from 'common/theme';

export default function SearchBar() {
    const [value, setValue] = React.useState<string>('');
    const [results, setResults] = React.useState<any[]>([]); // Assuming results are an array
    const [open, setOpen] = React.useState<boolean>(false); // To control the dropdown visibility

    const debounceSearchQuery = useDebounce(value, 500);
    React.useEffect(() => {
        if (debounceSearchQuery) {
            const searchProps = {
                query: value, 
                limit: 100,
            }
            getSearchResults(searchProps).then((res: any) => {
                setResults(res.data.seriess); // Assuming res.data is an array
                setOpen(true); // Show dropdown with results
                console.log(res.data);
            });
        } else {
            setOpen(false); // Hide dropdown if query is empty
        }
    }, [debounceSearchQuery]);

    const handleClickAway = () => {
        setOpen(false); // Hide dropdown when clicking away
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div style={{ paddingBottom: 10, position: 'relative' }}>
                <S.SearchWrapper>
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search FRED Database"
                        inputProps={{ 'aria-label': 'search database' }}
                        value={value}
                        onChange={(event) => {
                            setValue(event.target.value)
                        }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </S.SearchWrapper>
                {open && (
                        <S.ResultsWrapper>
                            {(results.length !== 0) ? results.map((result, index) => (
                                <MenuItem key={index} onClick={() => setValue(result)}>
                                    <Grid container columns={13} columnGap={2}>
                                    <GridTypography xs={10} variant="subtitle1" noWrap>
                                        {result.title}
                                    </GridTypography>
                                    <GridTypography xs={1} variant="subtitle1">
                                        {result.frequency}
                                    </GridTypography>
                                    <GridTypography xs={1} variant="subtitle1">
                                        {result.observation_start.slice(0,4)} - {result.observation_end.slice(0,4)}
                                    </GridTypography>
                                    </Grid>
                                </MenuItem>
                            )) : <MenuItem disabled> 
                                <Typography variant="subtitle1" align="center" padding={1}>No Results Found for Query. </Typography>
                             </MenuItem>}
                            </S.ResultsWrapper>
                    )}
            </div>
            
        </ClickAwayListener>
    );
}
