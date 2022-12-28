import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Divider from '@mui/material/Divider';
import Box from '@mui/system/Box';

import { ColorsEnum } from 'common/theme';

export default function WidgetContainer(props: {
    title: string;
    children: any;
    component?: React.ReactElement;
}) {
    return (
        <Box style={{ width: '100%' }}>
            <S.DividerWrapper>
                <Divider />
            </S.DividerWrapper>
            <S.HeaderPanel>
                <S.LeftPanel>
                    <Typography align="left" variant="h3" sx={{ color: ColorsEnum.warmgray4 }}>
                        {props.title
                            .split('_')
                            .map((s: string) =>
                                s === 'us'
                                    ? s.toUpperCase()
                                    : s[0].toUpperCase() + s.slice(1).toLowerCase()
                            )
                            .join(' ')}
                    </Typography>
                </S.LeftPanel>
                <S.RightPanel>
                    {props.component}
                    <IconButton disableRipple style={{ paddingRight: 0 }}>
                        <FullscreenIcon />
                    </IconButton>
                </S.RightPanel>
            </S.HeaderPanel>
            {props.children}
        </Box>
    );
}
