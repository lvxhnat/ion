import * as React from 'react';
import { styled } from '@mui/system';

import CssBaseline from '@mui/material/CssBaseline';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import StorageIcon from '@mui/icons-material/Storage';

import Header from 'components/Header';
import Upload from './upload';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface StyledTabProps {
    label: string;
    [prop: string]: any;
}

const StyledTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        fontWeight: 300,
        fontSize: 15,
        '&.Mui-selected': {
            color: '#fff',
        },
        '&.Mui-focusVisible': {
            backgroundColor: 'rgba(100, 95, 228, 0.32)',
        },
        padding: 10,
    })
);

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {children}
        </div>
    );
}

export default function CustomAnalysis() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <CssBaseline />
            <Header />
            <Tabs
                value={value}
                onChange={handleChange}
                style={{
                    height: 65,
                    padding: 10,
                    paddingTop: 0,
                }}
            >
                <StyledTab
                    icon={<StorageIcon fontSize="small" />}
                    iconPosition="start"
                    label="Data Source"
                    sx={{ padding: 0 }}
                />
                <StyledTab label="Item Two" />
                <StyledTab label="Item Three" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Upload />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </>
    );
}
