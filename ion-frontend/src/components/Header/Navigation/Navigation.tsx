import * as S from '../style';
import * as React from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useNavigate } from 'react-router-dom';
import { useHeaderStore } from 'store/header/header';

export default function Navigation() {
    const navigate = useNavigate();
    const headerValue = useHeaderStore((store: any) => store.header);

    return (
        <S.NavigationPanel>
            <S.IconButtonWrapper disableRipple onClick={() => navigate(-1)}>
                <ChevronLeftIcon fontSize="small" />
            </S.IconButtonWrapper>
            <S.IconButtonWrapper disableRipple disabled>
                <ChevronRightIcon fontSize="small" />
            </S.IconButtonWrapper>
            {headerValue.data ? (
                <FormControl sx={{ minWidth: 120 }} size="small">
                    <Select
                        value={headerValue.data}
                        defaultValue={headerValue.data}
                        onChange={() => null}
                        sx={{
                            boxShadow: 'none',
                            '.MuiOutlinedInput-notchedOutline': { border: 0 },
                            '&:hover': { border: 0 },
                            '&:focus': { border: 0 },
                            '&:before': { border: 0 },
                            '&:after': { border: 0 },
                        }}
                        SelectDisplayProps={{ style: { padding: 3 } }}
                    >
                        <MenuItem value={headerValue.data}>{headerValue.data}</MenuItem>
                    </Select>
                </FormControl>
            ) : null}
        </S.NavigationPanel>
    );
}
