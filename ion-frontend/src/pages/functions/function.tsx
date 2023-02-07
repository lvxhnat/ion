import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import { useNavigate } from 'react-router-dom';

import Header from 'components/Header';
import { ColorsEnum } from 'common/theme';
import { useThemeStore } from 'store/theme';
import { getAllFunctions } from 'data/ingestion/autocomplete';

export default function Function() {
    const { mode } = useThemeStore();
    const navigate = useNavigate();
    const [availableFunctions, setAvailableFunctions] = React.useState<{ [index: string]: any[] }>(
        {}
    );

    React.useEffect(() => {
        getAllFunctions().then(res => {
            const data: any = {};
            res.data.map((entry: any) => {
                const key: string = entry.type;
                if (data[key]) {
                    data[key].push(entry);
                } else {
                    data[key] = [entry];
                }
            });
            setAvailableFunctions(data);
        });
    }, []);

    return (
        <>
            <CssBaseline />
            <Header />
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
                    {Object.keys(availableFunctions).map((key: string) => {
                        return (
                            <>
                                <Typography variant="subtitle1" style={{ color: ColorsEnum.beer }}>
                                    {key}
                                </Typography>
                                {availableFunctions[key].map(entry => (
                                    <S.MainWrapper onClick={() => navigate(entry.redirect)}>
                                        {!['About'].includes(key) ? (
                                            <S.SubWrappers style={{ width: '5%' }}>
                                                <Typography
                                                    variant="subtitle1"
                                                    style={{ color: ColorsEnum.machoBlue }}
                                                >
                                                    {'>'}
                                                </Typography>
                                            </S.SubWrappers>
                                        ) : null}
                                        <S.SubWrappers style={{ width: '15%' }}>
                                            <Typography
                                                variant="subtitle1"
                                                style={{ color: ColorsEnum.machoBlue }}
                                            >
                                                {entry.name}
                                            </Typography>
                                        </S.SubWrappers>
                                        <Typography
                                            variant="subtitle1"
                                            style={{ color: ColorsEnum.machoBlue }}
                                        >
                                            {entry.long_name}
                                        </Typography>
                                    </S.MainWrapper>
                                ))}
                            </>
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
