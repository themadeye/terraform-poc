import {createContext, ReactNode, useContext, useState} from 'react';

import {useNavigate} from 'react-router-dom';

import {AuthContextType, User} from '../types/ContextTypes.ts';

export const AuthContext = createContext<AuthContextType | null>(null);

// @ts-ignore
const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();

    const login = async (data: User) => {
        try {
            const response = await fetch("your-api-endpoint/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            if (res.data) {
                setUser(res.data.user);
                setToken(res.token);
                localStorage.setItem("site", res.token);
                navigate('/upload');
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate('/login');
    };

    return <AuthContext.Provider value={{token, user, login, logout}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
