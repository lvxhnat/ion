import * as React from 'react';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useCookies } from 'react-cookie';
import { ENDPOINTS } from '../../common/endpoints';
import { User } from './type';

interface UserCtx {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = React.createContext<UserCtx | null>(null);

export default function UserProvider({ children }: any) {
    const [user, setUser] = React.useState<User | null>(null);
    const [, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token']);

    React.useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) setUser(JSON.parse(userData));
    }, []);

    React.useEffect(() => {
        // Move axios to useEffect due to async nature
        axios.interceptors.response.use(
            config => {
                if (!config.headers.authorization && config.status === 401) {
                    config.headers.authorization = `Bearer ${user?.token?.access}`;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }, [user]);

    const refreshAuthLogic = (failedRequest: any) => {
        const data = {
            refresh: user?.token?.refresh,
        };

        return axios({
            url: ENDPOINTS.AUTH.REFRESH_TOKEN,
            method: 'POST',
            data,
        })
            .then(async tokenRefreshResponse => {
                const new_access_token = tokenRefreshResponse.data.access;

                failedRequest.response.config.headers.authorization = 'Bearer ' + new_access_token;

                // Save to cookie
                // @ts-ignore
                setCookie('access_token', new_access_token);

                // Save to local storage
                const item = {
                    ...user,
                    token: {
                        ...user!.token!,
                        access: new_access_token,
                    },
                };
                localStorage.setItem('user', JSON.stringify(item));

                // Set in user context
                setUser(item);

                return Promise.resolve();
            })
            .catch(e => {
                setUser(null);
                removeCookie('access_token');
                removeCookie('refresh_token');
            });
    };

    const userContext = { user, setUser };
    createAuthRefreshInterceptor(axios, refreshAuthLogic);

    return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
}
