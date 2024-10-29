import React from 'react';
import './UserMenu.css'; // Asegúrate de que este archivo exista

const UserMenu = ({ user, onClose }) => {
    return (
        <div className="user-menu">
            <h2>Bienvenido, {user.nombre}!</h2>
            <ul>
                <li onClick={onClose}>Cambiar Contraseña</li>
                <li onClick={onClose}>Mis Pedidos</li>
                <li onClick={onClose}>Cerrar Sesión</li>
            </ul>
        </div>
    );
};

export default UserMenu;
