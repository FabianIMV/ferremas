import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Success.css';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAY4QIKKWUDHQWUEWL',
  secretAccessKey: '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',
});

const lambda = new AWS.Lambda();

const Success = () => {
  const [status, setStatus] = useState(null);
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  useEffect(() => {
    lambda.invoke({
      FunctionName: 'webpay-transaction-result',
      Payload: JSON.stringify({ token }),
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const result = JSON.parse(data.Payload);
        setStatus(result.status);
      }
    });
  }, [token]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="text-center">
            {status === 'AUTHORIZED' ? (
              <>
                <h2>¡Compra Exitosa!</h2>
                <p>Gracias por tu compra. Tu pedido está siendo procesado y te llegará pronto.</p>
              </>
            ) : (
              <>
                <h2>Algo salió mal</h2>
                <p>Por favor, intenta realizar la compra de nuevo.</p>
              </>
            )}
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