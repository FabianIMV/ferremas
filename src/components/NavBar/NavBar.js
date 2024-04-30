import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from './logoferremas.svg';
import cart from './cart.svg';
import { AuthContext } from '../../AuthContext';

const NavBar = ({ setKey }) => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    return (
        <div className="navbar">
            <Link to="/" onClick={() => setKey(prevKey => prevKey + 1)}>
    <img src={logo} alt="Logo" className="logo"/>
</Link>
            <div className="nav-buttons">
                <div className="cart-container">
                    <Link to="/cart">
                        <img src={cart} alt="Cart" className="cart" />
                    </Link>
                    {isAuthenticated ? (
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;