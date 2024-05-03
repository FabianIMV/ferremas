import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(initialCart);
    }, []);

    const removeFromCart = (productToRemove) => {
        const updatedCart = cart.filter(product => product.tempId !== productToRemove.tempId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div className="cart-component">
            <h2>Tu Carrito</h2>
            {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                cart.map((product, index) => (
                    <div key={index} className="cart-item-component">
                        <p>{product.name}</p>
                        <button onClick={() => removeFromCart(product)} className="btn btn-danger">Eliminar</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cart;