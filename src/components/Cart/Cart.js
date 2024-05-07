import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import './Cart.css';
import axios from 'axios';
import xml2js from 'xml2js';

const Cart = ({ isDropdown, setIsDropdown }) => {
    const [exchangeRate, setExchangeRate] = useState(null);
    const { cart, setCart } = useContext(CartContext);
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
                console.error('Error fetching exchange rate.', error);
            });
    }, []);

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

    const goToPayment = () => {
        navigate('/Checkout');
    };

    const handleGoToCart = () => {
        setIsDropdown(false);
        navigate('/checkout')
    }

    return (
        <div className={`cart-component ${isDropdown ? 'cart-dropdown' : ''}`}>
            {!isDropdown && <h2>Tu Carrito</h2>}
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
                            <p className="product-price">${product.totalPrice} - USD ${exchangeRate ? Math.round(product.totalPrice / exchangeRate) : ''}</p>
                        </div>
                    ))}
                    {!isDropdown && (
                        <div className="cart-buttons">
                            <button onClick={cleanCart} className="btn btn-warning">Vaciar carrito</button>
                        </div>
                    )}
                    {isDropdown && (
                        <>
    
                            <button onClick={handleGoToCart} className="btn btn-primary">Ir al carrito</button>
    
                        </>
                    )}
                </>
            )}
        </div>
    );
};
export default Cart;