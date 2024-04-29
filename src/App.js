import './App.css';
import React, { useContext, useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/SignUp/Signup';
import Cart from './components/Cart/Cart';
import { AuthProvider, AuthContext } from './AuthContext';
import Items from './components/Items/Items';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductTable from './components/ProductTable/ProductTable';
import { searchProducts } from './dynamodb';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/items" element={<Items />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function Home() {
  const { isAuthenticated, username } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [searchMessage, setSearchMessage] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    let searchTerm = event.target.elements.search.value;
    searchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();
    const results = await searchProducts(searchTerm);
    if (results.length === 0) {
      setSearchMessage('No se encontraron productos');
    } else {
      setSearchMessage('');
    }
    setProducts(results);
    setSearched(true);
  };

  return (
    <>
      {isAuthenticated && !searched && <h2 className="welcome-message">Bienvenido {username}, qué quieres comprar?</h2>}
      <div className="home-container">
        <div className="search-bar-container">
          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <div className="input-group mb-3">
                <input type="text" name="search" className="form-control" placeholder="Buscar productos..." aria-label="Buscar" aria-describedby="button-addon2"></input>
                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Buscar</button>
              </div>
            </form>
          </div>
        </div>
        {searchMessage && <p>{searchMessage}</p>}
        <div className="product-table-container">
          <ProductTable products={products} />
        </div>
      </div>
    </>
  );
}

export default App;