import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ROUTES } from './common/constant/routes';

import Private from 'components/Routes/Private';

import { SignIn } from 'pages/Authentication';
import Landing from 'pages/Landing';

import Ticker from 'pages/[ticker]';
import Portfolio from 'pages/portfolio';
import Function from 'pages/functions/function';
import Geopolitics from 'pages/geopolitics';

import ChartDashboard from 'pages/chartdashboard';
import Economic from 'pages/Economic';

function App() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.LANDING} element={<Private FC={Landing} />} />
                <Route path={ROUTES.SIGNIN} element={<SignIn />} />
                <Route path={ROUTES.ECONOMIC_DATA} element={<Economic />} />

                <Route path={`${ROUTES.SECURITIES}/:assetType/:symbolId`} element={<Ticker />} />
                <Route path={ROUTES.FUNCTION} element={<Function />} />
                <Route path={ROUTES.PORTFOLIO} element={<Portfolio />} />
                <Route path={ROUTES.GEOPOLITICS} element={<Geopolitics />} />
                <Route path={ROUTES.CHARTDASHBOARD} element={<ChartDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
