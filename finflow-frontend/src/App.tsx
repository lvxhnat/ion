import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ROUTES } from "./common/routes";

import Overview from "./pages/Overview";
import APIKeyRequest from "./pages/KeyRequestForm";
import { ForgotPassword, Login } from "./pages/Authentication";
import Private from "./components/Routes/Private";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.KEYS} element={<APIKeyRequest />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.OVERVIEW} element={<Private FC={Overview} />} />
      </Routes>
    </Router>
  );
}

export default App;
