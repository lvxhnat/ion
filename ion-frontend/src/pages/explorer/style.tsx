import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ColorsEnum } from 'common/theme';

export const ExplorerToolbarWrapper = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: ColorsEnum.warmgray1,
}));

export const ExplorerButton = (props: { children: any; selected?: boolean; [x: string]: any }) => {
    return (
        <ExplorerExternalButton {...props}>
            <ExplorerInternalButton selected={props.selected} variant="subtitle2">
                {props.children}
            </ExplorerInternalButton>
        </ExplorerExternalButton>
    );
};

const ExplorerExternalButton = styled('div')(({ theme }) => ({
    borderRight: `1px solid ${ColorsEnum.warmgray2}`,
    padding: 2,
    backgroundColor: ColorsEnum.warmgray1,
    '&:hover': {
        backgroundColor: ColorsEnum.warmgray2,
    },
    cursor: 'default',
}));

interface InternalbuttonProps {
    selected?: boolean;
}

const ExplorerInternalButton = styled(Typography)<InternalbuttonProps>(({ theme, selected }) => ({
    gap: 5,
    borderRadius: 5,
    padding: `${theme.spacing(0.2)} ${theme.spacing(1)}`,
    backgroundColor: selected ? ColorsEnum.darkerGrey : 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:active': {
        backgroundColor: ColorsEnum.darkGrey,
    },
}));
