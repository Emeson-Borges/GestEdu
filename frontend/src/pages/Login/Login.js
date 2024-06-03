import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:8000/api/users/token/', {
          username,
          password,
        });
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        // Redirecionando para a página inicial após o login bem-sucedido
        window.location.href = '/';
      } catch (error) {
        setError('Login failed. Please check your username and password.');
      }
    };
  
    return (
      <div className='div-principal'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="submit">Login</button>
          <div>
            {/* Seu formulário de login */}
            <Link to="/cadastro-usuario">Criar uma nova conta</Link>
          </div>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
}

export default Login;
