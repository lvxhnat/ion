import * as React from 'react'

import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Alert, Typography } from "@mui/material";
import { ColorsEnum } from 'common/theme';

export default function PortfolioAlert() {
  const [open, setOpen] = React.useState<boolean>(true);

  return (
    <Collapse in={open} style={{ width: '100%' }}>
        <Alert
          style={{ backgroundColor: ColorsEnum.green, color: ColorsEnum.white, paddingTop: 1, paddingBottom: 1 }}
          icon={<CheckIcon fontSize="inherit" style={{ color: ColorsEnum.white}}/>} 
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2, color: ColorsEnum.white }}
        >
          <Typography variant="h3" fontWeight="bold">
          There are currently no alerts for your portfolios.
          </Typography>
        </Alert>
      </Collapse>
  )
}
