import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import Checkout from '../Checkout/Checkout';

const Cart = ({ isDropdown }) => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(initialCart);
    }, []);

    const removeFromCart = (productToRemove) => {
        const updatedCart = cart.filter(product => product.tempId !== productToRemove.tempId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const increaseQuantity = (productToIncrease) => {
        const updatedCart = cart.map(product =>
            product.tempId === productToIncrease.tempId
                ? { ...product, quantity: product.quantity + 1, totalPrice: (product.quantity + 1) * product.price }
                : product
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
    
    const decreaseQuantity = (productToDecrease) => {
        const updatedCart = cart.map(product =>
            product.tempId === productToDecrease.tempId
                ? { ...product, quantity: product.quantity > 1 ? product.quantity - 1 : 1, totalPrice: (product.quantity > 1 ? product.quantity - 1 : 1) * product.price }
                : product
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const cleanCart = () => {
        setCart([]);
        localStorage.setItem('cart',JSON.stringify([]));
    };

    const goToPayment = () => {
        navigate('/Checkout');
    };

    return (
        <div className={`cart-component ${isDropdown ? 'cart-dropdown' : ''}`}>
            {!isDropdown && <h2>Tu Carrito</h2>}
            {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <>
                    {cart.map((product, index) => (
                        <div key={index} className="cart-item-component">
                            <p>{product.name}</p>
                            <p>Total: {product.totalPrice} USD</p>
                            <button onClick={() => removeFromCart(product)} className="btn btn-danger">Eliminar</button>
                            <button onClick={() => decreaseQuantity(product)} className="btn btn-secondary">-</button>
                            <p>{product.quantity}</p>
                            <button onClick={() => increaseQuantity(product)} className="btn btn-secondary">+</button>
                        </div>
                   ))}
                   {!isDropdown && (
                       <>
                           <button onClick={cleanCart} className="btn btn-warning">Vaciar carrito</button>
                           <button onClick={goToPayment} className="btn btn-success">Pagar carrito</button>
                       </>
                   )}
                   {isDropdown && (
                       <>
                           <Link to="/cart">
                               <button className="btn btn-primary">Ir al carrito</button>
                           </Link>
                       </>
                   )}
               </>
           )}
       </div>
   );
};
export default Cart;