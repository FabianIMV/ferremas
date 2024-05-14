import React, { useState, useContext, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AuthContext } from '../../AuthContext';
import Login from '../Login/Login';
import Cart from '../Cart/Cart';
import CartContext from '../Cart/CartContext';
import {useNavigate} from 'react-router-dom';
import './Checkout.css';

import { Lambda, config } from 'aws-sdk';

config.update({
    region: 'us-east-1',
    accessKeyId: 'AKIAY4QIKKWUDHQWUEWL',
    secretAccessKey: '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',
});

async function initiateWebpayTransaction(body) {
    console.log('enviando solicitud a lambda: ', body)

    const lambda = new Lambda();

    const params = {
        FunctionName: 'intermediario-webpay',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify({ body }),
    };

    const response = await lambda.invoke(params).promise();

    if (!response.Payload) {
        throw new Error('No se pudo obtener la respuesta de Lambda');
    }

    console.log('Respuesta de Lambda recibida', response.Payload);

    const responseBody = JSON.parse(response.Payload).body;

    return responseBody;
}

const Checkout = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showTransferDetails, setShowTransferDetails] = useState(false);
    const { total, discountedTotal, cartItems } = useContext(CartContext);
    

    const handleTransferClick = () => {
        setShowTransferDetails(!showTransferDetails);
    };

    const handleLogin = () => {
        navigate('/checkout');
    }

    const formRef = useRef(null);

    const handleWebpayClick = async () => {
        console.log('iniciando transaccion')
        const buyOrderId = Math.floor(Math.random() * 1000000)
        const sessionId = ('ID' + Math.floor(Math.random() * 1000000))
        const amount = isAuthenticated ? discountedTotal : total;
        const response = await initiateWebpayTransaction({
            buy_order: buyOrderId,
            session_id: sessionId,
            amount: amount,
            return_url: 'https://ferremas.vercel.app/success'
        });
        console.log('respuesta de webpay recibida:', response)
        if (response && response.token) {
            const token = response.token;
            console.log('Token recibido', token);
            if (formRef.current) {
                console.log('Enviando formulario con token');
                formRef.current.elements['token_ws'].value = token;
                formRef.current.submit();
            } else {
                console.log('formRef.current es null o undefined');
            }
        }
    };

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <h2>Tu carrito</h2>
                    <Cart />
                </Col>
                <Col md={6}>
                    <h2>Detalles de pago</h2>
                    <Row id="button-container" className="pay-buttons">
                        <Col>
                            <Button variant="primary" onClick={handleTransferClick}>
                                Pagar con transferencia
                            </Button>
                            <Button variant="primary" onClick={handleWebpayClick}>
                                Pagar con Webpay
                            </Button>
                            <form ref={formRef} action="https://webpay3gint.transbank.cl/webpayserver/initTransaction" method="POST" style={{ display: 'none' }}>
                                <input type="hidden" name="token_ws" />
                                <input type="submit" value="Pagar" />
                            </form>
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
                    {isAuthenticated && (
                        <div className="discount-applied">
                        </div>
                    )}
                    {!isAuthenticated && (
                        <div className="login-discount">
                            <h3>Iniciar sesión para aplicar descuento del 20%</h3>
                            <Login className="login-component" showTitle={false} onLogin={handleLogin} />
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Checkout;