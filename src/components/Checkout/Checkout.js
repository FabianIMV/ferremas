import React, { useState, useContext, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AuthContext } from '../../AuthContext';
import Login from '../Login/Login';
import Cart from '../Cart/Cart';
import CartContext from '../Cart/CartContext';
import './Checkout.css';

const Checkout = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [showTransferDetails, setShowTransferDetails] = useState(false);
    const { total } = useContext(CartContext);

    const handleTransferClick = () => {
        setShowTransferDetails(!showTransferDetails);
    };

    const formRef = useRef(null);

    const handleWebpayClick = async () => {
        const response = await initiateWebpayTransaction({
            buy_order: 'OrdenCompra21957',
            session_id: 'sesion1234564',
            amount: total,
            return_url: 'https://localhost:3001/success'
        });

        if (response.token) {
            if (formRef.current) {
                formRef.current.token_ws.value = response.token;
                formRef.current.submit();
            }
        } else {
            console.error('No se pudo obtener el token de Webpay');
        }

        console.log(response);
    };

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <h2>Total de compra: ${total}</h2>
                    <Cart />
                </Col>
                <Col md={6}>
                    <h2>Detalles de pago</h2>
                    <Row id="button-container" className="pay-buttons">
                        <Col>
                            <Button variant="primary" onClick={handleTransferClick}>
                                Pagar con transferencia
                            </Button>
                            <>
                                <Button variant="primary" onClick={handleWebpayClick}>
                                    Pagar con Webpay
                                </Button>
                                <form ref={formRef} action="https://webpay3gint.transbank.cl/webpayserver/initTransaction" method="POST" style={{ display: 'none' }}>
                                    <input type="hidden" name="token_ws" />
                                    <input type="submit" value="Pagar" />
                                </form>
                            </>
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

async function initiateWebpayTransaction(body) {
    const response = await fetch('https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2//transactions', {
        method: 'POST',
        headers: {
            'Tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
            'Tbk-Api-Key-Id': '597055555532',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}