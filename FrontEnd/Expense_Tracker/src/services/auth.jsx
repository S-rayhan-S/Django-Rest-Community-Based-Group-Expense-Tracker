import api from './api';

export const login = async({ email, password }) => {
    const response = await api.post('/auth/login/', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data.user;
};

export const register = async(userData) => {
    const response = await api.post('/auth/register/', userData);
    return response.data;
};

export const getUser = async() => {
    try {
        const response = await api.get('/auth/user/');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};