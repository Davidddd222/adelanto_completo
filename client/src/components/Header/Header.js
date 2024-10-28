import React, { useState } from 'react';
import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiShoppingCartLine, RiAccountCircleLine } from 'react-icons/ri';

const Header = () => {
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate(); // Importa useNavigate

    const closeModals = () => {
        setIsAccountModalOpen(false);
    };

    const toggleAccountModal = () => {
        if (isAccountModalOpen) {
            setIsAccountModalOpen(false);
            setIsHeaderExpanded(false);
        } else {
            closeModals(); // Cierra la otra modal si está abierta
            setIsHeaderExpanded(true);
            setIsAccountModalOpen(true);
        }
    };

    // Función para manejar la redirección al carrito
    const goToCart = () => {
        navigate('/carrito'); // Cambia '/carrito' a la ruta real de tu página de carrito
    };

    return (
        <header className="header">
            <div className="header__container">
                <div className='logo-header__container'>
                    <Link to={"/"}>
                        {/* Logo aquí */}
                    </Link>
                </div>

                <div className='navigation-header__container'>
                    <div className={`sections-header__container ${isHeaderExpanded ? 'expanded' : ''}`}>
                        <Link to="/Nosotros" className={path === "/Nosotros" ? "active" : ""}>NOSOTROS</Link>
                        <Link to="/Productos" className={path === "/Productos" ? "active" : ""}>PRODUCTOS</Link>
                        <Link to="/Contacto" className={path === "/Contacto" ? "active" : ""}>CONTÁCTENOS</Link>
                    </div>

                    <div className={`icons-header__container ${isHeaderExpanded ? 'expanded' : ''}`}>
                        <ul className="header__list">
                            <li className="header__element" onClick={goToCart}> {/* Redirige al carrito */}
                                <RiShoppingCartLine className="cart-icon" />
                            </li>
                            <li className="header__element" onClick={toggleAccountModal}>
                                <RiAccountCircleLine className="account-icon" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* <CartModal isOpen={isCartModalOpen} onClose={toggleCartModal} />
            <AccountModal isOpen={isAccountModalOpen} onClose={toggleAccountModal} /> */}
        </header>
    );
}

export default Header;
