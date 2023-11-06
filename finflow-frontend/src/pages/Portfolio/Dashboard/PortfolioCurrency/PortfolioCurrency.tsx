import React from 'react';
import { Typography } from '@mui/material';
import { ColorsEnum } from '../../../../common/theme';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function PortfolioCurrency() {
    const [currency, setCurrency] = React.useState<string>('');

    const handleChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value);
    };

    return (
        <div>
            <Typography variant="body1" style={{ color: ColorsEnum.coolgray2 }}>
                {' '}
                Portfolio Currency{' '}
            </Typography>
            <FormControl variant="standard" sx={{ minWidth: 140 }}>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={currency}
                    onChange={handleChange}
                    label="Currency"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
