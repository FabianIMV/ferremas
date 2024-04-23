import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from './logoferremas.svg';
import cart from './cart.svg';

class NavBar extends Component {
  render() {
    return <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <div className="cart-container">
        <Link to="/cart">
          <img src={cart} alt="Cart" className="cart" />
        </Link>
        <Link to="/login">
          <button className="btn btn-primary btn-block mb-4 iniciar-sesion">Iniciar Sesión</button>
        </Link>
        <Link to="/signup">
          <button className="btn btn-primary btn-block mb-4 iniciar-sesion">Registrarse</button>
        </Link>
      </div>
    </div>;
  }
}

export default NavBar;
