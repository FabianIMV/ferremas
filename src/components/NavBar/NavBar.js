import React, { Component } from "react";
import './NavBar.css';
import logo from './logoferremas.svg';
import Cart from '../Cart/Cart';

class NavBar extends Component {
  render() {
    return <div className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <div className="cart-container">
        <Cart />
        <button className="btn btn-primary btn-block mb-4 iniciar-sesion">Iniciar Sesión</button>
      </div>
    </div>;
  }
}

export default NavBar;
