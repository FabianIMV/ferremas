import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {CartContext}  from './CartContext';
import './Cart.css';

const Cart = ({ isDropdown, setIsDropdown }) => {
    const { cart, setCart } = useContext(CartContext);
    const navigate = useNavigate();

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
        const updatedCart = cart.map(product =>
            product.name === productToDecrease.name
                ? { ...product, quantity: product.quantity > 1 ? product.quantity - 1 : 1, totalPrice: (product.quantity > 1 ? product.quantity - 1 : 1) * product.price }
                : product
        );
        setCart(updatedCart);
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
                          
                               <button onClick={handleGoToCart} className="btn btn-primary">Ir al carrito</button>
                  
                       </>
                   )}
               </>
           )}
       </div>
   );
};
export default Cart;