import * as React from "react";

import { Alert, CssBaseline, Divider, Snackbar, Stack } from "@mui/material";
import Navigation from "components/Navigation";
import { ALERTS } from "common/constant/literals";

export interface ContainerWrapperProps {
  children: React.ReactNode;
  hideNavigate?: boolean;
}

export default function ContainerWrapper(props: ContainerWrapperProps) {
  const [online, setOnline] = React.useState<boolean>(navigator.onLine);

  if (window.location.href === "/")
    console.log(
      "██╗ ██████╗ ███╗   ██╗    ███████╗███╗   ██╗ ██████╗ ██╗███╗   ██╗███████╗\n██║██╔═══██╗████╗  ██║    ██╔════╝████╗  ██║██╔════╝ ██║████╗  ██║██╔════╝\n██║██║   ██║██╔██╗ ██║    █████╗  ██╔██╗ ██║██║  ███╗██║██╔██╗ ██║█████╗  \n██║██║   ██║██║╚██╗██║    ██╔══╝  ██║╚██╗██║██║   ██║██║██║╚██╗██║██╔══╝  \n██║╚██████╔╝██║ ╚████║    ███████╗██║ ╚████║╚██████╔╝██║██║ ╚████║███████╗\n╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝╚══════╝"
    );

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
    <Stack
      style={{
        height: "100vh",
        paddingLeft: 20,
        paddingRight: 20,
      }}
      alignItems="center"
    >
      <CssBaseline />
      <Navigation hideNavigate={props.hideNavigate} />
      {props.hideNavigate ? <></> : <Divider style={{ width: "100%" }} />}
      <div style={{ paddingTop: 10, height: "100%", width: "100%", overflowY: "hidden" }}>
        {props.children}
      </div>
      {!online ? (
        <Snackbar open={true}>
          <Alert severity="error"> {ALERTS.OFFLINE} </Alert>
        </Snackbar>
      ) : null}
    </Stack>
  );
}
