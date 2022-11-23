import * as React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ROUTES } from './common/constant/routes';

import Forex from './pages/securities/[forex]';
import Portfolio from 'pages/portfolio';
import Landing from 'pages/landing';
import Overview from 'pages/overview/overview';

function App() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.PUBLIC.LANDING} element={<Landing />} />
                <Route path={ROUTES.PUBLIC.FOREX_OVERVIEW} element={<Overview />} />
                <Route path={`${ROUTES.PUBLIC.FOREX}/:symbolId`} element={<Forex />} />
                <Route path={ROUTES.PUBLIC.PORTFOLIO} element={<Portfolio />} />
            </Routes>
        </Router>
    );
}

export default App;
