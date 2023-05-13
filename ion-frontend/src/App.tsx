import * as React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ROUTES } from './common/constant/routes';

import Analysis from 'pages/[analysis]';
import Explore from 'pages/etfexplorer';
import Portfolio from 'pages/portfolio';
import Landing from 'pages/landing';
import Function from 'pages/functions/function';
import { HealthChecksPage } from 'functions/healthchecks/page';
import { WatchlistPage } from 'functions/watchlist';

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path={`${ROUTES.PUBLIC.ANALYSIS}/:assetType/:symbolId`}
                    element={<Analysis />}
                />
                <Route path={ROUTES.PUBLIC.LANDING} element={<Landing />} />
                <Route path={ROUTES.PUBLIC.FUNCTION} element={<Function />} />
                <Route path={ROUTES.PUBLIC.PORTFOLIO} element={<Portfolio />} />
                <Route path={ROUTES.PUBLIC.EXPLORE} element={<Explore />} />
                <Route path={ROUTES.PUBLIC.HEALTHCHECK} element={<HealthChecksPage />} />
            </Routes>
        </Router>
    );
}

export default App;
