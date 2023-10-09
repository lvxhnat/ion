import * as React from "react";
import "moment-timezone";
import moment from "moment";
import { Grid, Typography } from "@mui/material";

import { ColorsEnum } from "../../../../../common/theme";
import { TimePieceProps } from "./type";

export default function TimePiece(props: TimePieceProps) {
  const [date, setDate] = React.useState<string>("");
  const [time, setTime] = React.useState<string>("");
  const [color, setColor] = React.useState<string>("");

  React.useEffect(() => {
    const interval = setInterval(() => {
      moment.tz.setDefault(props.timeZone);
      const timeZone = moment();
      setDate(timeZone.format("ddd DD/MM \\G\\M\\T \xa0 Z"));
      setTime(timeZone.format("HH:mm:ss"));
      setColor(
        ColorsEnum[`beer${timeZone.hours()}` as keyof typeof ColorsEnum]
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Grid container>
        <Typography variant="h1" align="center" sx={{ padding: 1 }}>
          {time}
        </Typography>
        <Typography
          variant="h3"
          align="left"
          sx={{ color: ColorsEnum.coolgray4 }}
        >
          {date}
        </Typography>
        <Typography variant="h2" align="left" sx={{ color: ColorsEnum.beer }}>
          {props.timeZoneName}
        </Typography>
      </Grid>
    </>
  );
}
