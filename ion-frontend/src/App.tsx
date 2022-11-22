import * as React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Forex from './pages/securities/[forex]';
import { ROUTES } from './common/constant/routes';
import Portfolio from 'pages/portfolio';
import Landing from 'pages/landing';

function App() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.PUBLIC.LANDING} element={<Landing />} />
                <Route path={`${ROUTES.PUBLIC.FOREX}/:symbolId`} element={<Forex />} />
                <Route path={ROUTES.PUBLIC.PORTFOLIO} element={<Portfolio />} />
            </Routes>
        </Router>
    );
}

export default App;
