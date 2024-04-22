import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log('Las contraseñas no coinciden');
      return;
    }

    const data = {
        username: username,
        password: password,
        email: email
    };

    const response = await fetch('https://dpav7rflu36avi7oosd4i5gb5q0hyfgp.lambda-url.us-east-1.on.aws/signup', {
        method: 'POST',
        headers: {
            'x-api-key': 'test_api_key'
        },
        body: JSON.stringify(data), // data es tu objeto con los datos a enviar
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });

    if (response.ok) {
        console.log('Usuario registrado con éxito.');
    } else {
        console.logn('Error al registrar usuario.')
    }
  };

  return (
    <div className="signup-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          Nombre de Usuario:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control"/>
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
        <input type="submit" value="Registrarse" className="btn btn-primary bnt-block mb-4 iniciar-sesion"/>
      </form>
    </div>
  );
};

export default Signup;