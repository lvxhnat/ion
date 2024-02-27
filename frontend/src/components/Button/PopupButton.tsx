import * as S from "./style";
import * as React from "react";

import Typography from "@mui/material/Typography";

export default function PopupButton(props: {
  children: string;
  [props: string]: any;
  buttonType: "primary" | "secondary";
}) {
  return (
    <S.StyledButton {...props}>
      <Typography variant="subtitle2">{props.children}</Typography>
    </S.StyledButton>
  );
}
