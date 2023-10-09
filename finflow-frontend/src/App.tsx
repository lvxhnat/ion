import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ROUTES } from "./common/routes";

import Overview from "./pages/Overview";
import APIKeyRequest from "./pages/KeyRequestForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.OVERVIEW} element={<Overview />} />
        <Route path={ROUTES.KEYS} element={<APIKeyRequest />} />
      </Routes>
    </Router>
  );
}

export default App;
