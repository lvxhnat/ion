import React from "react";
import WidgetWrapper from "../../../components/Wrappers/WidgetWrapper.tsx";
import LivePlayer from "./LivePlayer";

export default function LivePlayerWidget() {
  return (
    <WidgetWrapper>
      <LivePlayer />
    </WidgetWrapper>
  );
}
