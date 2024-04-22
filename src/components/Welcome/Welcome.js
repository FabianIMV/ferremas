import React from 'react';
import { useParams } from 'react-router-dom';

const Welcome = () => {
    const { username } = useParams();
    return (
        <div>
            <h2>Bienvenido {username}</h2>
        </div>
    );
}

export default Welcome;