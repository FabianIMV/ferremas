import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setShow(false);
        setMessage('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage(`Gracias por suscribirte, ${email}!`);
        setEmail('');
        setTimeout(handleClose, 2000);
    };

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Suscríbete a nuestro boletín</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message ? (
                        <p>{message}</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Introduce tu correo electrónico"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    {!message && (
                        <Button variant="primary" onClick={handleSubmit}>
                            Suscribirse
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Newsletter;