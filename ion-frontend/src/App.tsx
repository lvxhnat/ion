import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import { ROUTES } from './common/constant/routes';
import Portfolio from 'pages/Portfolio';

function App() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.PUBLIC.LANDING} element={<Landing />} />
                <Route path={ROUTES.PUBLIC.PORTFOLIO} element={<Portfolio />} />
            </Routes>
        </Router>
    );
}

export default App;
