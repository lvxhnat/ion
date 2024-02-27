import * as React from "react";
import { MdWaterfallChart } from "react-icons/md";
import Typography from "@mui/material/Typography";

export default function NoDataSkeleton(props: { text: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        opacity: 0.5,
      }}
    >
      <MdWaterfallChart
        style={{ width: "calc(25px + 0.5vw)", height: "calc(25px + 0.5vw)" }}
      />
      <Typography variant="subtitle2" component="div">
        {props.text}
      </Typography>
    </div>
  );
}
