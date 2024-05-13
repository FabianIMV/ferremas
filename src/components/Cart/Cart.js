import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { AuthContext } from '../../AuthContext';
import './Cart.css';
import axios from 'axios';
import xml2js from 'xml2js';

const Cart = ({ isDropdown, setIsDropdown }) => {
    const [exchangeRate, setExchangeRate] = useState(null);
    const { cart, setCart, setTotal, setDiscountedTotal } = useContext(CartContext);
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar?apikey=ab7f92c29c235cc96ef34099b8ba9cea5731ad2a&formato=xml')
            .then(response => {
                xml2js.parseString(response.data, (err, result) => {
                    if (err) {
                        console.error('Error parsing XML', err);
                    } else {
                        const rate = parseFloat(result.IndicadoresFinancieros.Dolares[0].Dolar[0].Valor[0].replace(',', '.'));
                        setExchangeRate(rate);
                    }
                });
            })
            .catch(error => {
                console.error('Error trayendo tasa de cambios.', error);
            });
    }, []);

    const totalPayment = cart.reduce((total, product) => total + product.totalPrice, 0);
    const discount = isAuthenticated ? totalPayment * 0.2 : 0;
    const totalAfterDiscount = totalPayment - discount;

    useEffect(() => {
        if (isAuthenticated) {
            const discount = totalPayment * 0.2;
            setDiscountedTotal(totalPayment - discount);
        }
    }, [cart, setTotal, isAuthenticated, setDiscountedTotal]);

    const addToCart = (productToAdd) => {
        const existingProduct = cart.find(product => product.name === productToAdd.name);
        if (existingProduct) {
            increaseQuantity(existingProduct);
        } else {
            setCart(prevCart => [...prevCart, { ...productToAdd, quantity: 1, totalPrice: productToAdd.price }]);
        }
    };

    const removeFromCart = (productToRemove) => {
        const updatedCart = cart.filter(product => product.name !== productToRemove.name);
        setCart(updatedCart);
    };

    const increaseQuantity = (productToIncrease) => {
        const updatedCart = cart.map(product =>
            product.name === productToIncrease.name
                ? { ...product, quantity: product.quantity + 1, totalPrice: (product.quantity + 1) * product.price }
                : product
        );
        setCart(updatedCart);
    };

    const decreaseQuantity = (productToDecrease) => {
        if (productToDecrease.quantity === 1) {
            removeFromCart(productToDecrease);
        } else {
            const updatedCart = cart.map(product =>
                product.name === productToDecrease.name
                    ? { ...product, quantity: product.quantity - 1, totalPrice: (product.quantity - 1) * product.price }
                    : product
            );
            setCart(updatedCart);
        }
    };

    const cleanCart = () => {
        setCart([]);
    };

    const handleGoToCart = () => {
        setIsDropdown(false);
        navigate('/checkout')
    }

    return (
        <div className={`cart-component ${isDropdown ? 'cart-dropdown' : ''}`}>
            {!isDropdown && <h2></h2>}
            {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <>
                    {cart.map((product, index) => (
                        <div key={index} className="cart-item-component">
                            <p className="product-name">{product.name}</p>
                            <div className="quantity-buttons-cntr">
                                <button onClick={() => decreaseQuantity(product)} className="btn btn-secondary colorbutton-">-</button>
                                <p>{product.quantity}</p>
                                <button onClick={() => increaseQuantity(product)} className="btn btn-secondary colorbuttonplus">+</button>
                            </div>
                            <p className="product-price">${product.totalPrice} - USD ${exchangeRate ? Math.round(product.totalPrice / exchangeRate) : '...'}</p>
                        </div>
                    ))}
                    {!isDropdown && (
                        <div className="total-payment-container">
                            <div className="total-payment-subcontainer">
                                <strong>Subtotal:</strong>
                                ${totalPayment} - USD ${exchangeRate ? Math.round(totalPayment / exchangeRate) : '...'}
                            </div>
                            {isAuthenticated && (
                                <div className="total-payment-subcontainer">
                                    <strong>Descuento 20%:</strong>
                                    ${discount} - USD ${exchangeRate ? Math.round(discount / exchangeRate) : '...'}
                                </div>
                            )}
                            <div className="total-payment-subcontainer">
                                <strong>Total:</strong>
                                <strong>${totalAfterDiscount} - USD ${exchangeRate ? Math.round(totalAfterDiscount / exchangeRate) : '...'}</strong>
                            </div>
                            <button onClick={cleanCart} className="btn btn-warning clean-cart-button">Vaciar carrito</button>
                        </div>
                    )}
                    {isDropdown && (
                        <>
                            <button onClick={handleGoToCart} className="btn btn-primary gotocart">Ir al carrito</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};
export default Cart;