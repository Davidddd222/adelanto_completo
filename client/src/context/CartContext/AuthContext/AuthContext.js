import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (credentials) => {
        setLoading(true);
        // Simula la verificación de credenciales
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.correo === credentials.email && storedUser.password === credentials.password) {
            setUser(storedUser);
            toast.success('Inicio de sesión exitoso!');
        } else {
            toast.error('Credenciales incorrectas');
        }
        setLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        toast.info('Has cerrado sesión.');
    };

    const register = (userData) => {
        const userWithRole = { ...userData, rol: 'Usuario' };
        localStorage.setItem('user', JSON.stringify(userWithRole));
        setUser(userWithRole);
        toast.success('Registro exitoso. Estás ahora logueado.');
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
