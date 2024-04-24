import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

const Signup = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [showConfirmationForm, setShowConfirmationForm] = useState(false);

    const poolData = {
        UserPoolId: 'us-east-1_UIO4gNUY8',
        ClientId: '3h1acnaqqioq9kf08d6t0tico1'
    };

    const userPool = new CognitoUserPool(poolData);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            console.log('Las contraseñas no coinciden');
            return;
        }

        userPool.signUp(username, password, [{ Name: 'email', Value: email }], null, (err, result) => {
            if (err) {
                console.error(err);
                setErrorMessage(err.message || 'Error al registrar usuario.');
                return;
            }
            setMessage('Usuario registrado con éxito. Por favor, confirma tu registro.');
            setShowConfirmationForm(true);
        });
    };

    const handleConfirmation = async (event) => {
        event.preventDefault();

        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: userPool
        });

        cognitoUser.confirmRegistration(confirmationCode, true, function(err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log('call result: ' + result);
            navigate(`/Bienvenido/${username}`);
        });
    };

    return (
        <div>
        <div className="signup-container">
            <h2>Registrarse</h2>
            {!showConfirmationForm && (
                <form onSubmit={handleSubmit} className="signup-form">
                    <label>
                        Nombre de Usuario:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" />
                    </label>
                    <label>
                        Email:
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                    </label>
                    <label>
                        Contraseña:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                    </label>
                    <label>
                        Confirmar Contraseña:
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" />
                    </label>
                    <input type="submit" value="Registrarse" className="btn btn-primary bnt-block mb-4 iniciar-sesion" />
                </form>
            )}
            {showConfirmationForm && (
                <form onSubmit={handleConfirmation} className="signup-form">
                    <label>
                        Código de confirmación:
                        <input type="text" value={confirmationCode} onChange={(e) => setConfirmationCode(e.target.value)} className="form-control" />
                    </label>
                    <input type="submit" value="Confirmar Registro" className="btn btn-primary bnt-block mb-4 iniciar-sesion" />
                </form>
            )}
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        {message && <p>{message}</p>}
        </div>
    );
}

export default Signup;