import * as React from 'react';
import * as S from './style';

import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';

import { useDebounce } from 'common/hooks/useDebounce';
import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';
import { FunctionSuggestion, SearchSuggestions } from './type';
import { ColorsEnum } from 'common/theme';

export default function MasterSearch(props: {}) {
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
            <S.StyledSearch
                type="text"
                placeholder="Search"
                onChange={event => setSearchQuery(event.target.value)}
            />
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
                            <S.TableRowWrapper hover key={d.name}>
                                <S.TableCellWrapper
                                    sx={{ paddingLeft: 'calc(1rem + 2vw)' }}
                                    width="50%"
                                >
                                    {d.name}
                                </S.TableCellWrapper>
                                <S.TableCellWrapper sx={{ color: ColorsEnum.beer }} width="50%">
                                    {' '}
                                    {d.long_name}{' '}
                                </S.TableCellWrapper>
                            </S.TableRowWrapper>
                        ))}
                    </>
                </TableBody>
            </S.TableWrapper>
        </S.SearchWrapper>
    );
}
