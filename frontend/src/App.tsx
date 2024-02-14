import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ROUTES } from './common/constant/routes';

import Private from 'components/Routes/Private';

import { SignIn, SignUp } from 'pages/Authentication';
import Landing from 'pages/Landing';
import Economic from 'pages/Economic';

function App() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.LANDING} element={<Landing />} />
                <Route path={ROUTES.SIGNIN} element={<SignIn />} />
                <Route path={ROUTES.SIGNUP} element={<SignUp />} />
                <Route path={ROUTES.ECONOMIC_DATA} element={<Private components={Economic} />} />
            </Routes>
        </Router>
    );
}

export default App;
