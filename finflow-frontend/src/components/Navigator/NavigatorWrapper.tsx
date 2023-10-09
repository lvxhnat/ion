import * as React from "react";

import { Alert, CssBaseline, Grid, Snackbar } from "@mui/material";
import Navigator from "./Navigator";
import { NavigatorWrapperProps } from "./type";
import { ALERTS } from "../../common/literals";

export default function NavigatorWrapper(props: NavigatorWrapperProps) {
  const [online, setOnline] = React.useState<boolean>(navigator.onLine);

  React.useEffect(() => {
    const handleStatusChange = () => setOnline(navigator.onLine);
    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [online]);

  return (
    <Grid container style={{ height: "100vh" }} flexDirection="column">
      <Navigator />
      <Grid container style={{ flexGrow: 1 }}>
        <CssBaseline />
        {props.children}
      </Grid>
      {!online ? (
        <Snackbar open={true}>
          <Alert severity="error"> {ALERTS.OFFLINE} </Alert>
        </Snackbar>
      ) : null}
    </Grid>
  );
}
