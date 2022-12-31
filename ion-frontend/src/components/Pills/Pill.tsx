import { ColorsEnum } from 'common/theme';

import { styled } from '@mui/material/styles';

const Pill = styled('div')(({ theme }) => ({
    width: '30%',
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    marginTop: 5,
    borderRadius: 15,
    cursor: 'default',
}));

export const StyledPill = (props: {
    selected: boolean;
    children: any;
    color?: string;
    [prop: string]: any;
}) => {
    const pillColor: string = props.color ?? ColorsEnum.beer18;
    return (
        <Pill
            sx={{
                backgroundColor: props.selected ? pillColor : 'transparent',
                '&:hover': { backgroundColor: props.selected ? pillColor : `${pillColor}99` },
                width: 175,
                zIndex: 1, // zIndex = 1 prevents the background from being inherited while dragging the div
            }}
            {...props}
        >
            {props.children}
        </Pill>
    );
};
