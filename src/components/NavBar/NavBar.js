import React, { Component } from "react";
import './NavBar.css';

class NavBar extends Component {
  render() {
    return <div className="navbar">
    <button className="btn btn-primary btn-block mb-4 iniciar-sesion">Iniciar Sesión</button>
    </div>;
  }
}

export default NavBar;
