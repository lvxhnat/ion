import * as React from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import InfoIcon from '@mui/icons-material/Info';
import TableViewIcon from '@mui/icons-material/TableView';

import { FredSeriesEntry } from 'endpoints/clients/fred';
import Metadata from './Metadata';
import TableView from './TableView';
import { DoublyLinkedListNode } from '../DoublyLinkedListNode';

interface SelectedSeriesSidebarProps {
    nodes: DoublyLinkedListNode;
    seriesSelected: FredSeriesEntry;
}

export default function SelectedSeriesSidebar(props: SelectedSeriesSidebarProps) {
    return (
        <Tabs>
            <TabList>
                <Tab>
                    <InfoIcon fontSize="small" />
                </Tab>
                <Tab>
                    <TableViewIcon fontSize="small" />
                </Tab>
            </TabList>
            <TabPanel>
                {' '}
                <Metadata seriesSelected={props.seriesSelected} />{' '}
            </TabPanel>
            <TabPanel>
                {' '}
                <TableView />{' '}
            </TabPanel>
        </Tabs>
    );
}
