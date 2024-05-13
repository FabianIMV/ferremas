import React, { useState, useContext, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AuthContext } from '../../AuthContext';
import Login from '../Login/Login';
import Cart from '../Cart/Cart';
import CartContext from '../Cart/CartContext';
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
        Payload: JSON.stringify({body}),
    };

    const response = await lambda.invoke(params).promise();

    if (!response.Payload) {
        throw new Error('No se pudo obtener la respuesta de Lambda');
    }

    console.log('Respuesta de Lambda recibida', response.Payload);

    const responseBody = JSON.parse(response.Payload).body;

    return responseBody;
}

async function updateStock(name, quantity) {
    console.log('Actualizando stock: ', name, quantity)

    const lambda = new Lambda();

    const params = {
        FunctionName: 'manejaStock',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify({name, quantity}),
    };

    console.log('Invocando Lambda con los siguientes parámetros:', params);

    let response;
    try {
        response = await lambda.invoke(params).promise();
    } catch (error) {
        console.error('Error al invocar Lambda:', error);
        throw error;
    }

    console.log('Respuesta de Lambda recibida:', response);

    if (!response.Payload) {
        throw new Error('No se pudo obtener la respuesta de Lambda para actualizar el stock');
    }

    console.log('Respuesta de Lambda para actualizar el stock recibida', response.Payload);
}

const Checkout = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [showTransferDetails, setShowTransferDetails] = useState(false);
    const { total, cartItems } = useContext(CartContext);

    const handleTransferClick = () => {
        setShowTransferDetails(!showTransferDetails);
    };

    const formRef = useRef(null);

    const handleWebpayClick = async () => {
        console.log('iniciando transaccion')
        const buyOrderId = Math.floor(Math.random)
        const sessionId = ('ID'+Math.floor(Math.random))
        const response = await initiateWebpayTransaction({
            buy_order: buyOrderId,
            session_id: sessionId,
            amount: total,
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

                for (const item of cartItems) {
                    await updateStock(item.name, item.quantity);
                }
            } else {
                console.log('formRef.current es null o undefined');
            }
        } else {
            console.error('No se pudo obtener el token de Webpay');
        }
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