import React, { useState, createContext, useEffect } from 'react';

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cart: [],
    setCart: () => {},
    addToCart: () => {},
    clearCart: () => {},
    saveCart: () => {},
    total: 0,
    setTotal: () => {},
    discountedTotal: 0,
    setDiscountedTotal: () => {},
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart] = useState(() => {
        const localCart = localStorage.getItem('cart');
        return localCart ? JSON.parse(localCart) : [];
    });
    const [total, setTotal] = useState(0);
    const [discountedTotal, setDiscountedTotal] = useState(0);

    useEffect(() => {
        const cartWithUniqueId = cart.map(product => ({
            ...product,
            tempId: product.tempId || Date.now() + Math.random()
        }));
        localStorage.setItem('cart', JSON.stringify(cartWithUniqueId));
    }, [cart]);

    useEffect(() => {
        const totalPayment = cart.reduce((total, product) => total + product.price, 0);
        setTotal(totalPayment);
    }, [cart]);

    const addToCart = (product) => {
        setCart(currentCart => [...currentCart, product]);
    };

    const clearCart = () => {
        localStorage.removeItem('cart');
        setCart([]);
    };

    const saveCart = (newCart) => {
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    return (
        <CartContext.Provider value={{ isCartOpen, setIsCartOpen, cart, setCart, addToCart, clearCart, saveCart, total, setTotal, discountedTotal, setDiscountedTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;