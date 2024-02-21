import React from 'react';
import * as S from '../style';
import { Stack, Typography } from '@mui/material';
import { RiBankFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'common/constant';

export default function AboutButton() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    return (
        <S.StyledMenuButton
            disableRipple
            disableFocusRipple
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                setAnchorEl(event.currentTarget);
                navigate(ROUTES.ABOUT);
            }}
        >
            <Typography variant="h3">Alternative Data</Typography>
        </S.StyledMenuButton>
    );
}
