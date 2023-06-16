import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ColorsEnum } from 'common/theme';

interface FredRowProps {
    isTitle?: boolean;
    children?: any;
    [x: string]: any;
}

export const FredRow = (props: FredRowProps) => {
    return (
        <BaseFredRow {...props}>
            <Typography variant={props.isTitle ? 'body1' : 'subtitle2'}>
                {props.isTitle ? <strong> {props.children} </strong> : props.children}
            </Typography>
        </BaseFredRow>
    );
};

export const PanelOpener = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    height: '75vh'
}));

export const SidePanelOpener = styled('div')(({ theme }) => ({
    width: '25%',
    height: '100%',
    overflowY: 'auto',
    backgroundColor: ColorsEnum.darkerGrey,
    '&::-webkit-scrollbar': { display: 'none' },
}));

export const MainPanelOpener = styled('div')(({ theme }) => ({
    width: '75%',
    height: '100%',
    overflowY: 'auto',
    '&::-webkit-scrollbar': { display: 'none' },
}));

export const UpdateBar = styled(Typography)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    padding: 5,
    gap: 10,
    backgroundColor: ColorsEnum.warmgray6,
}));

export const ChildNodesPanel = styled('div')(({ theme }) => ({
    overflowY: 'auto',
    height: '85vh',
    '&::-webkit-scrollbar': { display: 'none' },
}));

export const IconButtonWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    '&:hover': {
        cursor: 'pointer',
    },
}));
const BaseFredRow = styled('div')<FredRowProps>(({ theme, title }) => ({
    padding: `${theme.spacing(0.8)} ${theme.spacing(2)}`,
    '&:hover': {
        color: ColorsEnum.beer,
        cursor: 'pointer',
    },
}));
