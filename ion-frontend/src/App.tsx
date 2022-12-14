import * as React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ROUTES } from './common/constant/routes';

import Forex from './pages/securities/[forex]';
import Portfolio from 'pages/portfolio';
import Landing from 'pages/landing';
import CustomAnalysis from 'pages/customanalysis';

function App() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.PUBLIC.LANDING} element={<Landing />} />
                <Route path={`${ROUTES.PUBLIC.FOREX}/:symbolId`} element={<Forex />} />
                <Route path={ROUTES.PUBLIC.PORTFOLIO} element={<Portfolio />} />
                <Route path={ROUTES.PUBLIC.CUSTOM_ANALYSIS} element={<CustomAnalysis />} />
            </Routes>
        </Router>
    );
}

export default App;
