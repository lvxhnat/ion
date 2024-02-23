import * as React from 'react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

export default function EmailSignUp() {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const auth = getAuth();
        createUserWithEmailAndPassword(
            auth,
            data.get('email') as string,
            data.get('password') as string
        )
            .then(userCredential => {
                // Signed up
                console.log(userCredential.user, 'ss');
                // setCookie("access_token", )
                // ...
            })
            .catch(error => {
                console.log(error, 'error');
            });
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="outlined-adornment-password" variant="outlined">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(show => !show)}
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
                </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
            </Button>
        </Box>
    );
}
