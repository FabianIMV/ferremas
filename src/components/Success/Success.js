import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Success.css';
import AWS from 'aws-sdk';
import { Puff as Loader } from 'react-loader-spinner';

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAY4QIKKWUDHQWUEWL',
  secretAccessKey: '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',
});

const lambda = new AWS.Lambda();

const Success = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token_ws');

  useEffect(() => {
    console.log('Invoking lambda with token:', token);
    lambda.invoke({
      FunctionName: 'webpay-transaction-result',
      Payload: JSON.stringify({ token }),
    }, (err, data) => {
      if (err) {
        console.log('Lambda invocation error:', err);
      } else {
        console.log('Lambda response:', data);
        const result = JSON.parse(data.Payload);
        console.log('Lambda result:', result);
        setStatus(result.body.status);
        setLoading(false);
      }
    });
  }, [token]);

  if (loading) {
    return (
      <div className="loader-container">
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    );
  }

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