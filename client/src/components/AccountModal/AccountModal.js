import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountModal.css'; 
import { useAuth } from '../../context/AuthContext/AuthContext';

const AccountModal = ({ isOpen = false, onClose }) => {
    const { user, logout } = useAuth();
    const [userInfo, setUserInfo] = useState({ nombre: '', correo: '' });
    const navigate = useNavigate();
    const modalRef = useRef(null);

    useEffect(() => {
        if (user) {
            // Si ya tienes los datos del usuario en el contexto, puedes asignarlos directamente
            setUserInfo({
                nombre: user.nombre || 'Usuario',
                correo: user.correo || 'No disponible',
            });
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        onClose();
    };

    const handleLoginRedirect = () => {
        navigate('/Login');
        onClose();
    };

    return (
        <div className={`account-modal ${isOpen ? 'show' : 'close-animation'}`}>
            <div className="account-modal__content" ref={modalRef}>
                {user ? (
                    <>
                        <h2 className='welcome-account'>¡Bienvenido, {userInfo.nombre}!</h2>
                        <p className='account-mail'>{userInfo.correo}</p>
                        
                        <a href='/AccountManage' className='account-management'>Gestionar Cuenta y Ordenes</a>
                        {(user.rol === 'Administrador' || user.rol === 'Empleado') && (
                            <a href="/ProductManage" className='management'>Ir a gestiones</a>
                        )}
                        <button onClick={handleLogout} className='logout-button'>Cerrar sesión</button>
                    </>
                ) : (
                    <>
                        <h2>No has iniciado sesión</h2>
                        <p>Por favor, inicia sesión para acceder a tu cuenta.</p>
                        <button onClick={handleLoginRedirect} className='login-button'>Ir a Iniciar sesión</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AccountModal;
