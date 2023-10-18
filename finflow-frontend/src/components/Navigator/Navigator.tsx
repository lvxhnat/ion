import * as React from "react";
import { AppBar, Box, Grid, Toolbar } from "@mui/material";
import ToggleThemeMode from "./ToggleThemeMode";

export default function Navigator() {
  return (
    <Toolbar>
      <AppBar>
        <Grid container style={{ padding: 10 }}>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap={3}
            >
              <ToggleThemeMode />
            </Box>
          </Grid>
        </Grid>
      </AppBar>
    </Toolbar>
  );
}
