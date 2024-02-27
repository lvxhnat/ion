import * as React from "react";

import { ColorsEnum } from "common/theme";

import { styled } from "@mui/system";

interface DropdownButtonOptionProps {
  onClick?: () => void;
  children?: any;
}

export const ButtonWrapper = styled("div")(({ theme }) => ({
  gap: 3,
  display: "flex",
  alignItems: "center",
  backgroundColor: ColorsEnum.warmgray2,
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  "&:hover": {
    backgroundColor: ColorsEnum.darkGrey,
    cursor: "pointer",
  },
}));

export const FlexRow = styled("div")<{ alternate?: boolean }>(
  ({ theme, alternate }) => ({
    gap: 5,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: alternate ? ColorsEnum.darkGrey : ColorsEnum.warmgray1,
    padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
    "&:hover": {
      backgroundColor: ColorsEnum.beer,
      cursor: "pointer",
    },
  })
);

export default function DropdownButton(props: {
  options: DropdownButtonOptionProps[];
  children?: any;
}) {
  const [menu, setMenu] = React.useState<boolean>(false);

  return (
    <div>
      <ButtonWrapper onClick={() => setMenu(!menu)}>
        {props.children}
      </ButtonWrapper>
      <div
        style={{
          zIndex: 10,
          position: "absolute",
          display: menu ? "block" : "none",
        }}
      >
        {props.options.map(
          (option: DropdownButtonOptionProps, index: number) => {
            return (
              <FlexRow
                key={`DropdownButton_FlexRow_${index}`}
                alternate={index % 2 === 0}
                onClick={() => {
                  if (option.onClick) option.onClick();
                  setMenu(false);
                }}
              >
                {option.children}
              </FlexRow>
            );
          }
        )}
      </div>
    </div>
  );
}
