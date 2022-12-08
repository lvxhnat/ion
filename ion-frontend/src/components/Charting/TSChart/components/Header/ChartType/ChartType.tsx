import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useChartStore } from 'store/chart/charting';
import { AllowedLineTypeList, AllowedLineTypes } from 'components/Charting/BaseChart/schema/schema';

export default function ChartType() {
    const [chartType, setChartType] = useChartStore(store => [store.chartType, store.setChartType]);
    return (
        <FormControl sx={{ minWidth: 120 }} size="small">
            <Select
                value={chartType}
                defaultValue={chartType}
                onChange={e => setChartType({ chartType: e.target.value as AllowedLineTypes })}
                sx={{
                    boxShadow: 'none',
                    '&:hover': { border: 0 },
                    '&:focus': { border: 0 },
                    '&:before': { border: 0 },
                    '&:after': { border: 0 },
                }}
                SelectDisplayProps={{ style: { padding: 5 } }}
            >
                {AllowedLineTypeList.map((type: string, index: number) => {
                    return (
                        <MenuItem key={`chartType_menu_item_${index}`} value={type}>
                            {type}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
