import * as React from "react";
import * as S from "./style";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import request from "services";
import { ROUTES } from "common/constant";
import { app, signInWithGooglePopup } from "common/firebase/firebase";
import { ENDPOINTS } from "endpoints/endpoints";
import { setCookie } from "../../common/helper/cookies";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import GoogleButton from "./Others";
import Copyright from "components/Skeletons/Copyright";
import { ColorsEnum } from "common/theme";
import { ContainerWrapper } from "components/Wrappers/ContainerWrapper";

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [cookies] = useCookies(["access_token", "refresh_token"]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (cookies.access_token)
      request("ion-backend")
        .post(
          ENDPOINTS.AUTH.TOKEN_CHECKER,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies.access_token}`,
            },
          }
        )
        .then((res) => navigate(ROUTES.LANDING))
        .catch((err) => null);
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const auth = getAuth(app);
    signInWithEmailAndPassword(
      auth,
      data.get("email") as string,
      data.get("password") as string
    )
      .then((userCredential) => {
        userCredential.user.getIdToken().then((s) => {
          setCookie("access_token", s);
          setCookie("refresh_token", userCredential.user.refreshToken);
          setIsError(false);
          navigate(ROUTES.LANDING);
        });
      })
      .catch((error) => {
        setIsError(true);
      });
  };

  const handleGoogleSubmit = async () => {
    const response = await signInWithGooglePopup();
    response.user.getIdToken().then((s: any) => {
      setCookie("access_token", s);
      setCookie("refresh_token", response.user.refreshToken);
      setIsError(false);
      navigate(ROUTES.LANDING);
    });
  };

  return (
    <ContainerWrapper hideNavigate>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <S.SignInHeaders id="sign-in-headers">
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </S.SignInHeaders>

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
          <FormControl fullWidth variant="standard">
            <InputLabel
              htmlFor="outlined-adornment-password"
              variant="outlined"
            >
              Password
            </InputLabel>
            <OutlinedInput
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
                      event.preventDefault()
                    }
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <S.StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </S.StyledButton>
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
          <Divider
            style={{ paddingTop: 20, paddingBottom: 20 }}
            sx={{ bgColor: ColorsEnum.warmgray2 }}
          >
            <Typography variant="subtitle2" color={ColorsEnum.warmgray2}>
              {" "}
              or{" "}
            </Typography>
          </Divider>

          <GoogleButton signIn handleLogin={handleGoogleSubmit} />
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </ContainerWrapper>
  );
}
