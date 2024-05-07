import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Login from '../Login/Login';
import Cart from '../Cart/Cart';
import './Checkout.css';

const Checkout = () => {
    const [showTransferDetails, setShowTransferDetails] = useState(false);
    const [showTransbankDetails, setShowTransbankDetails] = useState(false);

    const handleTransferClick = () => {
        setShowTransferDetails(true);
        setShowTransbankDetails(false);
    };

    const handleTransbankClick = () => {
        setShowTransbankDetails(true);
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
                    <div id="button-container">
                        {!showTransbankDetails && (
                            <div>
                                <Button variant="primary" onClick={handleTransferClick}>
                                    Pagar con transferencia
                                </Button>
                                {showTransferDetails && (
                                    <div>
                                        <h4>Transferir a la siguiente cuenta bancaria:</h4>
                                        <p>Ferremas SpA Chile</p>
                                        <p>76.985.422-4</p>
                                        <p>Banco Chile</p>
                                        <p>Cuenta Corriente</p>
                                        <p>0065-3234-1122</p>
                                        <p>contacto@ferremas.cl</p>
                                    </div>
                                )}
                            </div>
                        )}
                        {!showTransferDetails && (
                            <div>
                                <Button variant="primary" onClick={handleTransbankClick}>
                                    Pagar con Webpay
                                </Button>
                                {showTransbankDetails && <div>Incluir datos de Webpay</div>}
                            </div>
                        )}
                    </div>
                    <h2>Iniciar sesión para aplicar descuento</h2>
                    <div className="login-discount">
                        <Login />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Checkout;