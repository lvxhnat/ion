import { Grid, Typography } from "@mui/material";
import React from "react";

type TypographyVariants =
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "inherit"
  | "overline"
  | "subtitle1"
  | "subtitle2";
interface GridTypographyProps {
  noWrap?: boolean;
  variant?: TypographyVariants;
  xs: number;
  children: React.ReactNode;
}

export default function GridTypography(props: GridTypographyProps) {
  return (
    <Grid item xs={props.xs}>
      <Typography variant={props.variant} noWrap={props.noWrap}>
        {props.children}
      </Typography>
    </Grid>
  );
}
