import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import logo from './logoferremas.svg';
import user from './user.svg';
import carticon from './cart.svg';
import { AuthContext } from '../../AuthContext';
import  {CartContext}  from '../Cart/CartContext';
import Cart from '../Cart/Cart';

const NavBar = ({ setKey, handleSearch, resetAppState, setShowBackButtonGeneral }) => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);
    const [showButtons, setShowButtons] = useState(false);
    const location = useLocation();
    const searchInput = useRef();
    const dropdownRef = useRef();

    const handleLogoClick = () => {
        setKey(prevKey => prevKey + 1);
        searchInput.current.value = '';
        handleSearch('');
        resetAppState();
    };
    useEffect(() => {
        if (location.pathname === '/checkout') {
          setShowBackButtonGeneral(true);
        }
      }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const addToCartButton = document.querySelector('.add-to-cart-button-classname');
    
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && event.target !== addToCartButton){
                setIsCartOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown",handleClickOutside);
        };
    },[setIsCartOpen]);
    

    return (
        <div className="navbar">
            <Link to="/" onClick={handleLogoClick}>
                <img src={logo} alt="Logo" className="logo" />
            </Link>
            <div className="search-bar-container">
                <div className="search-bar">
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        handleSearch(searchInput.current.value);
                    }}>
                        <div className="input-group mb-3">
                            <input ref={searchInput} type="text" name="search" className="form-control search-input" placeholder="Buscar productos..." aria-label="Buscar" aria-describedby="button-addon2"></input>
                            <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Buscar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="nav-buttons">
                <div className="cart-container">
                    <img src={carticon} alt="Cart" className="cart" onClick={() => setIsCartOpen(!isCartOpen)} />
                    <div className="dropdown" ref={dropdownRef}>
                    {isCartOpen && (
                        <Cart isDropdown={isCartOpen} setIsDropdown={setIsCartOpen} />
                    )}
                    </div>
                    <img src={user} alt="User" className="user" onClick={() => setShowButtons(!showButtons)} />
                    {showButtons && (
                        isAuthenticated ? (
                            <button onClick={logout} className="btn btn-primary btn-block mb-4 iniciar-sesion">Cerrar sesión</button>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="btn btn-primary btn-block mb-4 iniciar-sesion">Iniciar Sesión</button>
                                </Link>
                                <Link to="/signup">
                                    <button className="btn btn-primary btn-block mb-4 iniciar-sesion">Registrarse</button>
                                </Link>
                            </>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;