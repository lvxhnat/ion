import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { ROUTES } from 'common/constant';

import { Box, Divider, Link } from '@mui/material';
import GoogleButton from './Others';
import Copyright from 'components/Skeletons/Copyright';
import EmailButton from './Email/EmailButton/EmailButton';
import { ColorsEnum } from 'common/theme';
import { ContainerWrapper } from 'components/Wrappers/ContainerWrapper';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
    const handleGoogleSubmit = async () => {};

    return (
        <ContainerWrapper hideNavigate>
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
                    or
                </Typography>
            </Divider>

            <EmailButton handleSubmit={() => null} />

            <Copyright sx={{ mt: 8, mb: 4 }} />
        </ContainerWrapper>
    );
}
