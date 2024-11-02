import React, { useState } from 'react';
import './CartModal.css';
import { useCart } from '../../context/CartContext/CartContext';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const CartModal = ({ isOpen, onClose }) => {
    const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false); // Mantener estado de animación

    const handleClose = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
            onClose();
        }, 200);
    };

    const handleQuantityChange = (id, quantity) => {
        if (quantity >= 1) {
            updateCartItemQuantity(id, quantity);
        }
    };

    const handleRemoveItem = (id) => {
        removeFromCart(id);
    };

    const handleGoToCart = () => {
        navigate('/Carrito');
        handleClose();
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={`modal ${isOpen ? 'show' : ''} ${isAnimating ? 'close-animation' : ''}`} onClick={handleClose}>
            <div className={`modal__content ${isAnimating ? 'close' : ''}`} onClick={handleModalClick}>
                <div className="cart__header">
                    <h3 className='cart__articles'>Artículos: {totalItems}</h3>
                    <button className="cart__clear" onClick={clearCart}>Vaciar Carrito</button>
                </div>
                {cartItems.length > 0 ? (
                    <>
                        <ul className="cart__list">
                            {cartItems.map((item) => (
                                <li key={item.id} className="cart__item">
                                    <img src={item.imagen} alt={item.nombre} className="cart__image" />
                                    <div className="cart__details">
                                        <h3 className="cart__name">{item.nombre}</h3>
                                        <p className="cart-price">${item.precio.toFixed(3)}</p>
                                        <div className="cart__quantity">
                                            <label>Cantidad:</label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                            />
                                        </div>
                                        <button className="cart__remove" onClick={() => handleRemoveItem(item.id)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="cart__subtotal">
                            <h3>Subtotal: ${subtotal.toFixed(3)}</h3>
                        </div>
                        <button
                            className="cart__checkout"
                            onClick={handleGoToCart}
                            disabled={loading}
                        >
                            {loading ? 'Cargando...' : 'Ir a carrito'}
                        </button>
                    </>
                ) : (
                    <p>El carrito está vacío.</p>
                )}
            </div>
        </div>
    );
};

export default CartModal;
