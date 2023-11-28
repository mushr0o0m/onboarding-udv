import axios, { AxiosError } from 'axios';

const apiUrl = 'http://127.0.0.1:8000';

interface LoginCredentials {
    email: string;
    password: string;
}

export const authenticateUser = async (credentials: LoginCredentials): Promise<string> => {
    try {
        const response = await axios.post(`${apiUrl}/auth/token/login/`, credentials);
        const token = response.data.auth_token;

        console.log(`Authorization: Token ${token}`)

        return token;

    } catch (error) {
        console.error('Authentication Error:',
            (error as AxiosError)?.response?.data || (error as Error).message);
        throw error;
    }
};

export const getUserType = async (token: string | Promise<string>): Promise<string> => {
    try {
        const response = await axios.get(`${apiUrl}/api/who/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });

        const userType = response.data.who;
        console.log(userType)
        return userType;

    } catch (error) {
        console.error('Get User Type Error:',
            (error as AxiosError)?.response?.data || (error as Error).message);
        throw error;
    }
};

export const logoutUser = async (token: string | Promise<string>) => {
    try {
        console.log(token)
        await axios.post(`${apiUrl}/auth/token/logout/`, {}, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });

    } catch (error) {
        console.error('Logout Error:',
            (error as AxiosError)?.response?.data || (error as Error).message);
        throw error;
    }
};