import * as React from 'react';
import * as S from '../style';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import BootstrapDialogFrame from 'components/Dialog';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { ColorsEnum } from 'common/theme';
import { Button, DialogActions } from '@mui/material';

const CenteredGridWrapper = (props: { children: any }) => {
    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ paddingLeft: 3, paddingRight: 3 }}
        >
            {props.children}
        </Grid>
    );
};

export default function CreatePortfolio() {
    const handlePortfolioCreate = () => {};

    return (
        <BootstrapDialogFrame title="Create Portfolio" openIcon={<AddIcon />} openPrompt="Create">
            <Divider />
            <DialogContent>
                <Stack
                    component="form"
                    sx={{ width: '100%' }}
                    spacing={2}
                    noValidate
                    autoComplete="off"
                >
                    <CenteredGridWrapper>
                        <Grid item xs={7}>
                            <Typography variant="h3" sx={{ color: ColorsEnum.beer }}>
                                Name
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                id="filled-hidden-label-small"
                                size="small"
                            />
                        </Grid>
                    </CenteredGridWrapper>
                    <CenteredGridWrapper>
                        <Grid item xs={7}>
                            <Typography variant="h3" sx={{ color: ColorsEnum.beer }}>
                                Long Name
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                id="filled-hidden-label-small"
                                size="small"
                            />
                        </Grid>
                    </CenteredGridWrapper>
                </Stack>
            </DialogContent>
            <Divider />
            <DialogActions>
                <S.IconButtonWrapper onClick={handlePortfolioCreate}> Create </S.IconButtonWrapper>
            </DialogActions>
        </BootstrapDialogFrame>
    );
}
