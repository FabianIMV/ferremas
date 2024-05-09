import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

const DebitCardPayment = () => {
    return (
        <Card>
            <Card.Header>
                <FontAwesomeIcon icon={faCreditCard} /> Pago con Tarjeta de Débito
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Número de Tarjeta</Form.Label>
                        <Form.Control type="text" placeholder="1234 5678 9012 3456" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nombre del Titular</Form.Label>
                        <Form.Control type="text" placeholder="Nombre Apellido" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fecha de Expiración</Form.Label>
                        <Form.Control type="text" placeholder="MM/AA" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Código de Seguridad</Form.Label>
                        <Form.Control type="text" placeholder="123" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Pagar
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default DebitCardPayment;