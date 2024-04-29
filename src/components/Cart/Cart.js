import React, { useState } from 'react';
import { Container, ListGroup, Row, Col, Button } from 'react-bootstrap';
import ProductTable from '../ProductTable/ProductTable';
import './Cart.css'

function App() {
  const [cart, setCart] = useState([]); // estado para el carrito

  const addToCart = (product) => { // función para agregar productos al carrito
    setCart(prevCart => {
      const productInCart = prevCart.find(item => item.name === product.name);
      if (productInCart) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        return prevCart.map(item => item.name === product.name ? {...item, quantity: item.quantity + 1} : item);
      } else {
        // Si el producto no está en el carrito, agrega un nuevo elemento con cantidad 1
        return [...prevCart, {...product, quantity: 1}];
      }
    });
  };

  // Ejemplo de productos
  const products = [
    { name: 'Iphone 18', price: 24 },
    { name: 'Teclado', price: 1 },
    { name: 'Cadena de oro', price: 5 },
    { name: 'Pantalla', price: 5 },
    { name: 'Audifonos', price: 3 },
    { name: 'Reloj', price: 4 },
  ];

  return (
    <div className="app-container">
      <ProductTable products={products} addToCart={addToCart} cart={cart} />
      <Cart cartItems={cart} setCartItems={setCart} />
    </div>
  );
}

function Cart({ cartItems = [], setCartItems }) {
  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((item, i) => i !== index));
  };

  return (
    <Container className="cart-container">
      <h1>Carrito de Compras</h1>
      <ListGroup>
        {cartItems.map((item, index) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col md={8}>{item.name}</Col>
              <Col md={2}>{item.quantity}</Col>
              <Col md={2}>${item.price}</Col>
              <Col md={2}>
                <Button variant="danger" onClick={() => removeFromCart(index)}>Eliminar</Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h2>
    </Container>
  );
}

export default App;