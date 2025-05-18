import { createContext, useContext, useState, useEffect } from 'react';
import { getUser } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async() => {
            try {
                const userData = await getUser();
                setUser(userData);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return ( <
        AuthContext.Provider value = {
            { user, loading, login, logout } } > { children } 
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};