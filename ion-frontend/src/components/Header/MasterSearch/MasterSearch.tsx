import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';

import { useDebounce } from 'common/hooks/useDebounce';
import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';
import { FunctionSuggestion, SearchSuggestions } from './type';
import { ColorsEnum } from 'common/theme';
import { useNavigate } from 'react-router-dom';

export default function MasterSearch(props: {}) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = React.useState<string>();
    const [searchResults, setSearchResults] = React.useState<SearchSuggestions>({
        securities: [],
        functions: [],
    });
    const debounceSearchQuery = useDebounce(searchQuery, 500);
    // Take note that the freeSolo prop allows you to not render any options when there is no options available.
    React.useEffect(() => {
        if (debounceSearchQuery) {
            dataIngestionRequest
                .post(ENDPOINTS.PRIVATE.SEARCH_FUNCTIONS, {
                    query: 'P',
                })
                .then((d: any) => {
                    searchResults.functions = d.data;
                    setSearchResults({ ...searchResults });
                });
        } else {
            searchResults.functions = [];
            setSearchResults({ ...searchResults });
        }
    }, [debounceSearchQuery]);

    return (
        <S.SearchWrapper>
            <S.StyledSearchWrapper>
                <S.StyledSearch
                    type="text"
                    placeholder="Search"
                    onChange={event => setSearchQuery(event.target.value)}
                />
                <S.StyledSearchTag />
            </S.StyledSearchWrapper>
            <S.TableWrapper sx={searchQuery ? { display: 'block' } : { display: 'none' }}>
                <TableBody sx={{ display: 'block' }}>
                    <>
                        <TableRow style={{ display: 'block' }}>
                            <S.TableCellWrapper colSpan={2}>
                                <S.TableHeaderWrapper variant="body1">
                                    Functions
                                </S.TableHeaderWrapper>
                            </S.TableCellWrapper>
                        </TableRow>
                        {searchResults.functions.map((d: FunctionSuggestion) => (
                            <S.TableRowWrapper
                                hover
                                key={d.name}
                                sx={{ cursor: 'pointer' }}
                                onClick={() => navigate(d.redirect)}
                            >
                                <S.TableCellWrapper
                                    sx={{ paddingLeft: 'calc(1rem + 2vw)', minWidth: 200 }}
                                    width="50%"
                                >
                                    <Typography variant="body1" align="left">
                                        {d.name}
                                    </Typography>
                                </S.TableCellWrapper>
                                <S.TableCellWrapper sx={{ color: ColorsEnum.beer }} width="50%">
                                    <Typography variant="body1" align="left">
                                        {d.long_name}
                                    </Typography>
                                </S.TableCellWrapper>
                            </S.TableRowWrapper>
                        ))}
                    </>
                </TableBody>
            </S.TableWrapper>
        </S.SearchWrapper>
    );
}
