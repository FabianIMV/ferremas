export function loadCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
  
  export function saveCart(cart) {
    const cartWithUniqueId = cart.map(product => ({
        ...product,
        tempId: product.tempId || Date.now() + Math.random()
    }));
    localStorage.setItem('cart', JSON.stringify(cartWithUniqueId));
  }
  
  export function clearCart() {
    localStorage.removeItem('cart');
  }