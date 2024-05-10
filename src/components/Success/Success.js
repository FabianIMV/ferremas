import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Success.css';

const Success = () => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <div className="text-center">
                        <h2>¡Compra Exitosa!</h2>
                        <p>Gracias por tu compra. Tu pedido está siendo procesado y te llegará pronto.</p>
                        <Button variant="primary">
                            <Link to="/" style={{ color: '#fff' }}>Volver a la página principal</Link>
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Success;