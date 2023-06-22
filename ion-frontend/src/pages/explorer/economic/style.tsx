import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ColorsEnum } from 'common/theme';

interface FredRowProps {
    isTitle?: boolean;
    children?: any;
    [x: string]: any;
}

export const BaseDivClass = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));

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
    height: '100%',
}));

export const SeriesPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': { display: 'none' },
}))

export const SidePanelOpener = styled('div')(({ theme }) => ({
    width: '25%',
    height: '100%',
    overflowY: 'auto',
    backgroundColor: ColorsEnum.darkerGrey,
    '&::-webkit-scrollbar': { display: 'none' },
    display: 'flex',
    flexDirection: 'column',
}));

export const MainPanelOpener = styled('div')(({ theme }) => ({
    width: '75%',
    height: '100%',
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    '&::-webkit-scrollbar': { display: 'none' },
}));

export const UpdateBar = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    padding: 5,
    gap: 10,
    backgroundColor: ColorsEnum.warmgray6,
    justifyContent: 'flex-end',
}));

export const ChildNodesPanel = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflowY: 'auto',
    '&::-webkit-scrollbar': { display: 'none' },
}));

export const SeriesContainer = styled('div')(({ theme }) => ({
    width: '100%',
    padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: ColorsEnum.warmgray6,
    },
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
