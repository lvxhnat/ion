import React from 'react';
import * as S from '../style';
import { Stack, Typography } from '@mui/material';
import { FaChartPie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'common/constant';

export default function AnalyticsButton() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClose = (link: string) => {
        setAnchorEl(null);
        navigate(link);
    };

    return (
        <div>
            <S.StyledMenuButton
                disabled
                disableRipple
                disableFocusRipple
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    setAnchorEl(event.currentTarget)
                }
            >
                <Typography variant="h3">Analytics</Typography>
            </S.StyledMenuButton>
            <S.StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <S.StyledMenuItem onClick={() => handleClose(ROUTES.ECONOMIC_DATA)}>
                    <div style={{ display: 'flex', gap: 5, width: '100%' }}>
                        <FaChartPie style={{ fontSize: 20 }} />
                        <Stack style={{ gap: 5, width: '80%' }}>
                            <Typography variant="h3"> Portfolio Distrbution </Typography>
                            <S.ButtonSubtitles variant="subtitle2">
                                Observe net holdings of ETF industries, aggregated from 2100 ETFs.
                            </S.ButtonSubtitles>
                        </Stack>
                    </div>
                </S.StyledMenuItem>
            </S.StyledMenu>
        </div>
    );
}
