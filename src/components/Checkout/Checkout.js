import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Checkout = () => {
    return (
        <Container>
            <Row>
                <Col md={6}>
                    <h2>Detalles de facturación</h2>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre completo</Form.Label>
                            <Form.Control type="text" placeholder="Introduce tu nombre completo" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Introduce tu email" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control type="text" placeholder="Introduce tu dirección" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control type="text" placeholder="Introduce tu ciudad" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Código Postal</Form.Label>
                            <Form.Control type="text" placeholder="Introduce tu código postal" />
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6}>
                    <h2>Detalles de pago</h2>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre en la tarjeta</Form.Label>
                            <Form.Control type="text" placeholder="Introduce el nombre en la tarjeta" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Número de tarjeta</Form.Label>
                            <Form.Control type="text" placeholder="Introduce el número de tarjeta" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha de expiración</Form.Label>
                            <Form.Control type="text" placeholder="MM/YY" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Código de seguridad</Form.Label>
                            <Form.Control type="text" placeholder="CVV" />
                        </Form.Group>
                    </Form>
                    <Button variant="primary" type="submit">
                        Realizar el pago
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Checkout;