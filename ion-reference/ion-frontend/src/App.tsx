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

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path={`${ROUTES.PUBLIC.SECURITIES}/:assetType/:symbolId`}
                    element={<Ticker />}
                />
                <Route path={ROUTES.PUBLIC.LANDING} element={<Landing />} />
                <Route path={ROUTES.PUBLIC.FUNCTION} element={<Function />} />
                <Route path={ROUTES.PUBLIC.PORTFOLIO} element={<Portfolio />} />
                <Route path={ROUTES.PUBLIC.GEOPOLITICS} element={<Geopolitics />} />
                <Route path={ROUTES.PUBLIC.EXPLORER} element={<Explorer />} />
                <Route path={ROUTES.PUBLIC.WATCHLIST} element={<WatchlistPage />} />
                <Route path={ROUTES.PUBLIC.CHARTDASHBOARD} element={<ChartDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
