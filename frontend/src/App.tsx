import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ROUTES } from "./common/constant/routes";

import Private from "components/Routes/Private";

import { SignIn, SignUp } from "pages/Authentication";
import Landing from "pages/Landing";
import Economic from "pages/Economic";
import About from "pages/About";
import Portfolio from "pages/Portfolio";
import PortfolioView from "pages/[PortfolioView]";
import UserApiKeys from "pages/UserApiKeys";
import ReleaseView from "pages/[ReleaseView]";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.SIGNIN} element={<SignIn />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.LANDING} element={<Private FC={Landing} />} />
        <Route path={ROUTES.PORTFOLIO} element={<Private FC={Portfolio} />} />
        <Route
          path={`${ROUTES.PORTFOLIO}/:portfolioName`}
          element={<Private FC={PortfolioView} />}
        />
        <Route
          path={ROUTES.ECONOMIC_DATA}
          element={<Private FC={Economic} />}
        />
        <Route
          path={`${ROUTES.ECONOMIC_DATA}/:releaseId`}
          element={<Private FC={ReleaseView} />}
        />
        <Route
          path={ROUTES.USER_API_KEYS}
          element={<Private FC={UserApiKeys} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
