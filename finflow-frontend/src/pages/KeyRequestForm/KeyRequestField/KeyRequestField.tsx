import * as React from "react";
import {
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { KeyRequestFieldEntry, KeyRequestFieldProps } from "../type";
import { capitalise } from "../../../common/helper/general";

export default function KeyRequestField(props: KeyRequestFieldProps) {
  const [option, setOption] = React.useState<KeyRequestFieldEntry>(props.fieldItems[0]);
  const [text, setText] = React.useState<string>();

  const handleOptionChange = (event: SelectChangeEvent<string>) => {
    setOption(props.fieldItems.find((element: KeyRequestFieldEntry) => element.NAME === event.target.value)!);
  };
  const handleTextFieldChange = (event: any) => {
    setText(event.target.value);
  };

  return (
    <Grid container columnSpacing={5}>
      <Grid item xs={2} justifyContent="center">
        <Typography variant="h2" align="center">
          {capitalise(props.fieldName)}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Select
          value={option.NAME}
          renderValue={() => option.NAME}
          onChange={handleOptionChange}
          variant="outlined"
          fullWidth
          sx={{
              '& .MuiSelect-select': {
                  paddingTop: 1,
                  paddingBottom: 1,
              },
          }}
        >
          {props.fieldItems.map((option) => (
            <MenuItem key={option.NAME} value={option.NAME}>
              {capitalise(option.NAME)}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={5}>
        <TextField
          label="Custom API Key"
          variant="outlined"
          fullWidth
          value={text}
          onChange={handleTextFieldChange}
          placeholder="Or enter a custom API key"
          size="small"
        />
      </Grid>
    </Grid>
  );
}
