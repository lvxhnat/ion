import { THEME_MODE_KEY } from "common/constant";
import { getCookie } from "common/helper/cookies";
import ThemeProvider from "providers/ThemeProvider";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "providers/AuthProvider/AuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function ThemedApp() {
  const modeTheme = getCookie(THEME_MODE_KEY);

  return (
    <AuthProvider>
      <ThemeProvider modeTheme={modeTheme}>
        <App />
      </ThemeProvider>
    </AuthProvider>
  );
}

root.render(<ThemedApp />);
