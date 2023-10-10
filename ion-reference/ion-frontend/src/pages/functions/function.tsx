import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import { useNavigate } from 'react-router-dom';

import { ColorsEnum } from 'common/theme';
import { useThemeStore } from 'store/theme';
import HexLayer from 'components/Charting/HexLayer';
import Navigation from 'components/Navigation';
import { ROUTES, ROUTE_METADATA } from 'common/constant';

export default function Function() {
    const { mode } = useThemeStore();
    const navigate = useNavigate();

    return (
        <>
            <CssBaseline />
            <Navigation />
            <HexLayer baseId="functionExplorerHex" title="Functions" searchComponent={<div />} />
            <Grid container sx={{ padding: 2 }}>
                <Grid item xs={6}>
                    <Typography variant="subtitle1" style={{ color: ColorsEnum.beer }}>
                        Information, guides and supports for the IonTerminal:
                    </Typography>
                    <S.HoveredLinkContainer>
                        {Object.keys(ROUTE_METADATA).map((ROUTE_KEY: string) => {
                            return (
                                <S.HoveredLink
                                    key={`fragment_${ROUTE_KEY}`}
                                    onClick={() =>
                                        navigate(
                                            ROUTES.PUBLIC[ROUTE_KEY as keyof typeof ROUTES.PUBLIC]
                                        )
                                    }
                                >
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <Typography
                                            variant="subtitle1"
                                            style={{ color: ColorsEnum.beer }}
                                        >
                                            {
                                                ROUTE_METADATA[
                                                    ROUTE_KEY as keyof typeof ROUTE_METADATA
                                                ].NAME
                                            }
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            style={{ color: ColorsEnum.warmgray4 }}
                                        >
                                            {
                                                ROUTE_METADATA[
                                                    ROUTE_KEY as keyof typeof ROUTE_METADATA
                                                ].DISPLAY_ROUTE
                                            }
                                        </Typography>
                                    </div>
                                    <Typography
                                        variant="subtitle2"
                                        style={{ color: ColorsEnum.white }}
                                    >
                                        {
                                            ROUTE_METADATA[ROUTE_KEY as keyof typeof ROUTE_METADATA]
                                                .DESCRIPTION
                                        }
                                    </Typography>
                                </S.HoveredLink>
                            );
                        })}
                    </S.HoveredLinkContainer>
                </Grid>
                <Grid item xs={6}></Grid>
            </Grid>
        </>
    );
}
