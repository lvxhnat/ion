import * as React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Forex from './pages/Forex/Forex';
import { ROUTES } from './common/constant/routes';
import Portfolio from 'pages/Portfolio';
import Landing from 'pages/Landing';

function App() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.PUBLIC.LANDING} element={<Landing />} />
                <Route path={ROUTES.PUBLIC.FOREX} element={<Forex />} />
                <Route path={ROUTES.PUBLIC.PORTFOLIO} element={<Portfolio />} />
            </Routes>
        </Router>
    );
}

export default App;
