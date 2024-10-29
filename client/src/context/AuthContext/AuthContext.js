import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simular la autenticación
    useEffect(() => {
        const simulateAuth = async () => {
            setLoading(true);
            // Simular una llamada a API para verificar autenticación
            const userData = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
                }, 1000); // Simula un retraso de 1 segundo
            });

            setUser(userData);
            setLoading(false);
        };

        simulateAuth();
    }, []);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Eliminar el usuario de localStorage
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};
