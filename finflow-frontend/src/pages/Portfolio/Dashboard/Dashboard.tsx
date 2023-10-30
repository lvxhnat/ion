import * as React from 'react';
import PortfolioCurrency from './PortfolioCurrency';

import AddIcon from '@mui/icons-material/Add';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Dashboard() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div style={{ width: '100%', padding: 10 }}>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h2"> Portfolio 1 </Typography>
                    <PortfolioCurrency />
                </Grid>
                <Grid item xs={6}>
                    <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end">
                        <Button component="label" variant="contained" startIcon={<AddIcon />}>
                            Upload file
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Overview" {...a11yProps(0)} />
                        <Tab label="Performance" {...a11yProps(1)} />
                        <Tab label="Risk" {...a11yProps(2)} />
                        <Tab label="Composition" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    Overview
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    Performance
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    Risk
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    Composition
                </CustomTabPanel>
            </Box>
        </div>
    );
}
