import * as React from 'react';
import * as S from './style';

import { FaDatabase } from 'react-icons/fa';
import CssBaseline from '@mui/material/CssBaseline';
import WindowIcon from '@mui/icons-material/Window';

import Header from 'components/Header';
import Upload from './upload';
import Sheet from './sheet';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

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
            <S.Tabs>
                <S.Tab
                    selected={value === 0}
                    onClick={(e: React.SyntheticEvent) => handleChange(e, 0)}
                    icon={<FaDatabase />}
                    label="Data Source"
                />
                <S.Tab
                    selected={value === 1}
                    onClick={(e: React.SyntheticEvent) => handleChange(e, 1)}
                    icon={<WindowIcon fontSize="small" />}
                    label="Dashboard"
                />
            </S.Tabs>
            <TabPanel value={value} index={0}>
                <Upload />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Sheet />
            </TabPanel>
        </>
    );
}
