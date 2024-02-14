import * as React from 'react';
import * as S from './style';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import InputLabel from '@mui/material/InputLabel';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import request from 'services';
import { ROUTES } from 'common/constant';
import { app, signInWithGooglePopup } from 'common/firebase/firebase';
import { ENDPOINTS } from 'endpoints/endpoints';
import { setCookie } from '../../common/helper/cookies';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Divider, FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import GoogleButton from './GoogleButton';
import Copyright from 'components/Skeletons/Copyright';
import EmailButton from './Email/EmailButton/EmailButton';
import { ColorsEnum } from 'common/theme';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
    const handleGoogleSubmit = async () => {};

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <S.SignInHeaders id="sign-in-headers">
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Typography variant="body2">
                            Already have an account?{' '}
                            <Link href={ROUTES.SIGNIN} variant="body2">
                                {'Sign In'}
                            </Link>
                        </Typography>
                    </S.SignInHeaders>
                    <GoogleButton handleLogin={handleGoogleSubmit} />
                </Box>

                <Divider style={{ paddingTop: 20, paddingBottom: 20 }}>
                    <Typography variant="subtitle2" color={ColorsEnum.warmgray2}>
                        {' '}
                        or{' '}
                    </Typography>
                </Divider>

                <EmailButton handleSubmit={() => null} />

                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
