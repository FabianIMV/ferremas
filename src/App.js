import './App.css';
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/SignUp/Signup';
import Welcome from './components/Welcome/Welcome';
import Cart from './components/Cart/Cart';

function App() {
  return (
    <Router>
      <div className="App">
          <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome/:username" element={<Welcome />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<div className="search-bar">
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Buscar productos..." aria-label="Buscar" aria-describedby="button-addon2"></input>
                <div className="btn btn-outline-secondary" type="button" id="button-addon2">Buscar</div>
              </div>
            </div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
