import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';
import { AuthContext } from '../../AuthContext';
import Alert from 'react-bootstrap/Alert';

const Login = ({showTitle = true}) => {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUsername: setAuthUsername } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isSuccessFadingOut, setIsSuccessFadingOut] = useState(false);

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
    
        try {
            await new Promise((resolve, reject) => {
                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: function (result) {
                        console.log('access token + ' + result.getAccessToken().getJwtToken());
                        setMessage('Inicio de sesión exitoso');
                        console.log('Inicio de sesión exitoso')
                        setIsAuthenticated(true);
                        setAuthUsername(username);
                        setTimeout(() => {
                            navigate(`/`);
                        }, 2000);
                        resolve();
                    },
                    onFailure: function (err) {
                        console.error(err);
                        setErrorMessage('Error al iniciar sesión, verifica tu usuario y contraseña');
                        console.log('Error al iniciar sesión, verifica tu usuario y contraseña')
                        reject(err);
                    },
                    newPasswordRequired: function (userAttributes, requiredAttributes) {
                    },
                });
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        let timer1, timer2;
        if (errorMessage) {
            timer1 = setTimeout(() => {
                setIsFadingOut(true);
                timer2 = setTimeout(() => {
                    setErrorMessage(null);
                    setIsFadingOut(false);
                }, 9000);
            }, 1000);
        }
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [errorMessage]);

    useEffect(() => {
        let timer1, timer2;
        if (message) {
            timer1 = setTimeout(() => {
                setIsSuccessFadingOut(true);
                timer2 = setTimeout(() => {
                    setMessage(null);
                    setIsSuccessFadingOut(false);
                }, 9000);
            }, 1000);
        }
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [message]);

    return (
        <div className="login-container">
           {showTitle && <h2>Iniciar Sesión</h2>}
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
            {message &&
                <Alert key="success-alert" variant="success" style={{ width: "42rem", opacity: isSuccessFadingOut ? 0 : 1, transition: 'opacity 1s ease-out' }}>
                    <Alert.Heading>{message}</Alert.Heading>
                </Alert>
            }
            {errorMessage &&
                <Alert key="error-alert" variant="danger" style={{ width: "42rem", opacity: isFadingOut ? 0 : 1, transition: 'opacity 1s ease-out' }}>
                    <Alert.Heading>{errorMessage}</Alert.Heading>
                </Alert>
            }
        </div>
    );
}

export default Login;