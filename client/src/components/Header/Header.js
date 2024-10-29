import React, { useState } from 'react';
import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiShoppingCartLine, RiAccountCircleLine } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext/AuthContext';
import UserMenu from '../UserMenu/UserMenu';
import AccountModal from '../AccountModal/AccountModal';

const Header = () => {
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(true);
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const { user } = useAuth();

    const closeMenu = () => {
        setIsAccountMenuOpen(false);
    };

    const toggleAccountMenu = () => {
        setIsAccountMenuOpen(!isAccountMenuOpen);
    };

    const goToCart = () => {
        navigate('/Carrito');
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
                    <div className={`sections-header__container ${isAccountMenuOpen ? 'expanded' : ''}`}>
                        <Link to="/Nosotros" className={path === "/Nosotros" ? "active" : ""}>NOSOTROS</Link>
                        <Link to="/Productos" className={path === "/Productos" ? "active" : ""}>PRODUCTOS</Link>
                        <Link to="/Contacto" className={path === "/Contacto" ? "active" : ""}>CONTÁCTENOS</Link>
                    </div>

                    <div className={`icons-header__container ${isAccountMenuOpen ? 'expanded' : ''}`}>
                        <ul className="header__list">
                            <li className="header__element" onClick={goToCart}>
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
                <AccountModal onClose={closeMenu} isOpen={toggleAccountMenu} />
            )}
        </header>
    );
}

export default Header;
