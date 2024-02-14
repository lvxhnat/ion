import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const buttonBorderRadius = '50px';

export const SignInHeaders = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 20,
});

export const StyledButton = styled(Button)({
    borderRadius: buttonBorderRadius,
});

export const ButtonContentWrapper = styled('div')({
    WebkitAlignItems: 'center',
    alignItems: 'center',
    display: 'flex',
    WebkitFlexDirection: 'row',
    flexDirection: 'row',
    WebkitFlexWrap: 'nowrap',
    flexWrap: 'nowrap',
    height: '100%',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
});

export const ButtonContents = styled('span')({
    WebkitFlexGrow: '1',
    flexGrow: '1',
    fontFamily: "'Roboto', arial, sans-serif",
    fontWeight: '500',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    verticalAlign: 'top',
});

export const ButtonState = styled('div')({
    WebkitTransition: 'opacity .218s',
    transition: 'opacity .218s',
    bottom: '0',
    left: '0',
    opacity: '0',
    position: 'absolute',
    right: '0',
    top: '0',
});

export const ButtonStyled = styled('button')({
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
    WebkitAppearance: 'none',
    backgroundColor: 'WHITE',
    backgroundImage: 'none',
    border: '1px solid #747775',
    WebkitBorderRadius: '4px',
    borderRadius: buttonBorderRadius,
    WebkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
    color: '#1f1f1f',
    cursor: 'pointer',
    fontFamily: "'Roboto', arial, sans-serif",
    fontSize: '14px',
    height: '40px',
    letterSpacing: '0.25px',
    outline: 'none',
    overflow: 'hidden',
    padding: '0 12px',
    position: 'relative',
    textAlign: 'center',
    WebkitTransition: 'background-color .218s, border-color .218s, box-shadow .218s',
    transition: 'background-color .218s, border-color .218s, box-shadow .218s',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    width: '100%',
    maxWidth: '700px',
    minWidth: 'min-content',
    '&:disabled': {
        cursor: 'default',
        backgroundColor: '#ffffff61',
        borderColor: '#1f1f1f1f',
        '& .gsi-material-button-contents, & .gsi-material-button-icon': {
            opacity: '38%',
        },
    },
    '&:not(:disabled):active .gsi-material-button-state, &:not(:disabled):focus .gsi-material-button-state':
        {
            backgroundColor: '#303030',
            opacity: '12%',
        },
    '&:not(:disabled):hover': {
        WebkitBoxShadow: '0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15)',
        boxShadow: '0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15)',
    },
    '&:not(:disabled):hover .gsi-material-button-state': {
        backgroundColor: '#303030',
        opacity: '8%',
    },
});
