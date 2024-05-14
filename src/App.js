import './App.css';
import React, { useContext, useState, useEffect } from 'react';
import NavBar from './components/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/SignUp/Signup';
import BackButton from './components/BackButton/BackButton';
import Cart from './components/Cart/Cart';
import { AuthProvider, AuthContext } from './AuthContext';
import Items from './components/Items/Items';
import ProductTable from './components/ProductTable/ProductTable';
import { searchProducts } from './dynamodb';
import { Button, Modal } from 'react-bootstrap';
import Carousel from './components/Carousel/Carousel';
import Newsletter from './components/Newsletter/Newsletter';
import Checkout from './components/Checkout/Checkout';
import { CartProvider } from './components/Cart/CartContext';
import { CartContext } from './components/Cart/CartContext';
import CreditCardPayment from './components/WebpayCards/CreditCardPayment';
import DebitCardPayment from './components/WebpayCards/DebitCardPayment';
import WebpayCards from './components/WebpayCards/WebpayCards';
import Success from './components/Success/Success';
import BackButtonGeneral from './components/BackButtonGeneral/BackButtonGeneral';

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(0);
  const [products, setProducts] = useState([]);
  const [showCarousel, setShowCarousel] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, setCart, saveCart, clearCart } = useContext(CartContext);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showBackButtonGeneral, setShowBackButtonGeneral] = useState(true);
  const handleShowNewsletter = () => setShowNewsletter(true);

  useEffect(() => {
  }, [showNewsletter]);
  const toggleBackButtonGeneral = () => {
    setShowBackButtonGeneral(!showBackButtonGeneral);
  };  
  const handleCloseNewsletter = () => setShowNewsletter(false);
  const addToCart = (product) => {
    setCart(prevCart => {
      const newCart = [...prevCart, product];
      saveCart(newCart);
      return newCart;
    });
    setIsCartOpen(true);
  };

  const handlePurchase = () => {
    setCart([]);
    clearCart();
    setShowBackButtonGeneral(true);
  };

  const handleSearch = async (searchTerm) => {
    try {
      setIsLoading(true);
      searchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();
      const results = await searchProducts(searchTerm);
      setProducts(results);
      setShowCarousel(false);
      setShowBackButtonGeneral(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <NavBar setKey={setKey} handleSearch={handleSearch} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} cart={cart} handleShowNewsletter={handleShowNewsletter} />
            {showBackButtonGeneral && <BackButtonGeneral />}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<Cart cart={cart} onPurchase={handlePurchase} />} />
              <Route path="/items" element={<Items />} />
              <Route path="/" element={<Home key={key} addToCart={addToCart} products={products} setProducts={setProducts} handleSearch={handleSearch} showCarousel={showCarousel} setShowCarousel={setShowCarousel} toggleBackButtonGeneral={toggleBackButtonGeneral} />} />              <Route path="/carousel" element={<Carousel />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/webpaycards" element={<WebpayCards />} />
              <Route path="/creditcardpayment" element={<CreditCardPayment />} />
              <Route path="/debitcardpayment" element={<DebitCardPayment />} />
              <Route path="/success" element={<Success />} />
            </Routes>
            <Button className="subscribe-button" onClick={handleShowNewsletter}>Suscríbete</Button>
            <Modal show={showNewsletter} onHide={handleCloseNewsletter}>
              <Modal.Body>
                <Newsletter handleClose={handleCloseNewsletter} />
              </Modal.Body>
            </Modal>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

function Home({ addToCart, products, setProducts, handleSearch, showCarousel, setShowCarousel, toggleBackButtonGeneral }) {
  const { isAuthenticated, username } = useContext(AuthContext);
  const [searchMessage, setSearchMessage] = useState('');
  const [showBackButtonGeneral, setShowBackButtonGeneral] = useState(true);



  useEffect(() => {
    setShowBackButtonGeneral(true);
    setProducts([]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCategorySearch = async (category) => {
    try {
      setShowCarousel(false);
      const results = await searchProducts(category, true);
      console.log(results);
      if (results.length === 0) {
        setSearchMessage('No se encontraron productos en esta categoría');
      } else {
        setSearchMessage('');
        setShowBackButtonGeneral(false);
      }
      setProducts(results);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {isAuthenticated && <h2 className="welcome-message">Bienvenido {username}, qué quieres comprar?</h2>}
      {showCarousel && <Carousel />}
      <div className="home-container">
        {searchMessage && <p>{searchMessage}</p>}
        <div className="product-table-container">
        {Array.isArray(products) && <ProductTable products={products} addToCart={addToCart} toggleBackButtonGeneral={toggleBackButtonGeneral}/>}
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