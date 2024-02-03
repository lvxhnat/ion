import * as React from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../../common/routes';
import { ENDPOINTS } from '../../../common/endpoints';
import request from '../../../common/services/Request';

export default function Private({ FC }: any) {
    const [cookies, , removeCookies] = useCookies(['access_token', 'refresh_token']);
    const [isValid, setIsValid] = React.useState<boolean>(!!cookies.access_token);

    useEffect(() => {
        const access_token = cookies.access_token
        if (!access_token) {
            localStorage.removeItem('user');
            removeCookies('access_token');
            removeCookies('refresh_token');
            return
        } else {
        request.post(ENDPOINTS.AUTH, {}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`,
            }
        }).then((res) => setIsValid(true)).catch((err) => setIsValid(false))
        }
    });

    if (isValid) {
        return <FC />;
    } else {
        return <Navigate to={ROUTES.SIGNIN} />;
    }
}
