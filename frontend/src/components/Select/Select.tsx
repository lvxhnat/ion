import * as React from "react";
import { ColorsEnum } from "common/theme";
import { useThemeStore } from "store/theme";

interface SelectProps {
  options: SelectOptions[];
  [others: string]: any;
}

interface SelectOptions {
  value: string;
  name: string;
}

export default function Select(props: SelectProps) {
  const { mode } = useThemeStore();
  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <select
        {...props}
        style={{
          width: "100%",
          backgroundColor: "transparent",
          color: mode === "dark" ? ColorsEnum.white : ColorsEnum.black,
          paddingLeft: 2,
          borderRadius: 2,
          height: 25,
          fontSize: `calc(0.4rem + 0.3vw)`,
        }}
      >
        {props.options.map((entry: SelectOptions, index: number) => (
          <option value={entry.value} key={`${entry.value}_${index}`}>
            {entry.name}
          </option>
        ))}
      </select>
    </div>
  );
}
