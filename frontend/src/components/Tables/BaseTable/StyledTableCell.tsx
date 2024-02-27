import { ColorsEnum } from "common/theme";
import * as React from "react";
import * as S from "./style";
import { Typography } from "@mui/material";

interface StyledTableCellProps {
  children?: React.ReactNode;
  isHeader?: boolean;
  width?: string;
  color?: string;
  [props: string]: any;
}

export function StyledTableCell({
  children,
  isHeader,
  width,
  color,
  ...props
}: StyledTableCellProps) {
  return (
    <S.TableCellWrapper {...props} width={width}>
      <Typography
        noWrap
        variant="subtitle2"
        align="center"
        component="div"
        style={{
          color: color
            ? color
            : isHeader
            ? ColorsEnum.white
            : ColorsEnum.primary,
        }}
      >
        {children}
      </Typography>
    </S.TableCellWrapper>
  );
}

export function StyledChartCell({ children, width }: StyledTableCellProps) {
  return <S.TableCellWrapper width={width}>{children}</S.TableCellWrapper>;
}
