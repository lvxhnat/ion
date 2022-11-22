import * as S from '../style';
import * as React from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useNavigate } from 'react-router-dom';
import { useHeaderStore } from 'store/header/header';
import { ColorsEnum } from 'common/theme';

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
            <FormControl sx={{ minWidth: 120, padding: 0 }} size="small">
                <Select
                    value={headerValue.data}
                    defaultValue={headerValue.data}
                    onChange={() => null}
                    sx={{
                        '&:hover': {
                            '&& fieldset': {
                                border: `1px solid ${ColorsEnum.coolgray1}`,
                            },
                        },
                    }}
                    SelectDisplayProps={{ style: { padding: 3 } }}
                >
                    <MenuItem value={headerValue.data}>{headerValue.data}</MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </S.NavigationPanel>
    );
}
