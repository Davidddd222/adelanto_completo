import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext/CartContext";
import { useAuth } from '../../context/AuthContext/AuthContext'; // Importa tu contexto de autenticación
import "./CartPage.css";

const CartPage = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth(); // Estado que indica si el usuario está logueado
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expirationDate: "",
    cvv: ""
  });
  const [deliveryDetails, setDeliveryDetails] = useState({
    deliveryName: "",
    deliveryAddress: ""
  });
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/productos')
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching productos:', error);
        setIsLoading(false);
      });
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setAlertMessage("Debes iniciar sesión primero.");
      setShowAlert(true);
      return; // No proceder si no está autenticado
    }
    setShowPaymentOptions(true);
  };

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";
    if (name === "cardNumber") {
      if (!/^\d{16}$/.test(value)) {
        errorMessage = "El número de la tarjeta solo puede contener números y debe tener 16 dígitos.";
      }
    } else if (name === "cardName") {
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        errorMessage = "El nombre en la tarjeta solo puede contener letras y espacios.";
      }
    } else if (name === "expirationDate") {
      if (!/^\d{2}\/\d{2}$/.test(value)) {
        errorMessage = "La fecha de vencimiento debe estar en el formato MM/AA.";
      }
    } else if (name === "cvv") {
      if (!/^\d{3}$/.test(value)) {
        errorMessage = "El CVV debe contener exactamente 3 dígitos.";
      }
    } else if (name === "deliveryName") {
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        errorMessage = "El nombre de entrega solo puede contener letras y espacios.";
      }
    } else if (name === "deliveryAddress") {
      if (!value) {
        errorMessage = "La dirección de entrega es requerida.";
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedPaymentMethod === "creditCard") {
      setCreditCardDetails({ ...creditCardDetails, [name]: value });
    } else if (selectedPaymentMethod === "cashOnDelivery") {
      setDeliveryDetails({ ...deliveryDetails, [name]: value });
    }
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let hasErrors = false;

    if (selectedPaymentMethod === "creditCard") {
      Object.keys(creditCardDetails).forEach((field) => {
        validateField(field, creditCardDetails[field]);
        if (errors[field]) hasErrors = true;
      });
    } else if (selectedPaymentMethod === "cashOnDelivery") {
      Object.keys(deliveryDetails).forEach((field) => {
        validateField(field, deliveryDetails[field]);
        if (errors[field]) hasErrors = true;
      });
    }

    if (!hasErrors) {
      console.log("Datos de la tarjeta: ", creditCardDetails);
      alert("Pago realizado con éxito.");
      setCreditCardDetails({ cardNumber: "", cardName: "", expirationDate: "", cvv: "" });
      setDeliveryDetails({ deliveryName: "", deliveryAddress: "" });
      setShowPaymentOptions(false);
    } else {
      setAlertMessage("Por favor, corrige los errores antes de enviar.");
      setShowAlert(true);
    }
  };

  return (
    <div>
      <div className="cart-container">
        <h2>Tu Carrito</h2>
        {isLoading ? (
          <p>Cargando productos...</p>
        ) : cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Tu carrito está vacío.</p>
            <a href="/productos" className="shop-btn">Ver productos</a>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h3>{item.nombre}</h3>
                    <p className="item-price">${item.precio}</p>
                    <div className="cart-item-quantity">
                      <button onClick={() => item.quantity > 1 ? updateCartItemQuantity(item.id, item.quantity - 1) : null}>-</button>
                      <input type="number" min="1" value={item.quantity} readOnly />
                      <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>+</button>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                    </div>
                  </div>
                  <div className="cart-item-total">
                    <p>Total: ${item.precio * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="payment-summary-container">
              <div className="cart-summary">
                <h3>Resumen del pedido</h3>
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Envío: Gratis</p>
                <h3>Total: ${subtotal.toFixed(2)}</h3>
                <button className="checkout-btn" onClick={handleCheckout}>Proceder a pagar</button>
              </div>
              {showPaymentOptions && (
                <div className="payment-options">
                  <h4>Elegir método de pago</h4>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="creditCard"
                      onChange={handlePaymentMethodChange}
                    />
                    Tarjeta de crédito
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cashOnDelivery"
                      onChange={handlePaymentMethodChange}
                    />
                    Contraentrega
                  </label>

                  {selectedPaymentMethod === "creditCard" && (
                    <div className="credit-card-form">
                      <h4>Detalles de la tarjeta de crédito</h4>
                      <form onSubmit={handleSubmit}>
                        <div>
                          <label>Número de tarjeta</label>
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            value={creditCardDetails.cardNumber}
                            onChange={handleInputChange}
                          />
                          {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
                        </div>
                        <div>
                          <label>Nombre en la tarjeta</label>
                          <input
                            type="text"
                            name="cardName"
                            placeholder="Nombre del titular"
                            value={creditCardDetails.cardName}
                            onChange={handleInputChange}
                          />
                          {errors.cardName && <p className="error-message">{errors.cardName}</p>}
                        </div>
                        <div>
                          <label>Fecha de vencimiento</label>
                          <input
                            type="text"
                            name="expirationDate"
                            placeholder="MM/AA"
                            value={creditCardDetails.expirationDate}
                            onChange={handleInputChange}
                          />
                          {errors.expirationDate && <p className="error-message">{errors.expirationDate}</p>}
                        </div>
                        <div>
                          <label>CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            placeholder="123"
                            value={creditCardDetails.cvv}
                            onChange={handleInputChange}
                          />
                          {errors.cvv && <p className="error-message">{errors.cvv}</p>}
                        </div>
                        <button type="submit">Confirmar pago</button>
                      </form>
                    </div>
                  )}

                  {selectedPaymentMethod === "cashOnDelivery" && (
                    <div className="delivery-form">
                      <h4>Detalles de entrega</h4>
                      <form onSubmit={handleSubmit}>
                        <div>
                          <label>Nombre de entrega</label>
                          <input
                            type="text"
                            name="deliveryName"
                            value={deliveryDetails.deliveryName}
                            onChange={handleInputChange}
                          />
                          {errors.deliveryName && <p className="error-message">{errors.deliveryName}</p>}
                        </div>
                        <div>
                          <label>Dirección de entrega</label>
                          <input
                            type="text"
                            name="deliveryAddress"
                            value={deliveryDetails.deliveryAddress}
                            onChange={handleInputChange}
                          />
                          {errors.deliveryAddress && <p className="error-message">{errors.deliveryAddress}</p>}
                        </div>
                        <button type="submit">Confirmar entrega</button>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {showAlert && (
        <div className="alert">
          {alertMessage}
          <button onClick={() => setShowAlert(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
