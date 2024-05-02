import './App.css';
import React, { useContext, useState, useEffect } from 'react';
import NavBar from './components/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/SignUp/Signup';
import Cart from './components/Cart/Cart';
import { AuthProvider, AuthContext } from './AuthContext';
import Items from './components/Items/Items';
import ProductTable from './components/ProductTable/ProductTable';
import { searchProducts } from './dynamodb';
import { Modal, Button } from 'react-bootstrap';
import Carousel from './components/Carousel/Carousel';

function App() {
  const [cart, setCart] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [key, setKey] = useState(0);
  const [products, setProducts] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSearch = async (searchTerm) => {
    try {
      searchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();
      const results = await searchProducts(searchTerm);
      setProducts(results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavBar setKey={setKey} handleSearch={handleSearch} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart cart={cart} />} />
            <Route path="/items" element={<Items />} />
            <Route path="/" element={<Home key={key} addToCart={addToCart} products={products} setProducts={setProducts} handleSearch={handleSearch} />} />
            <Route path="/carousel" element={<Carousel />} />
          </Routes>
          <Modal show={dialogOpen} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Producto agregado al carrito</Modal.Title>
            </Modal.Header>
            <Modal.Body>El producto ha sido agregado a tu carrito. ¿Quieres ir al carrito ahora?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                No
              </Button>
              <Button variant="primary" onClick={() => { handleClose(); window.location.href = "/cart"; }}>
                Sí
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Router>
    </AuthProvider>
  );
}

function Home({ addToCart, products, setProducts, handleSearch }) {
  const { isAuthenticated, username } = useContext(AuthContext);
  const [searchMessage, setSearchMessage] = useState('');

  const resetAppState = () => {
    setProducts([]);
  };
  useEffect(() => {
    handleSearch(resetAppState);
  });

  const handleCategorySearch = async (category) => {
    try {
      const results = await searchProducts(category, true);
      console.log(results);
      if (results.length === 0) {
        setSearchMessage('No se encontraron productos en esta categoría');
      } else {
        setSearchMessage('');
      }
      setProducts(results);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {isAuthenticated && <h2 className="welcome-message">Bienvenido {username}, qué quieres comprar?</h2>}
      <div className="home-container">

      { <h2>Resultados de la búsqueda:</h2>}
        {searchMessage && <p>{searchMessage}</p>}
        <div className="product-table-container">
          {Array.isArray(products) && <ProductTable products={products} addToCart={addToCart} />}
        </div>
        {!products.length && (
          <div className="category-buttons">
            <Button variant="primary" className="category-button btn-block d-md-inline-block mb-3 mb-md-0 mr-md-3" onClick={() => handleCategorySearch("Equipos de Seguridad")}>Equipos de Seguridad</Button>
            <Button variant="primary" className="category-button btn-block d-md-inline-block mb-3 mb-md-0 mr-md-3" onClick={() => handleCategorySearch("Herramientas Manuales")}>Herramientas Manuales</Button>
            <Button variant="primary" className="category-button btn-block d-md-inline-block mb-3 mb-md-0 mr-md-3" onClick={() => handleCategorySearch("Materiales Básicos")}>Materiales Básicos</Button>
            <Button variant="primary" className="category-button btn-block d-md-inline-block mb-3 mb-md-0 mr-md-3" onClick={() => handleCategorySearch("Tornillos y Anclajes")}>Tornillos y Anclajes</Button>
          </div>
        )}
      </div>
    </>
  );
}
export default App;