import React, { useState } from 'react';
import Images from '../../utils/Images/Images';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import { RiShoppingCartLine, RiAccountCircleLine } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext/AuthContext';
import AccountModal from '../AccountModal/AccountModal';
import CartModal from '../CartModal/CartModal';

const Header = () => {
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const location = useLocation();
    const path = location.pathname;
    const { user } = useAuth();

    const closeMenu = () => {
        setIsAccountMenuOpen(false);
    };

    const toggleAccountMenu = () => {
        setIsAccountMenuOpen(!isAccountMenuOpen);
    };

    const closeCartModal = () => {
        setIsCartModalOpen(false);
    };

    const toggleCartModal = () => {
        // Opcional: cerrar el menú de cuenta si se abre el carrito
        if (isAccountMenuOpen) closeMenu();
        setIsCartModalOpen(prev => !prev);
    };

    return (
        <header className="header">
            <div className="header__container">
                <div className='logo-header__container'>
                    <Link to="/">
                        <img src={Images.logos.logo} alt="Logo" className="header__logo" />
                    </Link>
                </div>

                <div className='navigation-header__container'>
                    <div className={`sections-header__container ${isAccountMenuOpen ? 'expanded' : ''}`}>
                        <Link to="/Nosotros" className={path === "/Nosotros" ? "active" : ""}>NOSOTROS</Link>
                        <Link to="/Productos" className={path === "/Productos" ? "active" : ""}>PRODUCTOS</Link>
                        <Link to="/Contacto" className={path === "/Contacto" ? "active" : ""}>CONTÁCTENOS</Link>
                    </div>

                    <div className={`icons-header__container ${isAccountMenuOpen ? 'expanded' : ''}`}>
                        <ul className="header__list">
                            <li className="header__element" onClick={toggleCartModal}>
                                <RiShoppingCartLine className="cart-icon" />
                            </li>
                            <li className="header__element" onClick={toggleAccountMenu}>
                                <RiAccountCircleLine className="account-icon" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {isAccountMenuOpen && (
                <AccountModal onClose={closeMenu} isOpen={isAccountMenuOpen} />
            )}

            {/* Modal del carrito */}
            <CartModal isOpen={isCartModalOpen} onClose={closeCartModal} />
        </header>
    );
}

export default Header;
