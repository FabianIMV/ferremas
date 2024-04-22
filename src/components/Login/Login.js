import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // Añade este estado para manejar el mensaje

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password
        };

        let response;
        try {
            response = await fetch('https://dpav7rflu36avi7oosd4i5gb5q0hyfgp.lambda-url.us-east-1.on.aws/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // data es tu objeto con los datos a enviar
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.message) {
                    setMessage(data.message); // Establece el mensaje si la respuesta contiene uno
                }
            });
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error al iniciar sesión.');
            return;
        }

        if (response && response.ok) {
            console.log('Inicio de sesión exitoso.');
            localStorage.setItem('username', username); // Almacena el nombre de usuario en el almacenamiento local
            navigate('/welcome'); // Navega al usuario a la página de bienvenida
        } else {
            console.log('Error al iniciar sesión.')
        }
    };

    return (
        <div>
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <label>
                    Nombre de Usuario:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" />
                </label>
                <label>
                    Contraseña:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                </label>
                <input type="submit" value="Iniciar Sesión" className="btn btn-primary bnt-block mb-4 iniciar-sesion" />
            </form>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        {message && <p>{message}</p>} {/* Muestra el mensaje cuando esté establecido */}
        </div>
    );
}

export default Login;