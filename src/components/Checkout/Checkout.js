import React, { useState, useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import Login from '../Login/Login';
import Cart from '../Cart/Cart';
import './Checkout.css';
import WebpayCards from '../WebpayCards/WebpayCards';

const Checkout = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [showTransferDetails, setShowTransferDetails] = useState(false);
    const [showTransbankDetails, setShowTransbankDetails] = useState(false);

    const handleTransferClick = () => {
        setShowTransferDetails(!showTransferDetails);
        setShowTransbankDetails(false);
    };

    const handleTransbankClick = () => {
        setShowTransbankDetails(!showTransbankDetails);
        setShowTransferDetails(false);
    };

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <h2>Total de compra</h2>
                    <Cart />
                </Col>
                <Col md={6}>
                    <h2>Detalles de pago</h2>
                    <Row id="button-container">
                        <Col>
                            <Button variant="primary" onClick={handleTransferClick}>
                                Pagar con transferencia
                            </Button>
                            <Button variant="primary">
                                <Link to="/webpaycards">Pagar con Webpay</Link>
                            </Button>
                        </Col>
                    </Row>
                    {showTransferDetails && (
                        <div className="payment-details">
                            <h4>Transferir a la siguiente cuenta bancaria:</h4>
                            <p>Ferremas SpA Chile</p>
                            <p>76.985.422-4</p>
                            <p>Banco Chile</p>
                            <p>Cuenta Corriente</p>
                            <p>0065-3234-1122</p>
                            <p>contacto@ferremas.cl</p>
                        </div>
                    )}
                    {showTransbankDetails && (
                        <div className="payment-details-cards">
                            <Link to="./creditcardpayment">
                                <Button variant="primary">Pagar con Tarjeta de Crédito</Button>
                            </Link>
                            <Link to="./debitcardpayment">
                                <Button variant="primary">Pagar con Tarjeta de Débito</Button>
                            </Link>
                        </div>
                    )}
                    {!isAuthenticated && (
                        <div className="login-discount">
                            <h3>Iniciar sesión para aplicar descuento</h3>
                            <Login className="login-component" showTitle={false} />
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Checkout;