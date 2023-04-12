import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Divider from '@mui/material/Divider';
import Box from '@mui/system/Box';

import { ColorsEnum } from 'common/theme';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'common/constant';

export default function WidgetContainer(props: {
    title: string;
    children: any;
    component?: React.ReactElement;
    fullScreenRedirect?: string;
}) {
    const navigate = useNavigate();

    return (
        <Box style={{ width: '100%', paddingLeft: 5, paddingRight: 5 }}>
            <S.DividerWrapper>
                <Divider />
            </S.DividerWrapper>
            <S.HeaderPanel>
                <S.LeftPanel>
                    <Typography align="left" variant="h4" sx={{ color: ColorsEnum.warmgray4 }}>
                        {props.title
                            .split('_')
                            .map((s: string) =>
                                s === 'us' || !isNaN(+s[0]) // Makes sure that country names and time stamps are not lowercased
                                    ? s.toUpperCase()
                                    : s[0].toUpperCase() + s.slice(1).toLowerCase()
                            )
                            .join(' ')}
                    </Typography>
                </S.LeftPanel>
                <S.RightPanel>
                    {props.component}
                    <IconButton
                        disableRipple
                        style={{ paddingRight: 0 }}
                        onClick={() => navigate(props.fullScreenRedirect ?? ROUTES.PUBLIC.LANDING)}
                    >
                        <FullscreenIcon />
                    </IconButton>
                </S.RightPanel>
            </S.HeaderPanel>
            {props.children}
        </Box>
    );
}
