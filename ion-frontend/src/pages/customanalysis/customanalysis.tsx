import * as React from 'react';
import { styled } from '@mui/system';

import CssBaseline from '@mui/material/CssBaseline';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { FaDatabase } from 'react-icons/fa';
import WindowIcon from '@mui/icons-material/Window';

import Header from 'components/Header';
import Upload from './upload';
import Sheet from './sheet';

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
                <StyledTab icon={<FaDatabase />} iconPosition="start" label="Data Source" />
                <StyledTab
                    icon={<WindowIcon fontSize="small" />}
                    iconPosition="start"
                    label="Dashboard"
                />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Upload />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Sheet />
            </TabPanel>
        </>
    );
}
