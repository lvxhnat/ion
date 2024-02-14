import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const buttonBorderRadius = "50px"

export const SignInHeaders = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center"
});

export const StyledButton = styled(Button)({
    borderRadius: buttonBorderRadius
});