import axios from 'axios';
import { Credentials } from './type';
import { ENDPOINTS } from '../../endpoints';

class AuthService {
    login(credentials: Credentials) {
        return axios
            .post(ENDPOINTS.AUTH.ACCESS_TOKEN, credentials)
            .then((response: any) => {
                return response.data;
            })
            .catch((err: any) => {
                return err.data;
            });
    }
}

const AuthServiceInstance = new AuthService();
export default AuthServiceInstance;
