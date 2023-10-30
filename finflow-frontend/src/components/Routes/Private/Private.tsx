import * as React from 'react';
import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../../provider/UserProvider';

export default function Private({ FC }: any) {
    const userCtx = useContext(UserContext);
    const [cookies, , removeCookies] = useCookies(['access_token', 'refresh_token']);

    useEffect(() => {
        if (!cookies.access_token) {
            userCtx?.setUser(null);
            localStorage.removeItem('user');
            removeCookies('access_token');
            removeCookies('refresh_token');
        }
    });

    if (cookies.access_token) {
        return <FC />;
    } else {
        return <Navigate to="/login" />;
    }
}
