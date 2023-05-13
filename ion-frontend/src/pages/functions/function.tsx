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
            <HexLayer baseId="functionExplorerHex" theme={mode!} title="Functions" />
            <Grid container sx={{ padding: 2 }}>
                <Grid item xs={6}>
                    <Typography
                        variant="subtitle1"
                        id="headerHints_1"
                        style={{ paddingBottom: 20 }}
                    >
                        <span style={{ color: ColorsEnum.lighterMachoBlue }}>Light Blue: </span>
                        represents clickable text that will load some text and not lead to
                        redirects.
                        <br />
                        <span style={{ color: ColorsEnum.machoBlue }}>Dark Blue:</span> represents
                        menus, also recognizable by the `{'>'}` in front.
                    </Typography>

                    <Typography variant="subtitle1" style={{ color: ColorsEnum.beer }}>
                        Information, guides and supports for the IonTerminal:
                    </Typography>
                    <S.MainWrapper style={{ paddingBottom: 20 }}>
                        <S.SubWrappers style={{ width: '15%' }}>
                            <Typography
                                variant="subtitle1"
                                style={{ color: ColorsEnum.lighterMachoBlue }}
                            >
                                about
                            </Typography>
                        </S.SubWrappers>
                        <Typography
                            variant="subtitle1"
                            style={{ color: ColorsEnum.lighterMachoBlue }}
                        >
                            discover the capabilities of the IonTerminal
                        </Typography>
                    </S.MainWrapper>
                    {Object.keys(ROUTE_METADATA).map((ROUTE_KEY: string) => {
                        return (
                            <S.HoveredLink
                                key={`fragment_${ROUTE_KEY}`}
                                onClick={() =>
                                    navigate(ROUTES.PUBLIC[ROUTE_KEY as keyof typeof ROUTES.PUBLIC])
                                }
                            >
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <Typography
                                        variant="subtitle1"
                                        style={{ color: ColorsEnum.beer }}
                                    >
                                        {
                                            ROUTE_METADATA[ROUTE_KEY as keyof typeof ROUTE_METADATA]
                                                .NAME
                                        }
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        style={{ color: ColorsEnum.warmgray4 }}
                                    >
                                        {
                                            ROUTE_METADATA[ROUTE_KEY as keyof typeof ROUTE_METADATA]
                                                .DISPLAY_ROUTE
                                        }
                                    </Typography>
                                </div>
                                <Typography variant="subtitle2" style={{ color: ColorsEnum.white }}>
                                    {
                                        ROUTE_METADATA[ROUTE_KEY as keyof typeof ROUTE_METADATA]
                                            .DESCRIPTION
                                    }
                                </Typography>
                            </S.HoveredLink>
                        );
                    })}
                </Grid>
                <Grid item xs={6}>
                    <Typography
                        variant="subtitle1"
                        id="headerHints_2"
                        style={{ paddingBottom: 20 }}
                    >
                        <span style={{ color: ColorsEnum.beer }}>Orange:</span> represents titles
                        and headers. Yellow: represents descriptions of a parameter or variable.{' '}
                        <br />
                        <span
                            style={{ color: mode === 'dark' ? ColorsEnum.white : ColorsEnum.black }}
                        >
                            {mode === 'dark' ? 'White' : 'Black'}:
                        </span>{' '}
                        represents text, usually in combination with a description that is in
                        Yellow. <br />
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}
