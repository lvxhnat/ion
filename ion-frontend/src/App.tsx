import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing/Landing';
import { ROUTES } from './common/constant/routes'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.PUBLIC.LANDING} element={<Landing />} />
      </Routes>
    </Router >
  );
}

export default App;
