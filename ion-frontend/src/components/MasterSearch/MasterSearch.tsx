import * as React from 'react';
import * as S from './style';

import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';

type SearchSuggestionProps = SearchSuggestion[];

interface SearchSuggestion {
    isHeader: boolean;
    name: string; // or Ticker Name
    desc: string;
}

export default function MasterSearch(props: {}) {
    const [searchQuery, setSearchQuery] = React.useState<string>();
    // Take note that the freeSolo prop allows you to not render any options when there is no options available.
    return (
        <S.SearchWrapper>
            <S.StyledSearch
                type="text"
                placeholder="Search"
                onChange={event => setSearchQuery(event.target.value)}
            />
            <S.TableWrapper sx={searchQuery ? { display: 'block' } : { display: 'none' }}>
                <TableHead>
                    <TableRow>faga</TableRow>
                </TableHead>
            </S.TableWrapper>
        </S.SearchWrapper>
    );
}
