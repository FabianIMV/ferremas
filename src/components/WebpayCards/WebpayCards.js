import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyCheckAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './WebpayCards.css';

const WebpayCards = () => {
    return (
        <div>
            <div className="payment-details-cards">
                <div className="card-button">
                    <FontAwesomeIcon icon={faCreditCard} size="2x" /> {}
                    <Link to="/CreditCardPayment">
                        <Button variant="primary">Pagar con Tarjeta de Crédito</Button>
                    </Link>
                </div>
                <div className="card-button">
                    <FontAwesomeIcon icon={faMoneyCheckAlt} size="2x" /> {}
                    <Link to="/DebitCardPayment">
                        <Button variant="primary">Pagar con Tarjeta de Débito</Button>
                    </Link>
                </div>
            </div>
            <div className="card-button">
                <Link to="/checkout" className="btn btn-secondary">
                    <FontAwesomeIcon icon={faArrowLeft} size="2x" /> Volver
                </Link>
            </div>
        </div>
    );
};

export default WebpayCards;