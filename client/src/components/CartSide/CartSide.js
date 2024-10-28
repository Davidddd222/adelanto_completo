import React from 'react';
import './CartSide.css';
import { useCart } from '../../context/CartContext/CartContext';
import { useAuth } from '../../context/AuthContext/AuthContext';

const CartSide = ({ onClose, isOpen }) => {
    const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } = useCart();
    const { user } = useAuth(); 
    const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);

    const handleQuantityChange = (id, quantity) => {
        if (quantity >= 1) {
            updateCartItemQuantity(id, quantity);
        }
    };

    const handleRemoveItem = (id) => {
        removeFromCart(id);
    };

    const handleCheckout = () => {
        if (!user) {
            alert('Debes iniciar sesión para realizar una compra.');
            return;
        }
        
        // Aquí puedes implementar la lógica para procesar el pago o realizar la venta localmente
        clearCart();
        onClose(); 
    };

    return (
        <div className={`cart-side ${isOpen ? 'open' : 'closed'}`}>
            <div className="cart-side__content">
                <h2>Carrito de Compras</h2>
                {cartItems.length > 0 ? (
                    <>
                        <ul className="cart__list">
                            {cartItems.map((item) => (
                                <li key={item.id} className="cart__item">
                                    <img src={item.imagen} alt={item.nombre} className="cart__image" />
                                    <div className="cart__details">
                                        <h3 className="cart__name">{item.nombre}</h3>
                                        <p className='cart-price'>${item.precio}</p>
                                        <div className="cart__quantity">
                                            <label>Cantidad:</label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                            />
                                        </div>
                                        <button className="cart__remove" onClick={() => handleRemoveItem(item.id)}>Eliminar</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="cart__subtotal">
                            <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
                        </div>
                        <button 
                            className="cart__checkout" 
                            onClick={handleCheckout}
                        >
                            Generar Venta
                        </button>
                    </>
                ) : (
                    <p>El carrito está vacío.</p>
                )}
            </div>
        </div>
    );
};

export default CartSide;
