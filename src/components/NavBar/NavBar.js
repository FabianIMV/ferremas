import React, { Component } from "react";
import './NavBar.css';
import logo from './logoferremas.svg'

class NavBar extends Component {
  render() {
    return <div className="navbar">  
    <img src={logo} alt="Logo" className="logo"/>
    <button className="btn btn-primary btn-block mb-4 iniciar-sesion">Iniciar Sesión</button>
    </div>;
  }
}

export default NavBar;
