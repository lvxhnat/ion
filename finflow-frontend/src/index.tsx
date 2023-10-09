import * as React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { getCookie } from "./common/helper/cookies";
import { THEME_MODE_KEY } from "./common/theme";
import ThemeProvider from "./provider/ThemeProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function ThemedApp() {
  const modeTheme = getCookie(THEME_MODE_KEY);

  return (
    <ThemeProvider modeTheme={modeTheme}>
      <App />
    </ThemeProvider>
  );
}

root.render(<ThemedApp />);
