import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders the App component without crashing', () => {
  render(<App />);
  expect(screen.getByText(/Suscríbete/i)).toBeInTheDocument();
});

test('renders the NavBar component', () => {
  render(<App />);
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

test('can open and close the newsletter modal', () => {
  render(<App />);
  
  const subscribeButton = screen.getByText(/Suscríbete/i);
  fireEvent.click(subscribeButton);
  
  expect(screen.getByText(/Newsletter/i)).toBeInTheDocument();
  
  const closeButton = screen.getByRole('button', { name: /close/i });
  fireEvent.click(closeButton);
  
  expect(screen.queryByText(/Newsletter/i)).not.toBeInTheDocument();
});

test('can add item to cart and view cart', () => {
  render(<App />);
  
  const categoryButton = screen.getByText(/Equipos de Seguridad/i);
  fireEvent.click(categoryButton);
  
  // Assuming that a product will be rendered
  const addToCartButton = screen.getByText(/Agregar al carrito/i);
  fireEvent.click(addToCartButton);
  
  const cartButton = screen.getByRole('button', { name: /Cart/i });
  fireEvent.click(cartButton);
  
  expect(screen.getByText(/Tu carrito de compras/i)).toBeInTheDocument();
  expect(screen.getByText(/Equipos de Seguridad/i)).toBeInTheDocument();
});
