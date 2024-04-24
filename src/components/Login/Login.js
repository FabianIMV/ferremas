import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';
import { AuthContext } from '../../AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const poolData = {
        UserPoolId: 'us-east-1_UIO4gNUY8',
        ClientId: '3h1acnaqqioq9kf08d6t0tico1'
    };

    const userPool = new CognitoUserPool(poolData);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const authenticationData = {
            Username: username,
            Password: password
        };

        const authenticationDetails = new AuthenticationDetails(authenticationData);

        const userData = {
            Username: username,
            Pool: userPool
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log('access token + ' + result.getAccessToken().getJwtToken());
                setMessage('Inicio de sesión exitoso');
                setIsAuthenticated(true); // Actualiza el estado de autenticación
                navigate('/');
            },
            onFailure: function (err) {
                console.error(err);
                setErrorMessage('Error al iniciar sesión');
            },
            newPasswordRequired: function (userAttributes, requiredAttributes) {
                // Aquí puedes solicitar al usuario que proporcione una nueva contraseña
                // Luego puedes llamar a cognitoUser.completeNewPasswordChallenge
            },
        });
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
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;