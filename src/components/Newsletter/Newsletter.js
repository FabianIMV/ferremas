import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'AKIAY4QIKKWUDHQWUEWL',
    secretAccessKey: '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',
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = 'newsletter-db';

const Newsletter = ({handleClose}) => {
    const [correo, setcorreo] = useState('');
    const [message, setMessage] = useState('');
    const [subscribed, setSubscribed] = useState(false); // Nuevo estado

    const isValidcorreo = (correo) => {
        return correo.includes('@') && correo.includes('.');
    };

    const checkcorreoExists = async (correo) => {
        const params = {
            TableName: tableName,
            Key: {
                "correo": correo
            }
        };
        const result = await dynamoDb.get(params).promise();
        return result.Item;
    };

    const addcorreoToDb = async (correo) => {
        const params = {
            TableName: tableName,
            Item: {
                "correo": correo
            }
        };
        await dynamoDb.put(params).promise();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isValidcorreo(correo)) {
            const exists = await checkcorreoExists(correo);
            if (exists) {
                setMessage('Este correo ya está suscrito, reintente con otro correo.');
            } else {
                await addcorreoToDb(correo);
                setMessage(`Gracias por suscribirte, ${correo}!`);
                setSubscribed(true);
                setcorreo('');
                setTimeout(handleClose, 2000);
            }
        } else {
            setMessage('Por favor, introduce un correo válido.');
        }
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Suscríbete a nuestro boletín</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message ? (
                    <p>{message}</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="correo"
                            className="form-control"
                            placeholder="Introduce tu correo electrónico"
                            value={correo}
                            onChange={e => setcorreo(e.target.value)}
                            required
                        />
                    </form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                {!subscribed && !message && (
                    <Button variant="primary" onClick={handleSubmit} disabled={!isValidcorreo(correo)}>
                        Suscribirse
                    </Button>
                )}
            </Modal.Footer>
        </>
    );
};

export default Newsletter;