import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './WebpayCards.css';
import CreditCardPayment from './CreditCardPayment';
import DebitCardPayment from './DebitCardPayment';

const WebpayCards = () => {
    return (
        <div className="payment-details-cards">
            <Link to="/CreditCardPayment">
                <Button variant="primary">Pagar con Tarjeta de Crédito</Button>
            </Link>
            <Link to="/DebitCardPayment">
                <Button variant="primary">Pagar con Tarjeta de Débito</Button>
            </Link>
        </div>
    );
};

export default WebpayCards;