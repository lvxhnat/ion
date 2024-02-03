import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ROUTES } from './common/constant/routes';

import Ticker from 'pages/[ticker]';
import Portfolio from 'pages/portfolio';
import Landing from 'pages/landing';
import Function from 'pages/functions/function';
import Geopolitics from 'pages/geopolitics';
import Explorer from 'pages/explorer';

import { WatchlistPage } from 'pages/landing/watchlist';
import ChartDashboard from 'pages/chartdashboard';
import Private from 'components/Routes/Private';
import { SignIn } from 'pages/Authentication';

function App() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.LANDING} element={<Private FC={Landing} />} />
                <Route path={ROUTES.SIGNIN} element = {<SignIn />} />

                <Route
                    path={`${ROUTES.SECURITIES}/:assetType/:symbolId`}
                    element={<Ticker />}
                />
                <Route path={ROUTES.FUNCTION} element={<Function />} />
                <Route path={ROUTES.PORTFOLIO} element={<Portfolio />} />
                <Route path={ROUTES.GEOPOLITICS} element={<Geopolitics />} />
                <Route path={ROUTES.EXPLORER} element={<Explorer />} />
                <Route path={ROUTES.WATCHLIST} element={<WatchlistPage />} />
                <Route path={ROUTES.CHARTDASHBOARD} element={<ChartDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
