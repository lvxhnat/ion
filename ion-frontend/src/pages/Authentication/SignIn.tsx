import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import request from 'services';
import { ROUTES } from 'common/constant';
import { app } from 'common/firebase/firebase';
import { ENDPOINTS } from 'endpoints/endpoints';
import { setCookie } from '../../common/helper/cookies';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [cookies] = useCookies(['access_token', 'refresh_token']);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (cookies.access_token)
    request("ion-backend").post(ENDPOINTS.AUTH.TOKEN_CHECKER, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.access_token}`,
      }
    }).then((res) => navigate(ROUTES.LANDING)).catch((err) => null)
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, data.get('email') as string, data.get('password') as string)
      .then((userCredential) => {
        userCredential.user.getIdToken().then((s) => {
          setCookie("access_token", s)
          setCookie("refresh_token", userCredential.user.refreshToken)
          setIsError(false)
          navigate(ROUTES.LANDING)
        })
      })
      .catch((error) => { setIsError(true) });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href={ROUTES.SIGNUP} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}